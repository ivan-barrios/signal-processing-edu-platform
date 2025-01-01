const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

// Define the request and response types
export interface CalculateMetricsRequest {
  func_str: string;
}

export interface CalculateMetricsResponse {
  period: number | null;
  energy: number | string;
  power: number | string;
  mean: number | string;
  error?: string; // Optional error field in case of failure
}

/**
 * Function to call the FastAPI backend to calculate metrics.
 * @param params - The input for the FastAPI endpoint (function string).
 * @returns The calculated metrics or an error object.
 */
export const calculateMetrics = async (
  params: CalculateMetricsRequest
): Promise<CalculateMetricsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/calculate-metrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CalculateMetricsResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error calling FastAPI backend:", error);
    return {
      period: null,
      energy: "Error",
      power: "Error",
      mean: "Error",
      error: "Failed to calculate metrics",
    };
  }
};
