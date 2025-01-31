"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import math from "@/utils/customMath";
import { calculateFourierTransform } from "@/utils/fourierTransform";

interface GraphAreaProps {
  functions: string[];
  domain: "time" | "frequency";
}

interface ChartDataPoint {
  t?: number;
  omega?: number;
  [key: `y${number}`]: number;
}

const GraphArea: React.FC<GraphAreaProps> = ({ functions, domain }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateChartData = useCallback(() => {
    if (domain === "time") {
      const tValues = Array.from({ length: 1000 }, (_, i) => -10 + i * 0.02);
      const data = tValues.map((t) => {
        const point: ChartDataPoint = { t };
        functions.forEach((func, index) => {
          try {
            const scope = { t };
            const result = math.evaluate(func, scope);
            point[`y${index}`] = Number.isFinite(result) ? result : 0;
          } catch {
            setError(`Error evaluating function: ${func}`);
            point[`y${index}`] = 0;
          }
        });
        return point;
      });
      setChartData(data);
    } else {
      const omegaValues = Array.from(
        { length: 1000 },
        (_, i) => -10 + i * 0.02
      );
      const data = omegaValues.map((omega) => {
        const point: ChartDataPoint = { omega };
        functions.forEach((func, index) => {
          try {
            const magnitude = calculateFourierTransform(func, omega);
            point[`y${index}`] = Number.isFinite(magnitude) ? magnitude : 0;
          } catch {
            setError(`Error evaluating Fourier transform of: ${func}`);
            point[`y${index}`] = 0;
          }
        });
        return point;
      });
      setChartData(data);
    }
  }, [domain, functions]);

  useEffect(() => {
    setError(null);
    generateChartData();
  }, [generateChartData]);

  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#a4de6c",
    "#d0ed57",
    "#83a6ed",
    "#8dd1e1",
    "#82ca9d",
    "#a4de6c",
  ];

  return (
    <Card className="w-full md:w-2/3 h-[calc(100vh-4rem)] overflow-hidden">
      <CardHeader>
        <CardTitle>
          Signal Visualization - {domain === "time" ? "Time" : "Frequency"}{" "}
          Domain
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={domain === "time" ? "t" : "omega"}
              label={{
                value: domain === "time" ? "t" : "ω",
                position: "bottom",
                offset: -5,
              }}
            />
            <YAxis
              label={{
                value: domain === "time" ? "Amplitude" : "|X(f)|",
                angle: -90,
                position: "insideLeft",
                offset: 15,
              }}
            />
            <Tooltip />
            <Legend />
            {functions.map((func, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`y${index}`}
                stroke={colors[index % colors.length]}
                strokeWidth={2}
                name={func}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default GraphArea;
