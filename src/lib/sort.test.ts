import { sortEvents, sortEventsOptimized } from "./sort";
import { mockEvents as mockEvents30 } from "../mocks/events_30";
import { mockEvents as mockEvents500 } from "../mocks/events_500";
import { mockEvents as mockEvents1000 } from "../mocks/events_1000";
import { mockVenues } from "../mocks/venues";

//#region Mock data for testing
// Venue Distances: [
//   [ 'venue-0', 6552.239085908391 ],
//   [ 'venue-1', 5110.8158641355785 ],
//   [ 'venue-2', 5161.566158086441 ],
//   [ 'venue-3', 4294.58398067342 ],
//   [ 'venue-4', 3828.6140602384066 ]
// ]
// Building Distances: [
//   [ 'venue-0-building-0', 6850.169498872547 ],
//   [ 'venue-0-building-1', 5542.089958450355 ],
//   [ 'venue-1-building-0', 5434.451592038801 ],
//   [ 'venue-1-building-1', 4063.0271387918337 ],
//   [ 'venue-2-building-0', 4916.117761981121 ],
//   [ 'venue-2-building-1', 6295.714927329878 ],
//   [ 'venue-3-building-0', 5074.342429275368 ],
//   [ 'venue-3-building-1', 3631.551577055097 ],
//   [ 'venue-4-building-0', 4035.7055839909804 ],
//   [ 'venue-4-building-1', 2793.4550524669144 ]
// ]
// Floor Ordinals: [
//   [ 'venue-0-building-0-floor-0', 0 ],
//   [ 'venue-0-building-0-floor-1', 1 ],
//   [ 'venue-0-building-0-floor-2', 2 ],
//   [ 'venue-0-building-1-floor-0', 0 ],
//   [ 'venue-0-building-1-floor-1', 1 ],
//   [ 'venue-0-building-1-floor-2', 2 ],
//   [ 'venue-1-building-0-floor-0', 0 ],
//   [ 'venue-1-building-0-floor-1', 1 ],
//   [ 'venue-1-building-0-floor-2', 2 ],
//   [ 'venue-1-building-1-floor-0', 0 ],
//   [ 'venue-1-building-1-floor-1', 1 ],
//   [ 'venue-1-building-1-floor-2', 2 ],
//   [ 'venue-2-building-0-floor-0', 0 ],
//   [ 'venue-2-building-0-floor-1', 1 ],
//   [ 'venue-2-building-0-floor-2', 2 ],
//   [ 'venue-2-building-1-floor-0', 0 ],
//   [ 'venue-2-building-1-floor-1', 1 ],
//   [ 'venue-2-building-1-floor-2', 2 ],
//   [ 'venue-3-building-0-floor-0', 0 ],
//   [ 'venue-3-building-0-floor-1', 1 ],
//   [ 'venue-3-building-0-floor-2', 2 ],
//   [ 'venue-3-building-1-floor-0', 0 ],
//   [ 'venue-3-building-1-floor-1', 1 ],
//   [ 'venue-3-building-1-floor-2', 2 ],
//   [ 'venue-4-building-0-floor-0', 0 ],
//   [ 'venue-4-building-0-floor-1', 1 ],
//   [ 'venue-4-building-0-floor-2', 2 ],
//   [ 'venue-4-building-1-floor-0', 0 ],
//   [ 'venue-4-building-1-floor-1', 1 ],
//   [ 'venue-4-building-1-floor-2', 2 ]
// ]
//#endregion

const location = { lat: 25.04, lon: 121.55 };

describe("🔍 Sorting correctness for small dataset (30 events)", () => {
  test("sortEvents should sort accurately", () => {
    const sorted = sortEvents(mockEvents30, location, mockVenues);

    expect(sorted[0].details[0].name).toBe("Robertson, Roberts and Mcdonald");
    expect(sorted[1].details[0].name).toBe("Cruz, Mitchell and Johnson");
    expect(sorted[sorted.length - 1].details[0].name).toBe(
      "Bell, Williams and Carter"
    );
  });

  test("sortEventsOptimized should match original sorting exactly", () => {
    const based = sortEvents(mockEvents30, location, mockVenues);
    const optimized = sortEventsOptimized(mockEvents30, location, mockVenues);

    expect(optimized).toHaveLength(based.length);
    for (let i = 0; i < based.length; i++) {
      expect(optimized[i].id).toBe(based[i].id);
    }
  });
});

describe("📦 Sorting consistency for medium dataset (500 events)", () => {
  test("sortEvents should sort as expected", () => {
    const sorted = sortEvents(mockEvents500, location, mockVenues);

    expect(sorted[0].details[0].name).toBe("Anderson, Morales and Odom");
    expect(sorted[1].details[0].name).toBe("Bradley-Diaz");
    expect(sorted[sorted.length - 1].details[0].name).toBe("Walker-Guzman");
  });

  test("sortEventsOptimized should produce same order as baseline", () => {
    const based = sortEvents(mockEvents500, location, mockVenues);
    const optimized = sortEventsOptimized(mockEvents500, location, mockVenues);

    expect(optimized).toHaveLength(based.length);
    for (let i = 0; i < based.length; i++) {
      expect(optimized[i].id).toBe(based[i].id);
    }
  });
});

describe("🧪 Sorting validation for large dataset (1000 events)", () => {
  test("sortEvents should sort as expected", () => {
    const sorted = sortEvents(mockEvents1000, location, mockVenues);

    expect(sorted[0].details[0].name).toBe("Anderson-Wood");
    expect(sorted[1].details[0].name).toBe("Baker, Clark and Armstrong");
    expect(sorted[sorted.length - 1].details[0].name).toBe("Stokes Group");
  });

  test("sortEventsOptimized should match baseline implementation", () => {
    const based = sortEvents(mockEvents1000, location, mockVenues);
    const optimized = sortEventsOptimized(mockEvents1000, location, mockVenues);

    expect(optimized).toHaveLength(based.length);
    for (let i = 0; i < based.length; i++) {
      expect(optimized[i].id).toBe(based[i].id);
    }
  });
});
