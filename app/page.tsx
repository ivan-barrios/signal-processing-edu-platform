"use client";
import GraphArea from "@/components/GraphArea";
import SignalList from "@/components/signal-list/SignalList";
import Toolbar from "@/components/ToolBar";
import { useState } from "react";
import { Signal } from "@/types/signal";

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([]);
  return (
    <main className="min-h-screen flex flex-col">
      <Toolbar signals={signals} />
      <div className="flex-grow flex flex-col md:flex-row">
        <SignalList signals={signals} setSignals={setSignals} />
        <GraphArea
          functions={signals.map((signal) =>
            typeof signal.function === "object"
              ? `${signal.function.re}${signal.function.im >= 0 ? "+" : ""}${
                  signal.function.im
                }i`
              : signal.function
          )}
        />
      </div>
    </main>
  );
}
