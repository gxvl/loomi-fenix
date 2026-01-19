"use client";

import { Button } from "@/components/ui/button";
import LoadingComponent from "@/src/components/LoadingComponent/loading";
import { Sidebar } from "@/src/components/Sidebar/sidebar";
import { TopTab } from "@/src/components/TopTab/toptab";
import { useGetChat } from "@/src/hooks/queries/useGetChat";
import { useGeminiChat } from "@/src/hooks/useGeminiChat";
import { Check, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
export default function ChatPage() {
  const { data, isLoading: isLoadingInitial, isError, error } = useGetChat();

  const {
    messages: geminiMessages,
    isLoading: isLoadingGemini,
    sendMessage,
    sendProposal,
    makeCall,
    viewHistory,
    initializeChat
  } = useGeminiChat();

  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const allMessages = useMemo(
    () => [...(data?.messages || []), ...geminiMessages],
    [data?.messages, geminiMessages]
  );

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, isLoadingGemini]);

  console.log(allMessages);

  const handleSend = async () => {
    if (inputMessage.trim() && !isLoadingGemini) {
      await sendMessage(inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoadingGemini) {
      handleSend();
    }
  };

  if (isLoadingInitial) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <LoadingComponent />
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex h-screen w-full items-center justify-center">
        <div className="text-xl text-red-500">
          Erro ao carregar chat: {error?.message}
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden">
      <TopTab title="Chat & Assistente Virtual" />
      <Sidebar />

      <div className="mx-20 mt-32 ml-32 flex h-[calc(90vh-4rem)] flex-col place-self-center">
        <div className="flex flex-1 flex-col overflow-hidden p-8">
          <div className="bg-card-blue scrollbar-hide flex flex-1 flex-col overflow-y-auto rounded-3xl border-[0.5px] border-[#2D3344] p-8">
            <div className="mb-6 flex justify-center">
              <span className="text-sm text-gray-400">
                {allMessages.length > 0 ? allMessages[0].timestamp : ""}
              </span>
            </div>

            <div className="flex flex-col gap-6">
              {allMessages.map((message) => (
                <div key={message.id} className="flex flex-col gap-3">
                  <div
                    className={`flex ${message.type === "user_message" ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[60%] rounded-2xl px-5 py-4 ${
                        message.type === "user_message"
                          ? "bg-[#2776D2] text-white"
                          : "bg-[#3D4457] text-white"
                      }`}
                    >
                      <div
                        className={`mb-2 text-sm font-semibold ${
                          message.type === "user_message"
                            ? "text-white"
                            : "text-[#9FA3AC]"
                        }`}
                      >
                        {message.author}
                      </div>

                      <div className="font-montserrat text-sm leading-relaxed whitespace-pre-wrap">
                        {message.type === "assistant_message" ? (
                          <ReactMarkdown
                            components={{
                              strong: ({ children }) => (
                                <strong className="font-bold">
                                  {children}
                                </strong>
                              ),
                              em: ({ children }) => (
                                <em className="italic">{children}</em>
                              ),
                              p: ({ children }) => (
                                <p className="mb-2 last:mb-0">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="mb-2 ml-4 list-disc">
                                  {children}
                                </ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="mb-2 ml-4 list-decimal">
                                  {children}
                                </ol>
                              ),
                              li: ({ children }) => (
                                <li className="mb-1">{children}</li>
                              ),
                              code: ({ children }) => (
                                <code className="rounded bg-black/20 px-1 py-0.5 text-xs">
                                  {children}
                                </code>
                              )
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        ) : (
                          message.content
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-end gap-1">
                        <span className="text-xs text-gray-300">
                          {message.timestamp}
                        </span>
                        {message.type === "user_message" && (
                          <Check className="h-3 w-3 text-gray-300" />
                        )}
                      </div>
                    </div>
                  </div>

                  {message.id === "msg_004" && (
                    <div className={`flex justify-end`}>
                      <div className="flex max-w-[80%] gap-2 xl:max-w-[60%] xl:gap-4">
                        <Button
                          variant="glowingdefault"
                          className="flex-1 rounded-full bg-[#2776D2] px-4 py-2 text-xs text-white hover:bg-[#1e5fb0] disabled:opacity-50 xl:px-8 xl:py-4 xl:text-sm"
                          onClick={sendProposal}
                          disabled={isLoadingGemini}
                        >
                          Enviar proposta
                        </Button>
                        <Button
                          variant="glowingdefault"
                          className="flex-1 rounded-full bg-[#2776D2] px-4 py-2 text-xs text-white hover:bg-[#1e5fb0] disabled:opacity-50 xl:px-8 xl:py-4 xl:text-sm"
                          onClick={makeCall}
                          disabled={isLoadingGemini}
                        >
                          Fazer ligação
                        </Button>
                        <Button
                          variant="glowingdefault"
                          className="flex-1 rounded-full bg-[#2776D2] px-4 py-2 text-xs text-white hover:bg-[#1e5fb0] disabled:opacity-50 xl:px-8 xl:py-4 xl:text-sm"
                          onClick={viewHistory}
                          disabled={isLoadingGemini}
                        >
                          Ver histórico
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {isLoadingGemini && (
                <div className="flex justify-end">
                  <div className="max-w-[60%] rounded-2xl bg-[#3D4457] px-5 py-4 text-white">
                    <div className="mb-2 text-xs font-semibold">
                      Sugestão da IA
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-bounce rounded-full bg-white"></span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="mt-4 w-[60%] place-self-center">
            <div className="bg-card-blue relative flex items-center rounded-full border border-[#91949D] px-6 py-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escreva aqui..."
                disabled={isLoadingGemini}
                className="placeholder:text-light-white flex-1 bg-transparent text-white focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={!inputMessage.trim() || isLoadingGemini}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2776D2] text-white transition-colors hover:bg-[#1e5fb0] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
