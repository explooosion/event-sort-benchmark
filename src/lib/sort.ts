import { distance } from "@turf/distance";
import { point } from "@turf/helpers";
import type { IEvent, ILocation, IVenue } from "../types";

export function sortEvents(
  events: IEvent[],
  location: ILocation,
  venues: IVenue[]
): IEvent[] {
  const venueDistMap = new Map<string, number>();
  const buildingDistMap = new Map<string, number>();
  const floorOrdinalMap = new Map<string, number>();

  const from = point([location.lon, location.lat]);

  for (const venue of venues) {
    const toVenue = point([venue.lon, venue.lat]);
    venueDistMap.set(venue.id, distance(from, toVenue, { units: "meters" }));

    for (const building of venue.buildings) {
      const toBuilding = point([building.lon, building.lat]);
      buildingDistMap.set(
        building.id,
        distance(from, toBuilding, { units: "meters" })
      );

      for (const level of building.floors) {
        floorOrdinalMap.set(level.id, level.ordinal);
      }
    }
  }

  // console.log("Venue Distances:", Array.from(venueDistMap.entries()));
  // console.log("Building Distances:", Array.from(buildingDistMap.entries()));
  // console.log("Floor Ordinals:", Array.from(floorOrdinalMap.entries()));

  const sorted = [...events];
  sorted.sort((a, b) => {
    const venueCmp = compareByVenueProximity(venueDistMap)(a, b);
    if (venueCmp !== 0) return venueCmp;

    const buildingCmp = compareByBuildingProximity(buildingDistMap)(a, b);
    if (buildingCmp !== 0) return buildingCmp;

    const floorCmp = compareByFloorOrdinal(floorOrdinalMap)(a, b);
    if (floorCmp !== 0) return floorCmp;

    return compareByEventNameAscending(a, b);
  });

  return sorted;
}

export function sortEventsOptimized(
  events: IEvent[],
  location: ILocation,
  venues: IVenue[]
): IEvent[] {
  const venueDistMap = new Map<string, number>();
  const buildingDistMap = new Map<string, number>();
  const floorOrdinalMap = new Map<string, number>();

  const from = point([location.lon, location.lat]);

  for (const venue of venues) {
    const toVenue = point([venue.lon, venue.lat]);
    venueDistMap.set(venue.id, distance(from, toVenue, { units: "meters" }));

    for (const building of venue.buildings) {
      const toBuilding = point([building.lon, building.lat]);
      buildingDistMap.set(
        building.id,
        distance(from, toBuilding, { units: "meters" })
      );

      for (const level of building.floors) {
        floorOrdinalMap.set(level.id, level.ordinal);
      }
    }
  }

  const venueCmp = compareByVenueProximity(venueDistMap);
  const buildingCmp = compareByBuildingProximity(buildingDistMap);
  const floorCmp = compareByFloorOrdinal(floorOrdinalMap);

  const sorted = [...events];
  sorted.sort((a, b) => {
    const venueCmpValue = venueCmp(a, b);
    if (venueCmpValue !== 0) return venueCmpValue;

    const buildingCmpValue = buildingCmp(a, b);
    if (buildingCmpValue !== 0) return buildingCmpValue;

    const floorCmpValue = floorCmp(a, b);
    if (floorCmpValue !== 0) return floorCmpValue;

    return compareByEventNameAscending(a, b);
  });

  return sorted;
}

export function compareByVenueProximity(
  distMap: Map<string, number>
): (a: IEvent, b: IEvent) => number {
  return (a, b) => {
    const idA = a.locations[0].venueId;
    const idB = b.locations[0].venueId;
    const distA = distMap.get(idA) ?? Infinity;
    const distB = distMap.get(idB) ?? Infinity;
    return distA - distB;
  };
}

export function compareByBuildingProximity(
  distMap: Map<string, number>
): (a: IEvent, b: IEvent) => number {
  return (a, b) => {
    const idA = a.locations[0].buildingId;
    const idB = b.locations[0].buildingId;
    const distA = distMap.get(idA) ?? Infinity;
    const distB = distMap.get(idB) ?? Infinity;
    return distA - distB;
  };
}

export function compareByFloorOrdinal(
  ordinalMap: Map<string, number>
): (a: IEvent, b: IEvent) => number {
  return (a, b) => {
    const idA = a.locations[0].levelId;
    const idB = b.locations[0].levelId;
    const ordA = ordinalMap.get(idA) ?? Infinity;
    const ordB = ordinalMap.get(idB) ?? Infinity;
    return ordA - ordB;
  };
}

export function compareByEventNameAscending(a: IEvent, b: IEvent): number {
  const nameA = a.details?.[0]?.name ?? "";
  const nameB = b.details?.[0]?.name ?? "";
  return nameA.localeCompare(nameB);
}
