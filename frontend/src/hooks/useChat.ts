import { useState, useCallback } from 'react';
import { chatAPI } from '../utils/api';

export const useChat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (userMessage: string) => {
    setIsLoading(true);
    try {
      const response = await chatAPI.sendMessage(userMessage);
      setMessages((prev) => [...prev, response]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { messages, isLoading, sendMessage };
};