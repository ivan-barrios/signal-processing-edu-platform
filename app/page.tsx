"use client";
import GraphArea from "@/components/GraphArea";
import SignalList from "@/components/signal-list/SignalList";
import Toolbar from "@/components/ToolBar";
import { useState } from "react";
import { Signal } from "@/types/signal";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import AIChat from "@/components/AIChat";

export default function Home() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [domain, setDomain] = useState<"frequency" | "time">("time");
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <main className="min-h-screen flex flex-col">
      <Toolbar signals={signals} domain={domain} setDomain={setDomain} />
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
          domain={domain}
        />
      </div>
      <Button
        variant="default"
        size="icon"
        className="fixed bottom-4 left-4 rounded-full shadow-lg w-12 h-12 bg-black hover:bg-gray-600 transition-colors duration-200"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageCircle className="h-6 w-6 text-white" />
        <span className="sr-only">Open AI Chat</span>
      </Button>
      <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </main>
  );
}
