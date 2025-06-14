import { performance } from "perf_hooks";

import { sortEvents, sortEventsOptimized } from "./lib/sort";
import { mockEvents as mockEvents30 } from "./mocks/events_30";
import { mockEvents as mockEvents500 } from "./mocks/events_500";
import { mockEvents as mockEvents1000 } from "./mocks/events_1000";
import { mockVenues } from "./mocks/venues";

const location = { lat: 25.04, lon: 121.55 };
const runs = 1000;

function benchmark(fn: () => void, label: string, count: number) {
  const start = performance.now();
  for (let i = 0; i < runs; i++) fn();
  const end = performance.now();
  console.log(
    `${label} | ${count} events × ${runs} runs → ${(end - start).toFixed(3)}ms`
  );
}

// 🧪 30 Events
benchmark(
  () => sortEvents(mockEvents30, location, mockVenues),
  "🔁 sortEvents",
  30
);
benchmark(
  () => sortEventsOptimized(mockEvents30, location, mockVenues),
  "✅ sortEventsOptimized",
  30
);

// 🧪 500 Events
benchmark(
  () => sortEvents(mockEvents500, location, mockVenues),
  "🔁 sortEvents",
  500
);
benchmark(
  () => sortEventsOptimized(mockEvents500, location, mockVenues),
  "✅ sortEventsOptimized",
  500
);

// 🧪 1000 Events
benchmark(
  () => sortEvents(mockEvents1000, location, mockVenues),
  "🔁 sortEvents",
  1000
);
benchmark(
  () => sortEventsOptimized(mockEvents1000, location, mockVenues),
  "✅ sortEventsOptimized",
  1000
);
