"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CalculateModal } from "./CalculateModal";
import { Signal } from "@/types/signal";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";
import { useState } from "react";

interface ToolbarProps {
  signals: Signal[];
  domain: "frequency" | "time";
  setDomain: (domain: "frequency" | "time") => void;
}

const Toolbar = ({ signals, domain, setDomain }: ToolbarProps) => {
  const [activeFilter, setActiveFilter] = useState<
    "none" | "lowpass" | "highpass"
  >("none");

  return (
    <TooltipProvider>
      <div className="p-2 bg-gray-100 flex flex-wrap gap-2 items-center justify-between w-full">
        <div className="flex flex-wrap gap-2 items-center justify-center md:justify-start">
          <DomainToggle domain={domain} setDomain={setDomain} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`p-2 ${
                activeFilter !== "none" ? "bg-blue-100 text-blue-600" : ""
              }`}
            >
              <Filter className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setActiveFilter("none")}>
              No Filter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveFilter("lowpass")}>
              Low-Pass Filter
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setActiveFilter("highpass")}>
              High-Pass Filter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

interface DomainToggleProps {
  domain: "time" | "frequency";
  setDomain: (domain: "time" | "frequency") => void;
}

function DomainToggle({ domain, setDomain }: DomainToggleProps) {
  return (
    <div className="bg-gray-100 rounded-full p-1 inline-flex">
      <ToggleOption
        isActive={domain === "time"}
        onClick={() => setDomain("time")}
      >
        Time
      </ToggleOption>
      <ToggleOption
        isActive={domain === "frequency"}
        onClick={() => setDomain("frequency")}
      >
        Frequency
      </ToggleOption>
    </div>
  );
}

interface ToggleOptionProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ToggleOption({ isActive, onClick, children }: ToggleOptionProps) {
  return (
    <motion.button
      className={`px-4 py-2 rounded-full text-sm font-medium relative ${
        isActive ? "text-blue-600" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 bg-white rounded-full shadow-sm z-0"
          layoutId="activeToggle"
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
