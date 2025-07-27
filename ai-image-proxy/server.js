const express = require("express");
const cors = require("cors");
require("dotenv").config(); // To load HF_TOKEN from .env
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://router.huggingface.co/fal-ai/fal-ai/flux-lora", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`, // Make sure your .env file has HF_TOKEN
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
        response_format: "base64",
        model: "black-forest-labs/FLUX.1-schnell",
      }),
    });

    const imageBlob = await response.blob();
    const buffer = await imageBlob.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    // Send the image as base64-encoded string to frontend
    res.json({ data: [`data:image/png;base64,${base64Image}`] });

  } catch (error) {
    console.error("Image generation failed:", error);
    res.status(500).json({ error: "Image generation failed" });
  }
});

app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});
