"use client";

import { useChat, type UIMessage } from "@ai-sdk/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createMarkdownExit } from "markdown-exit";
import {
  ArrowUpIcon,
  CopyIcon,
  MenuIcon,
  PenSquareIcon,
  RefreshCcwIcon,
  Share2Icon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface MessageSection {
  id: string;
  messages: UIMessage[];
  isNewSection: boolean;
  isActive?: boolean;
  sectionIndex: number;
}

export default function Chat() {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const md = createMarkdownExit();
  const initialMessage: UIMessage[] = [
    {
      id: "initial-message",
      role: "assistant",
      parts: [
        {
          type: "text",
          text: "Hallo! Ich berechne Ihren Bürgergeldanspruch. Zunächst die Frage: Sind Sie erwerbsfähig?",
        },
      ],
    },
  ];

  const { messages, sendMessage, status } = useChat({
    messages: initialMessage,
  });
  const [inputValue, setInputValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const newSectionRef = useRef<HTMLDivElement>(null);
  const [hasTyped, setHasTyped] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messageSections = useMemo<MessageSection[]>(() => {
    if (!messages.length) {
      return [];
    }

    return messages.map((message, index) => ({
      id: `section-${message.id ?? index}`,
      messages: [message],
      isNewSection: true,
      isActive: index === messages.length - 1,
      sectionIndex: index,
    }));
  }, [messages]);
  const [viewportHeight, setViewportHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [completedMessages, setCompletedMessages] = useState<Set<string>>(
    new Set()
  );
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const shouldFocusAfterStreamingRef = useRef(false);

  const TOP_PADDING = 48; // pt-12 (3rem = 48px)
  const BOTTOM_PADDING = 128; // pb-32 (8rem = 128px)
  const ADDITIONAL_OFFSET = 16; // Reduced offset for fine-tuning

  useEffect(() => {
    const checkMobileAndViewport = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);

      // Capture the viewport height
      const vh = window.innerHeight;
      setViewportHeight(vh);

      // Apply fixed height to main container on mobile
      if (isMobileDevice && mainContainerRef.current) {
        mainContainerRef.current.style.height = `${vh}px`;
      }
    };

    checkMobileAndViewport();

    // Set initial height
    if (mainContainerRef.current) {
      mainContainerRef.current.style.height = isMobile
        ? `${viewportHeight}px`
        : "100svh";
    }

    // Update on resize
    window.addEventListener("resize", checkMobileAndViewport);

    return () => {
      window.removeEventListener("resize", checkMobileAndViewport);
    };
  }, [isMobile, viewportHeight]);

  // Scroll to maximum position when new section is created, but only for sections after the first
  useEffect(() => {
    if (messageSections.length > 1) {
      setTimeout(() => {
        const scrollContainer = chatContainerRef.current;

        if (scrollContainer) {
          // Scroll to maximum possible position
          scrollContainer.scrollTo({
            top: scrollContainer.scrollHeight,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [messageSections]);

  // Focus the textarea on component mount (only on desktop)
  useEffect(() => {
    if (textareaRef.current && !isMobile) {
      textareaRef.current.focus();
    }
  }, [isMobile]);

  // Set focus back to textarea after streaming ends (only on desktop)
  useEffect(() => {
    if (!status && shouldFocusAfterStreamingRef.current && !isMobile) {
      focusTextarea();
      shouldFocusAfterStreamingRef.current = false;
    }
  }, [status, isMobile]);

  // Calculate available content height (viewport minus header and input)
  const getContentHeight = () => {
    // Calculate available height by subtracting the top and bottom padding from viewport height
    return viewportHeight - TOP_PADDING - BOTTOM_PADDING - ADDITIONAL_OFFSET;
  };

  const focusTextarea = () => {
    if (textareaRef.current && !isMobile) {
      textareaRef.current.focus();
    }
  };

  const handleInputContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only focus if clicking directly on the container, not on buttons or other interactive elements
    if (
      e.target === e.currentTarget ||
      (e.currentTarget === inputContainerRef.current &&
        !(e.target as HTMLElement).closest("button"))
    ) {
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;

    // Only allow input changes when not streaming
    if (status !== "streaming") {
      setInputValue(newValue);

      if (newValue.trim() !== "" && !hasTyped) {
        setHasTyped(true);
      } else if (newValue.trim() === "" && hasTyped) {
        setHasTyped(false);
      }

      const textarea = textareaRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        const newHeight = Math.max(24, Math.min(textarea.scrollHeight, 160));
        textarea.style.height = `${newHeight}px`;
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && status !== "streaming") {
      // Add vibration when message is submitted
      navigator.vibrate(50);

      e.preventDefault();
      sendMessage({ text: inputValue });
      // Reset input before starting the AI response
      setInputValue("");
      setHasTyped(false);

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      // Only focus the textarea on desktop, not on mobile
      if (!isMobile) {
        focusTextarea();
      } else {
        // On mobile, blur the textarea to dismiss the keyboard
        if (textareaRef.current) {
          textareaRef.current.blur();
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Cmd+Enter on both mobile and desktop
    if (status !== "streaming" && e.key === "Enter" && e.metaKey) {
      e.preventDefault();
      handleSubmit(e);
      return;
    }

    // Only handle regular Enter key (without Shift) on desktop
    if (
      status !== "streaming" &&
      !isMobile &&
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const renderMessage = (message: UIMessage) => {
    const isCompleted = completedMessages.has(message.id);

    return (
      <div
        key={message.id}
        className={cn(
          "flex flex-col",
          message.role === "user" ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "max-w-[80%] px-4 py-2 rounded-2xl",
            message.role === "user"
              ? "bg-white border border-gray-200 rounded-br-none"
              : "text-gray-900"
          )}
        >
          {/* For user messages or completed system messages, render without animation */}
          {message.parts && (
            <span
              className={
                message.role === "system" && !isCompleted
                  ? "animate-fade-in"
                  : ""
              }
            >
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <div
                        className="prose"
                        key={`${message.id}-${i}`}
                        dangerouslySetInnerHTML={{
                          __html: md.render(part.text),
                        }}
                      />
                    );
                }
              })}
            </span>
          )}
        </div>

        {/* Message actions */}
        {message.role === "assistant" && (
          <div className="flex items-center gap-2 px-4 mt-1 mb-2">
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <RefreshCcwIcon className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <CopyIcon className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <Share2Icon className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <ThumbsUpIcon className="h-4 w-4" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <ThumbsDownIcon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  // Determine if a section should have fixed height (only for sections after the first)
  const shouldApplyHeight = (sectionIndex: number) => {
    return sectionIndex > 0;
  };

  return (
    <div
      ref={mainContainerRef}
      className="bg-gray-50 flex flex-col overflow-hidden"
      style={{ height: isMobile ? `${viewportHeight}px` : "100svh" }}
    >
      <header className="fixed top-0 left-0 right-0 h-12 flex items-center px-4 z-20 bg-gray-50">
        <div className="w-full flex items-center justify-between px-2">
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <MenuIcon className="h-5 w-5 text-gray-700" />
            <span className="sr-only">Menu</span>
          </Button>

          <div className="flex gap-1">
            <h1 className="text-base font-medium text-gray-800">
              Bürgergeld KI
            </h1>
            <Badge variant="destructive" className="text-xs">
              Alpha
            </Badge>
          </div>

          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
            <PenSquareIcon className="h-5 w-5 text-gray-700" />
            <span className="sr-only">New Chat</span>
          </Button>
        </div>
      </header>

      <div
        ref={chatContainerRef}
        className="grow pb-32 pt-12 px-4 overflow-y-auto"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {messageSections.map((section, sectionIndex) => (
            <div
              key={section.id}
              ref={
                sectionIndex === messageSections.length - 1 &&
                section.isNewSection
                  ? newSectionRef
                  : null
              }
            >
              {section.isNewSection && (
                <div
                  style={
                    section.isActive && shouldApplyHeight(section.sectionIndex)
                      ? { height: `${getContentHeight()}px` }
                      : {}
                  }
                  className="pt-4 flex flex-col justify-start"
                >
                  {section.messages.map((message) => renderMessage(message))}
                </div>
              )}

              {!section.isNewSection && (
                <div>
                  {section.messages.map((message) => renderMessage(message))}
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gray-50">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div
            ref={inputContainerRef}
            className={cn(
              "rounded-3xl border border-gray-200 bg-white p-3 cursor-text flex gap-3 items-center",
              status === "streaming" && "opacity-80"
            )}
            onClick={handleInputContainerClick}
          >
            <Textarea
              ref={textareaRef}
              placeholder={
                status === "streaming"
                  ? "Warten auf Antworten..."
                  : "Beantworten Sie die Frage"
              }
              className="shadow-none min-h-6 max-h-40 rounded-3xl border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0   resize-none overflow-y-auto"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => {
                // Ensure the textarea is scrolled into view when focused
                if (textareaRef.current) {
                  textareaRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }
              }}
            />
            <Button
              type="submit"
              variant="outline"
              size="icon"
              className={cn(
                "rounded-full h-8 w-8 border-0 shrink-0 transition-all duration-200",
                hasTyped ? "bg-black scale-110" : "bg-gray-200"
              )}
              disabled={!inputValue.trim() || status === "streaming"}
            >
              <ArrowUpIcon
                className={cn(
                  "h-4 w-4 transition-colors",
                  hasTyped ? "text-white" : "text-gray-500"
                )}
              />
              <span className="sr-only">Submit</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
