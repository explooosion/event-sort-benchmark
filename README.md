# 📊 Event Sort Benchmark

This project compares the performance and correctness of two sorting implementations for indoor event data, based on distance to a given user location.

It includes:
- ✅ Functional sorting logic for events based on venue/building/floor proximity
- 🧪 Unit tests using **Vitest**
- 🚀 Performance benchmarks via `perf_hooks`

---

## 🔧 Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

---

## 📦 Scripts

### ▶️ Development

```bash
npm run dev
```

Starts the development server (Vite).

---

### 🧪 Run Tests

```bash
npm run vitest
```

Executes unit tests using **Vitest**, comparing both `sortEvents` and `sortEventsOptimized` implementations to ensure consistency.

---

### 📈 Run Benchmark

```bash
npm run benchmark
```

Runs the benchmark script `src/benchmark.ts`, comparing both implementations across different dataset sizes (e.g., 30, 500, 1000 events) with multiple runs.

> Results will be printed in this format:
```
🔁 sortEvents | 30 events × 1000 runs → 15.530ms
✅ sortEventsOptimized | 30 events × 1000 runs → 11.641ms
🔁 sortEvents | 500 events × 1000 runs → 249.193ms
✅ sortEventsOptimized | 500 events × 1000 runs → 207.329ms
🔁 sortEvents | 1000 events × 1000 runs → 306.887ms
✅ sortEventsOptimized | 1000 events × 1000 runs → 267.802ms
```

---

## 🗂 Project Structure

```
src/
├── lib/               # Sorting logic
│   └── sort.ts
├── mocks/             # Test and benchmark data (events, venues)
├── benchmark.ts       # Performance comparison
├── ...
```

---

## 📦 Tech Stack

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
- [@turf/distance](https://turfjs.org/) for geographic calculations

---

## 📌 Goal

The goal of this project is to validate the performance benefit of avoiding repeated function creation (i.e., curried comparator functions) in high-frequency sort operations—especially when dealing with large datasets in UI applications.

---

## 📄 License

MIT