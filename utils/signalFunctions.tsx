import math from "@/utils/customMath";

/**
 * Calculate the mean value of a signal over a given range using discrete samples.
 * Mean = Sum of all function values / Number of samples
 *
 * @param func - The mathematical function as a string (e.g., "sin(t)")
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Step size for sampling
 * @returns The mean value of the signal
 */
function calculateMean(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number {
  // Generate a list of t-values between tStart and tEnd
  const tValues = Array.from(
    { length: Math.floor((tEnd - tStart) / tStep) + 1 },
    (_, i) => tStart + i * tStep
  );

  // Evaluate the function at each t-value
  const functionValues = tValues.map((t) => math.evaluate(func, { t }));

  // Calculate the mean value
  const sum = functionValues.reduce((acc, val) => acc + val, 0);
  return sum / tValues.length;
}

//---------------------------------------------------------

/**
 * Calculate the power of a signal over a given range using discrete samples.
 * Power = Mean of the squared function values
 *
 * @param func - The mathematical function as a string (e.g., "sin(t)")
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Step size for sampling
 * @returns The power of the signal
 */
function calculatePower(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number {
  const tValues = Array.from(
    { length: Math.floor((tEnd - tStart) / tStep) + 1 },
    (_, i) => tStart + i * tStep
  );

  // Evaluate the square of the function values
  const functionValues = tValues.map((t) => {
    const value = math.evaluate(func, { t });
    return value ** 2; // Square each function value
  });

  // Calculate the mean of the squared values
  const sum = functionValues.reduce((acc, val) => acc + val, 0);
  return sum / tValues.length;
}

//---------------------------------------------------------

/**
 * Calculate the energy of a signal over a given range using discrete samples.
 * Energy = Sum of squared function values over the range, approximating an integral.
 *
 * @param func - The mathematical function as a string (e.g., "sin(t)")
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Step size for sampling
 * @returns The energy of the signal
 */
function calculateEnergy(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number {
  const tValues = Array.from(
    { length: Math.floor((tEnd - tStart) / tStep) + 1 },
    (_, i) => tStart + i * tStep
  );

  // Evaluate the square of the function values
  const functionValues = tValues.map((t) => {
    const value = math.evaluate(func, { t });
    return value ** 2; // Square each function value
  });

  // Approximate the integral using the sum of squares multiplied by tStep
  const sum = functionValues.reduce((acc, val) => acc + val, 0);
  return sum * tStep;
}

//---------------------------------------------------------

/**
 * Detect if a function described as a string is periodic, and return its period or null if not periodic.
 * @param {string} func - The function as a string (e.g., "sin(t)").
 * @param {number} tStart - Start of the range to evaluate (e.g., 0).
 * @param {number} tEnd - End of the range to evaluate (e.g., 10).
 * @param {number} tStep - Step size for evaluation (e.g., 0.01).
 * @param {number} tolerance - Allowed deviation for periodicity check (default: 1e-6).
 * @returns {number | null} - The detected period (in the same units as t) or null if the function is not periodic.
 */
export function detectPeriod(
  func: string,
  tStart: number = 0,
  tEnd: number = 10,
  tStep: number = 0.01,
  tolerance: number = 1e-6
): number | null {
  // Generate t values in the specified range
  const tValues: number[] = Array.from(
    { length: Math.floor((tEnd - tStart) / tStep) + 1 },
    (_, i) => tStart + i * tStep
  );

  // Evaluate the function at each t value
  const fValues: number[] = tValues.map((t) => math.evaluate(func, { t }));

  // Normalize values to mitigate floating-point errors
  const normalize = (value: number) => Math.round(value * 1e6) / 1e6;
  const normalizedValues: number[] = fValues.map(normalize);

  // Test candidate periods
  for (
    let candidatePeriod = tStep;
    candidatePeriod < (tEnd - tStart) / 2;
    candidatePeriod += tStep
  ) {
    let isPeriodic = true;

    // Check if f(t) ≈ f(t + candidatePeriod) for all t
    for (let i = 0; i < normalizedValues.length; i++) {
      const shiftedIndex = i + Math.floor(candidatePeriod / tStep);
      if (shiftedIndex >= normalizedValues.length) break;

      if (
        Math.abs(normalizedValues[i] - normalizedValues[shiftedIndex]) >
        tolerance
      ) {
        isPeriodic = false;
        break;
      }
    }

    // Return the candidate period if periodicity is confirmed
    if (isPeriodic) {
      return candidatePeriod;
    }
  }

  // No periodicity detected
  return null;
}

//---------------------------------------------------------
/**
 * Calculate the mean value of a function.
 * For periodic functions, calculate over one period.
 * For non-periodic functions, calculate over a fixed range.
 *
 * @param func - The function as a string
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Sampling step size
 * @returns The mean value
 */
export function calculateMeanSmart(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number {
  const period = detectPeriod(func, tStart, tEnd, tStep);

  if (period) {
    // Periodic: calculate over one period
    return calculateMean(func, 0, period, tStep);
  } else {
    // Non-periodic: calculate over the full range
    return calculateMean(func, tStart, tEnd, tStep);
  }
}

/**
 * Calculate the power of a function.
 * For periodic functions, calculate over one period.
 * For non-periodic functions, calculate over a fixed range.
 *
 * @param func - The function as a string
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Sampling step size
 * @returns The power
 */
export function calculatePowerSmart(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number {
  const period = detectPeriod(func, tStart, tEnd, tStep);

  if (period) {
    // Periodic: calculate over one period
    return calculatePower(func, 0, period, tStep);
  } else {
    // Non-periodic: calculate over the full range
    return calculatePower(func, tStart, tEnd, tStep);
  }
}

/**
 * Calculate the energy of a function.
 * For non-periodic functions, calculate over a fixed range.
 * For periodic functions, return Infinity (periodic signals have infinite energy).
 *
 * @param func - The function as a string
 * @param tStart - Start of the range
 * @param tEnd - End of the range
 * @param tStep - Sampling step size
 * @returns The energy
 */
export function calculateEnergySmart(
  func: string,
  tStart: number,
  tEnd: number,
  tStep: number
): number | string {
  const period = detectPeriod(func, tStart, tEnd, tStep);
  console.log("period:", period);
  if (period !== null) {
    // Periodic signals have infinite energy
    return "Infinity";
  } else {
    // Non-periodic: calculate over the full range
    return calculateEnergy(func, tStart, tEnd, tStep);
  }
}
