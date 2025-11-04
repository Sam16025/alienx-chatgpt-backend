// ===== AlienX ChatGPT Real Backend (English US Only) =====
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Root route
app.get("/", (req, res) => {
  res.send("🚀 AlienX ChatGPT Backend is running in English (US) mode!");
});

// Chat route — sends message to OpenAI API and returns response
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are AlienX AI. Always respond strictly in fluent American English (US). \
Do not use any other language or British spelling. \
If the user writes in another language, first translate their message to English (US) and reply only in English (US).",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply = response.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to connect to OpenAI" });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
