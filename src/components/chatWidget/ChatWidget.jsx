"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  HiChatBubbleLeftRight,
  HiXMark,
  HiPaperAirplane,
} from "react-icons/hi2";
import { BsRobot } from "react-icons/bs";
import axios from "axios";

const SESSION_KEY = "autoassistant_chat_v1";

const GREETING = {
  id: 1,
  sender: "bot",
  text: "Hi! 👋 I'm the Best Auto assistant. Tell me what kind of car you need, or ask about pricing, availability, or our rental policies.",
  time: nowLabel(),
};

function nowLabel() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// UI message {id, sender, text, time} -> API message {role, content}
function toApiMessages(uiMessages) {
  return uiMessages.map((m) => ({
    role: m.sender === "user" ? "user" : "assistant",
    content: m.text,
  }));
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const widgetRef = useRef(null);
  const chatBottomRef = useRef(null);

  // Load prior conversation from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // corrupted storage, fall back to greeting
    }
    setHydrated(true);
  }, []);

  // Persist conversation on every change (after initial hydration to avoid overwriting with default)
  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
    } catch {
      // storage full/unavailable, ignore
    }
  }, [messages, hydrated]);

  // Close when clicking outside the chat widget container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping, isOpen]);

  // Hide completely on /dashboard routes
  if (pathname?.startsWith("/dashboard")) {
    return null;
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text,
      time: nowLabel(),
    };

    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await axios.post("/api/chat", {
        messages: toApiMessages(nextMessages),
      });

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: data.reply,
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry, something went wrong on my end — please try again in a moment.",
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleReset = () => {
    setMessages([GREETING]);
    sessionStorage.removeItem(SESSION_KEY);
  };

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end"
    >
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="mb-4 flex h-[480px] w-[340px] flex-col overflow-hidden rounded-2xl border border-border-100 bg-white shadow-2xl transition-all duration-300 ease-in-out sm:w-[380px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-primary px-4 py-3.5 text-white">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                <BsRobot className="h-5 w-5 text-white" />
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-primary bg-success" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">
                  AutoAssistant
                </h3>
                <p className="text-[11px] font-medium text-white/80">
                  Online | Instant Reply
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                className="rounded-full px-2 py-1 text-[10px] font-semibold text-white/80 transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                aria-label="Reset conversation"
                title="Start a new conversation"
              >
                New chat
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/20 hover:text-white active:scale-95"
                aria-label="Close Chat"
              >
                <HiXMark className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-surface-50 p-4 space-y-3">
            {messages.map((msg) => {
              const isUser = msg.sender === "user";
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[82%] whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-xs font-medium leading-relaxed shadow-xs ${
                      isUser
                        ? "rounded-br-xs bg-primary text-white"
                        : "rounded-bl-xs bg-white text-secondary border border-border-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="mt-1 text-[10px] text-gray-400">
                    {msg.time}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-xs bg-white border border-border-100 px-4 py-3 text-xs text-text-body w-fit">
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={chatBottomRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSendMessage}
            className="flex items-center gap-2 border-t border-border-100 bg-white p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isTyping}
              className="flex-1 rounded-full border border-border-100 bg-surface-50 px-4 py-2 text-xs text-secondary placeholder-text-body focus:border-primary focus:outline-none disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white transition-all duration-200 hover:scale-105 hover:bg-primary-alt active:scale-95 disabled:opacity-40 disabled:hover:scale-100"
              aria-label="Send Message"
            >
              <HiPaperAirplane className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl transition-all duration-300 ease-in-out hover:scale-110 hover:bg-primary-alt active:scale-95"
        aria-label="Open Chat"
      >
        {isOpen ? (
          <HiXMark className="h-7 w-7 transition-transform duration-200" />
        ) : (
          <div className="relative">
            <HiChatBubbleLeftRight className="h-7 w-7 transition-transform duration-200 group-hover:scale-110" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-success" />
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
