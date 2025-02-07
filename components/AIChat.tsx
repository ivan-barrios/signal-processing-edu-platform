"use client";

import React, { useEffect, useRef, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Send, Loader } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);

  // Updated: Initialize isMobile safely for SSR without using window directly.
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  // Ref to the dummy element at the end of the scrollable messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Ref for the input element.
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Update the CSS variable --vh to fix Mobile Safari issues with viewport units.
  useEffect(() => {
    const setVhProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      setIsMobile(window.innerWidth < 768);
    };

    setVhProperty();
    window.addEventListener("resize", setVhProperty);

    return () => window.removeEventListener("resize", setVhProperty);
  }, []);

  // Prevent auto focus from showing the keyboard on mobile.
  // Radix UI's DialogContent provides `onOpenAutoFocus`. Calling `event.preventDefault()`
  // disables the built-in auto-focusing behavior.
  // NOTE: Ensure no other logic (or autoFocus attribute) is triggering focus.
  // This way the input remains unfocused on opening.

  // When a new message from the assistant is received, clear the loading state.
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === "assistant") {
        setIsLoading(false);
      }
    }
  }, [messages]);

  // Auto-scroll to the bottom when the chat opens or a new message is added.
  useEffect(() => {
    setTimeout(() => {
      if (isOpen && messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [isOpen, messages]);

  // Wrap the handleSubmit so we can set the loading state.
  const handleChatSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await handleSubmit(e);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent
            // Prevent auto-focusing on open
            onOpenAutoFocus={(event) => event.preventDefault()}
            // For desktop, fixed size is applied; on mobile, we use the CSS variable for height.
            className="p-0 overflow-hidden w-screen md:rounded-lg md:w-[600px] md:h-[80vh] md:mx-auto"
            style={isMobile ? { height: "calc(var(--vh, 1vh) * 100)" } : {}}
          >
            <DialogHeader className="hidden">
              <DialogTitle>AI Assistant</DialogTitle>
            </DialogHeader>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-lg shadow-xl flex flex-col w-full h-full md:h-[80vh] md:max-h-[1000px] p-2"
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
              </div>
              <ScrollArea className="flex-grow p-4 pb-16">
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

                {/* Loading indicator for when the AI response is pending */}
                {isLoading && (
                  <div className="mb-4 text-left">
                    <span className="p-2 rounded-lg bg-gray-100 flex items-center">
                      <Loader className="mr-2 h-4 w-4 animate-spin" />
                      <span>AI is typing...</span>
                    </span>
                  </div>
                )}

                {/* Dummy div to scroll into view */}
                <div ref={messagesEndRef} />
              </ScrollArea>
              <form
                onSubmit={handleChatSubmit}
                className="sticky bottom-0 bg-white p-4 border-t flex gap-4"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                <Input
                  ref={inputRef}
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
