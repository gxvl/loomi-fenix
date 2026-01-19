import { ChatMessage } from "@/src/common/entities/chat";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCallback, useRef, useState } from "react";

export function useGeminiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chatRef = useRef<any>(null);
  const genAI = useRef<GoogleGenerativeAI | null>(null);

  // Inicializa o Gemini
  const initializeChat = useCallback(() => {
    const apiKey = process.env.NEXT_PUBLIC_API_AI;
    if (!apiKey) {
      console.error("API key não encontrada");
      return;
    }

    genAI.current = new GoogleGenerativeAI(apiKey);

    const model = genAI.current.getGenerativeModel({
      model: "gemini-flash-latest",
      systemInstruction: `Você é um assistente virtual inteligente para uma plataforma de seguros. 
      Seu nome é "Assistente Loomi Fenix". 
      Você ajuda os usuários a:
      - Entender detalhes sobre apólices de seguro
      - Fazer propostas de seguro
      - Agendar ligações com clientes
      - Consultar histórico de interações
      - Responder dúvidas sobre seguros automotivos
      
      Seja sempre educado, profissional e prestativo. 
      Quando sugerir ações, seja específico e objetivo.`
    });

    chatRef.current = model.startChat({
      history: []
    });
  }, []);

  // Adiciona mensagem do usuário
  const addUserMessage = useCallback((content: string) => {
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      author: "Ricardo Leite - Seguro Automotivo",
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "user_message"
    };

    setMessages((prev) => [...prev, userMessage]);
    return userMessage;
  }, []);

  // Adiciona mensagem do assistente
  const addAssistantMessage = useCallback((content: string) => {
    const assistantMessage: ChatMessage = {
      id: `msg_${Date.now()}_assistant`,
      author: "Sugestão da IA",
      content,
      timestamp: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      }),
      type: "assistant_message"
    };

    setMessages((prev) => [...prev, assistantMessage]);
    return assistantMessage;
  }, []);

  // Envia mensagem para o Gemini
  const sendMessage = useCallback(
    async (userMessage: string) => {
      if (!chatRef.current) {
        initializeChat();
      }

      setIsLoading(true);

      try {
        // Adiciona mensagem do usuário
        addUserMessage(userMessage);

        // Envia para o Gemini
        const result = await chatRef.current.sendMessage(userMessage);
        const response = await result.response;
        const text = response.text();

        // Adiciona resposta do assistente
        addAssistantMessage(text);
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        addAssistantMessage(
          "Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [addUserMessage, addAssistantMessage, initializeChat]
  );

  // Ações específicas dos botões
  const sendProposal = useCallback(async () => {
    await sendMessage(
      "Gostaria de enviar uma proposta de seguro para este cliente. Pode me ajudar com os próximos passos?"
    );
  }, [sendMessage]);

  const makeCall = useCallback(async () => {
    await sendMessage(
      "Preciso fazer uma ligação para este cliente. Quais informações importantes devo mencionar?"
    );
  }, [sendMessage]);

  const viewHistory = useCallback(async () => {
    await sendMessage(
      "Quero ver o histórico de interações com este cliente. O que devo verificar?"
    );
  }, [sendMessage]);

  return {
    messages,
    isLoading,
    sendMessage,
    sendProposal,
    makeCall,
    viewHistory,
    initializeChat
  };
}
