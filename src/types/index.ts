export type IEvent = {
  id: string;
  locations: [
    {
      lat: number;
      lon: number;
      venueId: string;
      buildingId: string;
      levelId: string;
      type: "INDOOR" | "OUTDOOR";
    }
  ];
  details: [{ name: string }];
};

export type ILocation = {
  lat: number;
  lon: number;
};

export type IVenue = {
  id: string;
  lon: number;
  lat: number;
  buildings: IBuilding[];
};

export type IBuilding = {
  id: string;
  lon: number;
  lat: number;
  floors: ILevel[];
};

export type ILevel = {
  id: string;
  name: string;
  ordinal: number;
};
