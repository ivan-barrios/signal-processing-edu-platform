"use client";

import { useState } from "react";

import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalculateModal } from "./CalculateModal";
import { Signal } from "@/types/signal";

interface ToolbarProps {
  signals: Signal[];
}

const Toolbar = ({ signals }: ToolbarProps) => {
  const [domain, setDomain] = useState<"frequency" | "time">("time");

  return (
    <TooltipProvider>
      <div className="p-2 bg-gray-100 flex flex-wrap gap-2 items-center justify-between w-full">
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
          <Toggle
            pressed={domain === "frequency"}
            onPressedChange={() =>
              setDomain(domain === "frequency" ? "time" : "frequency")
            }
            aria-label="Toggle domain"
          >
            {domain === "frequency" ? "Frequency Domain" : "Time Domain"}
          </Toggle>
        </div>
        <div className="flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <CalculateModal whatToCalc="Px" signals={signals} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Power</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <CalculateModal whatToCalc="x&#772;" signals={signals} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Mean</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <CalculateModal whatToCalc="Ex" signals={signals} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Energy</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Toolbar;
