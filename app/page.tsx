"use client";
import GraphArea from "@/components/GraphArea";
import SignalList from "@/components/signal-list/SignalList";
import Toolbar from "@/components/ToolBar";
import { useState } from "react";

interface Signal {
  id: string;
  function: string;
}

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([]);
  return (
    <main className="min-h-screen flex flex-col">
      <Toolbar signals={signals} />
      <div className="flex-grow flex flex-col md:flex-row">
        <SignalList signals={signals} setSignals={setSignals} />
        <GraphArea functions={signals.map((signal) => signal.function)} />
      </div>
    </main>
  );
}
