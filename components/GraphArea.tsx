"use client";

import React, { useEffect, useState } from "react";
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
import { evaluate } from "mathjs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GraphAreaProps {
  functions: string[];
}

const GraphArea: React.FC<GraphAreaProps> = ({ functions }) => {
  interface ChartDataPoint {
    t: number;
    [key: string]: number;
  }

  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const generateChartData = () => {
    const tValues = Array.from({ length: 1000 }, (_, i) => -10 + i * 0.02);
    const data = tValues.map((t) => {
      const point: ChartDataPoint = { t };
      functions.forEach((func, index) => {
        try {
          const scope = { t };
          point[`y${index}`] = evaluate(func, scope);
        } catch {
          setError(`Error evaluating function: ${func}`);
        }
      });
      return point;
    });

    setChartData(data);
  };

  useEffect(() => {
    setError(null); //Clean errors
    generateChartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [functions]);

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
        <CardTitle>Signal Visualization</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-5rem)]">
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="t"
              label={{ value: "t", position: "insideBottomRight", offset: -10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {functions.map((func, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={`y${index}`}
                stroke={colors[index % colors.length]}
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

const rect = (t: number, width = 1) => (Math.abs(t) <= width / 2 ? 1 : 0);
