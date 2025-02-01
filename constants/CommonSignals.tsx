/**
 * Common Signal Functions
 * This file defines mathematical signal functions commonly used in signal processing.
 */

/**
 * Rectangular (Box) Function: Value is 1 when |t| <= width/2, otherwise 0. -> CAJON
 */
export const rect = (t: number, width = 1) => {
  const result = Math.abs(t) <= width / 2 ? 1 : 0;
  return result;
};

/**
 * Unit Step Function (Heaviside): Value is 1 when t >= 0, otherwise 0. -> ESCALON UNITARIO
 */
export const heaviside = (t: number) => (t >= 0 ? 1 : 0);

/**
 * Triangular Function: Linearly decreases from 1 to 0 within [-width/2, width/2].
 */
export const triangle = (t: number, width = 2, height = 1) => {
  if (Math.abs(t) > width / 2) return 0;
  return height * (1 - Math.abs(t) / (width / 2));
};

/**
 * Sinc Function: sin(pi * t) / (pi * t). Value is 1 at t = 0.
 */
export const sinc = (t: number) =>
  t === 0 ? 1 : Math.sin(Math.PI * t) / (Math.PI * t);

/**
 * Ramp Function: Linearly increases from 0 when t >= 0, otherwise 0.
 */
export const ramp = (t: number) => (t >= 0 ? t : 0);

/**
 * Gaussian Function: e^(-alpha * t^2).
 */
export const gaussian = (t: number, alpha = 1) => Math.exp(-alpha * t ** 2);

/**
 * Sawtooth Function: Periodic function increasing linearly from -1 to 1.
 */
export const sawtooth = (t: number, period = 1) =>
  2 * (t / period - Math.floor(t / period + 0.5));

/**
 * Aproximación a la delta de Dirac usando una gaussiana.
 * La constante 1/(sigma*sqrt(2*pi)) normaliza la gaussiana,
 * de modo que su integral sea 1.
 */
export const diracDeltaGaussian = (t: number, sigma = 0.01) => {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-(t * t) / (2 * sigma * sigma))
  );
};
