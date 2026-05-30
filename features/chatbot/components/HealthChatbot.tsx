"use client";

import { useState } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { askChatbot } from "../services/chatbotService";

export default function HealthChatbot() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([
    {
      role: "bot",
      text: "Halo 👋 Saya Asisten Edukasi BrainScan AI. Saya dapat membantu menjelaskan informasi tumor otak, MRI, dan hasil deteksi AI.",
    },
  ]);

  async function handleSend() {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const data = await askChatbot({
        message: userMessage,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Terjadi kesalahan saat menghubungi AI.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* BUTTON FLOATING */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-2xl transition hover:scale-110 hover:bg-blue-700"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={30} />}
      </button>

      {/* CHATBOX */}
      {isOpen && (
        <div className="fixed bottom-28 right-6 z-50 flex h-[520px] w-[360px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-900">
          {/* HEADER */}
          <div className="flex items-center gap-3 border-b border-slate-200 px-4 py-4 dark:border-slate-800">
            <div className="rounded-2xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-950">
              <Bot size={22} />
            </div>

            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                BrainScan AI Assistant
              </h2>

              <p className="text-xs text-slate-500">
                Edukasi Tumor Otak
              </p>
            </div>
          </div>

          {/* CHAT */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4 dark:bg-slate-950">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                  msg.role === "user"
                    ? "ml-auto bg-blue-600 text-white"
                    : "bg-white text-slate-700 shadow dark:bg-slate-800 dark:text-slate-200"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="w-fit rounded-2xl bg-white px-4 py-3 text-sm shadow dark:bg-slate-800 dark:text-slate-200">
                AI sedang mengetik...
              </div>
            )}
          </div>

          {/* INPUT */}
          <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Tanyakan sesuatu..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />

              <button
                onClick={handleSend}
                className="rounded-2xl bg-blue-600 p-3 text-white transition hover:bg-blue-700"
              >
                <Send size={18} />
              </button>
            </div>

            <p className="mt-2 text-center text-[11px] text-slate-400">
              Chatbot hanya untuk edukasi, bukan diagnosis medis.
            </p>
          </div>
        </div>
      )}
    </>
  );
}