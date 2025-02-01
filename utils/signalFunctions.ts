export const signalFunctions = [
    { name: "sin(t)", description: "Sine wave" },
    { name: "cos(t)", description: "Cosine wave" },
    { name: "tan(t)", description: "Tangent wave" },
    { name: "exp(t)", description: "Exponential function" },
    { name: "log(t)", description: "Natural logarithm" },
    { name: "sqrt(t)", description: "Square root" },
    { name: "rect(t)", description: "Rectangular function" },
    { name: "triangle(t)", description: "Triangle function" },
    { name: "sinc(t)", description: "Sinc function" },
    { name: "heaviside(t)", description: "Heaviside function" },
    { name: "ramp(t)", description: "Ramp function" },
    { name: "gaussian(t)", description: "Gaussian function" },
    { name: "sawtooth(t)", description: "Sawtooth function" },
    { name: "square(t)", description: "Square function" },
    { name: "diracDeltaGaussian(t)", description: "Aproximación gaussiana de la delta de Dirac" },
  ]
  
  export const mathConstants = [
    { name: "pi", value: "π (approximately 3.14159)" },
    { name: "e", value: "Euler's number (approximately 2.71828)" },
    { name: "phi", value: "Golden ratio (approximately 1.61803)" },
  ]
  
  export const functionExamples = [
    { expression: "2 * sin(t) + cos(3*t)", description: "Combination of sine and cosine" },
    { expression: "exp(-t) * sin(2*pi*t)", description: "Damped sine wave" },
    { expression: "sqrt(t) * log(t+1)", description: "Combination of square root and logarithm" },
  ]
  
  