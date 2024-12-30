"use client";

import { useState } from "react";
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
import {
  calculateEnergySmart,
  calculatePowerSmart,
  calculateMeanSmart,
} from "@/utils/signalFunctions";

interface Signal {
  id: string;
  function: string;
}

export function CalculateModal({
  whatToCalc,
  signals,
}: {
  whatToCalc: string;
  signals: Signal[];
}) {
  const [isOpen, setIsOpen] = useState(false);

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
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="mb-4 flex items-center justify-between last:mb-0"
            >
              <span className="font-medium">{signal.function}</span>
              <span className="text-sm text-muted-foreground">
                {whatToCalc === "Px"
                  ? `${calculatePowerSmart(signal.function, -100, 100, 0.01)}`
                  : whatToCalc === "Ex"
                  ? `${calculateEnergySmart(signal.function, -100, 100, 0.01)}`
                  : `${calculateMeanSmart(signal.function, -100, 100, 0.01)}`}
              </span>
            </div>
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
