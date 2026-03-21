// Dummy data for Waste Watcher Dashboard

export const topWastedFoods = [
  { name: "Pasta", wasteRate: 42, amount: 156 },
  { name: "Salad", wasteRate: 38, amount: 142 },
  { name: "Bread", wasteRate: 35, amount: 131 },
  { name: "Pizza", wasteRate: 28, amount: 105 },
  { name: "Chicken", wasteRate: 22, amount: 82 },
  { name: "Rice", wasteRate: 15, amount: 56 },
  { name: "Vegetables", wasteRate: 12, amount: 45 },
  { name: "Soup", wasteRate: 8, amount: 30 },
];

export const wasteOverTime = [
  { date: "Mon", waste: 245, meals: 1200 },
  { date: "Tue", waste: 312, meals: 1350 },
  { date: "Wed", waste: 278, meals: 1280 },
  { date: "Thu", waste: 389, meals: 1420 },
  { date: "Fri", waste: 425, meals: 1500 },
  { date: "Sat", waste: 198, meals: 950 },
  { date: "Sun", waste: 167, meals: 880 },
];

export const heatmapData = [
  { food: "Pasta", breakfast: 12, lunch: 45, dinner: 38 },
  { food: "Salad", breakfast: 8, lunch: 42, dinner: 35 },
  { food: "Bread", breakfast: 28, lunch: 32, dinner: 25 },
  { food: "Pizza", breakfast: 0, lunch: 35, dinner: 42 },
  { food: "Chicken", breakfast: 5, lunch: 28, dinner: 32 },
  { food: "Rice", breakfast: 10, lunch: 18, dinner: 22 },
  { food: "Vegetables", breakfast: 6, lunch: 15, dinner: 12 },
  { food: "Soup", breakfast: 4, lunch: 8, dinner: 10 },
];

export const insights = [
  {
    id: 1,
    type: "warning",
    title: "High Pasta Waste",
    message: "Pasta waste is at 42%. Consider reducing portion sizes or offering half portions.",
    metric: "42%",
  },
  {
    id: 2,
    type: "success",
    title: "Rice Efficiency",
    message: "Rice has consistently low waste (15%). Consider scaling up production.",
    metric: "15%",
  },
  {
    id: 3,
    type: "warning",
    title: "Friday Peak",
    message: "Friday has the highest waste volume. Review menu variety for end-of-week fatigue.",
    metric: "425 lbs",
  },
  {
    id: 4,
    type: "info",
    title: "Lunch Time Pattern",
    message: "Lunch consistently shows higher waste than dinner. Consider adjusting lunch portions.",
    metric: "35% higher",
  },
  {
    id: 5,
    type: "success",
    title: "Weekend Improvement",
    message: "Weekend waste is 45% lower than weekdays. Replicate weekend practices.",
    metric: "-45%",
  },
];

export const recentScans = [
  {
    id: 1,
    items: ["Pasta", "Broccoli"],
    timestamp: "2024-01-15T12:34:00Z",
    wasteLevel: "high",
  },
  {
    id: 2,
    items: ["Rice", "Chicken"],
    timestamp: "2024-01-15T12:32:00Z",
    wasteLevel: "low",
  },
  {
    id: 3,
    items: ["Salad", "Bread"],
    timestamp: "2024-01-15T12:30:00Z",
    wasteLevel: "medium",
  },
  {
    id: 4,
    items: ["Pizza"],
    timestamp: "2024-01-15T12:28:00Z",
    wasteLevel: "high",
  },
  {
    id: 5,
    items: ["Soup", "Bread"],
    timestamp: "2024-01-15T12:25:00Z",
    wasteLevel: "low",
  },
];

export const summaryStats = {
  totalWasteToday: 287,
  totalMealsToday: 1342,
  wasteReduction: 12,
  topWastedItem: "Pasta",
  avgWastePerMeal: 0.21,
  scansToday: 856,
};
