"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";
import { useChat } from "ai/react";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ChatMessage {
  role: "user" | "assistant" | "data" | "system";
  content: string;
}

export default function AIChat({ isOpen, onClose }: AIChatProps) {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="p-0 overflow-hidden max-md:w-screen max-md:h-screen">
            <DialogHeader className="hidden">
              <DialogTitle>AI Assistant</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl flex flex-col w-full h-full md:h-[80vh] md:max-h-[1000px] p-2"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
              </div>
              <ScrollArea className="flex-grow p-4">
                {messages.map((message: ChatMessage, index: number) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${
                        message.role === "user" ? "bg-blue-100" : "bg-gray-100"
                      }`}
                    >
                      <Markdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                      </Markdown>
                    </span>
                  </div>
                ))}
              </ScrollArea>
              <form onSubmit={handleSubmit} className="p-4 border-t flex gap-4">
                <Input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about signal processing..."
                  className="flex-grow mr-2"
                />
                <Button type="submit">
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
