"use client";

import { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { calculateMetrics, CalculateMetricsResponse } from "@/utils/api";
import { Signal } from "@/types/signal";

interface CalculateModalProps {
  whatToCalc: string;
  signals: Signal[];
}

export const CalculateModal = ({
  whatToCalc,
  signals,
}: CalculateModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch data from the API
  const fetchCalculations = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Call the API for each signal and store results
      const responses = await Promise.all(
        signals.map(async (signal) => {
          const response: CalculateMetricsResponse = await calculateMetrics({
            func_str:
              typeof signal.function === "object"
                ? `${signal.function.re}${signal.function.im >= 0 ? "+" : ""}${
                    signal.function.im
                  }i`
                : signal.function,
          });

          return {
            id: signal.id,
            result:
              whatToCalc === "Px"
                ? response.power
                : whatToCalc === "Ex"
                ? response.energy
                : response.mean,
          };
        })
      );

      // Convert responses to a map for easy lookup
      const resultMap = responses.reduce(
        (acc, { id, result }) => ({ ...acc, [id]: result }),
        {}
      );
      setResults(resultMap);
    } catch (err) {
      console.error("Error fetching calculations:", err);
      setError("Failed to fetch calculations.");
    } finally {
      setLoading(false);
    }
  }, [signals, whatToCalc]);

  // Fetch calculations when the modal is opened
  useEffect(() => {
    if (isOpen) {
      fetchCalculations();
    }
  }, [isOpen, whatToCalc, fetchCalculations]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{whatToCalc}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            Signal{" "}
            {whatToCalc === "Px"
              ? "Power"
              : whatToCalc === "Ex"
              ? "Energy"
              : "Mean"}{" "}
          </DialogTitle>
          <DialogDescription>
            View the calculated{" "}
            {whatToCalc === "Px"
              ? "Power"
              : whatToCalc === "Ex"
              ? "Energy"
              : "Mean"}{" "}
            of saved signals.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            signals.map((signal) => (
              <div
                key={signal.id}
                className="mb-4 flex items-center justify-between last:mb-0"
              >
                <span className="font-medium">
                  {typeof signal.function === "object"
                    ? `${signal.function.re}${
                        signal.function.im >= 0 ? "+" : ""
                      }${signal.function.im}i`
                    : signal.function}
                </span>
                <span className="text-sm text-muted-foreground">
                  {results[signal.id] ?? "N/A"}
                </span>
              </div>
            ))
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
