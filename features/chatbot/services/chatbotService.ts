type ChatPayload = {
  message: string;
  detection_result?: string;
  probability?: string;
  risk_level?: string;
};

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function askChatbot(payload: ChatPayload) {
  if (!BACKEND_URL) {
    throw new Error("NEXT_PUBLIC_BACKEND_URL belum diisi di .env.local");
  }

  const response = await fetch(`${BACKEND_URL}/chatbot`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Gagal menghubungi chatbot.");
  }

  return response.json() as Promise<{ reply: string }>;
}