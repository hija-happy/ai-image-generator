// const express = require("express");
// const cors = require("cors");
// require("dotenv").config(); // To load HF_TOKEN from .env
// const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/api/generate", async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
//     const response = await fetch("https://router.huggingface.co/fal-ai/fal-ai/flux-lora", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${process.env.HF_TOKEN}`, // Make sure your .env file has HF_TOKEN
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         prompt: prompt,
//         response_format: "base64",
//         model: "black-forest-labs/FLUX.1-schnell",
//       }),
//     });

//     const imageBlob = await response.blob();
//     const buffer = await imageBlob.arrayBuffer();
//     const base64Image = Buffer.from(buffer).toString("base64");

//     // Send the image as base64-encoded string to frontend
//     res.json({ data: [`data:image/png;base64,${base64Image}`] });

//   } catch (error) {
//     console.error("Image generation failed:", error);
//     res.status(500).json({ error: "Image generation failed" });
//   }
// });

// app.listen(3001, () => {
//   console.log("🚀 Server running on http://localhost:3001");
// });


import cors from "cors";
import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const API_KEY = "AIzaSyAg-my8qjStjA4ndSoetPdm6G8KEawkUCA"; // put your key here

app.post("/api/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Received prompt:", prompt);

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            response_modalities: ["IMAGE"]
          }
        }),
      }
    );

    console.log("API Response status:", response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`Google API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("API Response data:", JSON.stringify(data, null, 2));
    
    // Extract base64 image from Gemini response
    if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts) {
      const imagePart = data.candidates[0].content.parts.find(part => part.inline_data);
      if (imagePart && imagePart.inline_data) {
        const base64Image = `data:${imagePart.inline_data.mime_type};base64,${imagePart.inline_data.data}`;
        res.json({ data: [base64Image] });
      } else {
        throw new Error("No image found in API response");
      }
    } else {
      throw new Error("Invalid response structure from Google API");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
