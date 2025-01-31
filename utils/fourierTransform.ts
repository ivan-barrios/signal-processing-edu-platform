import math from "./customMath"; // Import the customized math instance

interface Complex {
  re: number;
  im: number;
}

// Cache for FFT results to avoid recomputing for the same function
const fftCache = new Map<string, { fft: (Complex | number)[], df: number, dt: number }>();

export const calculateFourierTransform = (func: string, f: number): number => {
  try {
    // Check cache first
    if (!fftCache.has(func)) {
      // Use smaller number of samples for better performance
      const N = 1024; // Use power of 2 for efficiency
      const T = 10;   // Half-window; total time window = 2T
      const dt = (2 * T) / N;
      
      // Sample the time domain signal more efficiently
      const samples = Array.from({ length: N }, (_, i) => {
        const t = -T + i * dt;
        return math.evaluate(func, { t });
      });

      // Store FFT result in cache
      const fft = math.fft(samples);
      // For frequency in Hz, resolution f_res = 1/(2*T)
      const f_res = 1 / (2 * T);
      fftCache.set(func, { fft, df: f_res, dt });
    }

    // Get cached result
    const { fft, df, dt } = fftCache.get(func)!;
    const k = Math.round(Math.abs(f) / df);
    
    // Convert complex number to magnitude
    const value = k < fft.length/2 ? fft[k] : 0;
    const mag = typeof value === 'number'
      ? value
      : Math.sqrt(value.re * value.re + value.im * value.im);
    return mag * dt;
  } catch (error) {
    console.error("Error in Fourier transform:", error);
    return NaN;
  }
}; 