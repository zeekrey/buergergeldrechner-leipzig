"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  ArrowUpIcon,
  CircleStopIcon,
  MessageCircleQuestionIcon,
  RotateCcwIcon,
} from "lucide-react";
import { useMemo, useState, type FormEvent, type KeyboardEvent } from "react";
import ReactMarkdown from "react-markdown";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Message,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import { Spinner } from "@/components/ui/spinner";
import { prepareChatRequest } from "@/lib/chat/transport";

const MAX_INPUT_CHARACTERS = 4_000;
export function QuestionChat({ questionTitle }: { questionTitle: string }) {
  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: prepareChatRequest,
      }),
    []
  );
  const {
    clearError,
    error,
    messages,
    regenerate,
    sendMessage,
    status,
    stop,
  } = useChat({ transport });
  const [input, setInput] = useState("");
  const isBusy = status === "submitted" || status === "streaming";
  const trimmedInput = input.trim();

  function submitQuestion(question: string) {
    const text = question.trim();
    if (!text || text.length > MAX_INPUT_CHARACTERS || isBusy) {
      return;
    }
    clearError();
    setInput("");
    void sendMessage({ text });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitQuestion(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Card className="min-h-0 flex-1 border-none border-0 ring-0">
        <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
          <MessageScrollerProvider>
            <MessageScroller>
              <MessageScrollerViewport>
                <MessageScrollerContent
                  className="p-(--card-spacing)"
                  aria-live="polite"
                  aria-label="Chatverlauf"
                >
                  {messages.length === 0 ? (
                    <Empty className="min-h-full border-0">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <MessageCircleQuestionIcon aria-hidden="true" />
                        </EmptyMedia>
                        <EmptyTitle>Was möchten Sie wissen?</EmptyTitle>
                        <EmptyDescription>
                          Stellen Sie eine Frage zur Grundsicherung.
                        </EmptyDescription>
                      </EmptyHeader>
                    </Empty>
                  ) : (
                    messages.map((message) => (
                      <MessageScrollerItem
                        key={message.id}
                        messageId={message.id}
                        scrollAnchor={message.role === "user"}
                      >
                        <Message
                          align={message.role === "user" ? "end" : "start"}
                        >
                          <MessageContent>
                            <MessageHeader>
                              {message.role === "user" ? "Sie" : "Auskunft"}
                            </MessageHeader>
                            {message.parts.map((part, index) => {
                              if (part.type !== "text") {
                                return null;
                              }

                              return (
                                <Bubble
                                  key={`${message.id}-${index}`}
                                  variant={
                                    message.role === "user" ? "default" : "muted"
                                  }
                                >
                                  <BubbleContent>
                                    {message.role === "assistant" ? (
                                      <div className="prose prose-sm max-w-none text-inherit prose-headings:text-inherit prose-p:text-inherit prose-strong:text-inherit prose-li:text-inherit">
                                        <ReactMarkdown>{part.text}</ReactMarkdown>
                                      </div>
                                    ) : (
                                      <p className="whitespace-pre-wrap">
                                        {part.text}
                                      </p>
                                    )}
                                  </BubbleContent>
                                </Bubble>
                              );
                            })}
                          </MessageContent>
                        </Message>
                      </MessageScrollerItem>
                    ))
                  )}

                  {isBusy ? (
                    <MessageScrollerItem scrollAnchor={false}>
                      <Marker role="status">
                        <MarkerIcon>
                          <Spinner aria-label="Antwort wird erstellt" />
                        </MarkerIcon>
                        <MarkerContent>
                          {status === "submitted"
                            ? "Wissensbasis wird durchsucht …"
                            : "Antwort wird erstellt …"}
                        </MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  ) : null}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </MessageScrollerProvider>
        </CardContent>

        <CardFooter className="flex-col items-stretch gap-3">
          {error ? (
            <Alert variant="destructive">
              <AlertTitle>Antwort nicht verfügbar</AlertTitle>
              <AlertDescription>
                Die Antwort konnte nicht erstellt werden. Bitte versuchen Sie
                es erneut.
              </AlertDescription>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => void regenerate()}
              >
                <RotateCcwIcon data-icon="inline-start" />
                Erneut versuchen
              </Button>
            </Alert>
          ) : null}

          <form id="chat-form" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field data-disabled={isBusy || undefined}>
                <FieldLabel className="sr-only" htmlFor="chat-question">
                  Frage zur Grundsicherung
                </FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    id="chat-question"
                    value={input}
                    maxLength={MAX_INPUT_CHARACTERS}
                    disabled={isBusy}
                    rows={2}
                    placeholder="Ihre Frage zur Grundsicherung …"
                    aria-describedby="chat-input-help"
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <InputGroupAddon align="block-end">
                    <span id="chat-input-help" className="mr-auto text-xs">
                      Enter sendet, Umschalt + Enter fügt eine Zeile ein.
                    </span>
                    {isBusy ? (
                      <InputGroupButton
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => stop()}
                      >
                        <CircleStopIcon data-icon="inline-start" />
                        Stoppen
                      </InputGroupButton>
                    ) : (
                      <InputGroupButton
                        type="submit"
                        size="sm"
                        variant="default"
                        disabled={!trimmedInput}
                      >
                        <ArrowUpIcon data-icon="inline-start" />
                        Senden
                      </InputGroupButton>
                    )}
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
