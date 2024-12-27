"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ZoomIn, ZoomOut, Move, Zap } from "lucide-react";

export default function Toolbar() {
  const [domain, setDomain] = useState<"frequency" | "time">("time");
  const [isDragging, setIsDragging] = useState(false);

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

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Zoom in">
                <ZoomIn className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom In</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Zoom out">
                <ZoomOut className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Zoom Out</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={isDragging}
                onPressedChange={setIsDragging}
                aria-label="Toggle dragging"
              >
                <Move className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent>
              <p>Enable/Disable Dragging</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Calculate power"
              >
                Px
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Power</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" variant="outline" aria-label="Calculate mean">
                x&#772;
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Mean</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                aria-label="Calculate energy"
              >
                <Zap className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Calculate Energy</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
