import { create, all } from "mathjs";
import { rect, triangle, sinc } from "@/constants/CommonSignals";

// Create a custom math.js instance
const math = create(all);

// Import custom functions into math.js
math.import({
  rect: rect,
  triangle: triangle,
  sinc: sinc,
});

// Export the custom math instance
export default math;
