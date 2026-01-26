// import cors from "cors";
// import express from "express";
// import FormData from "form-data";

// import dotenv from "dotenv";
// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.post("/api/generate-image", async (req, res) => {
//   const { prompt, aspectRatio } = req.body;

// if (!prompt) {
//     return res.status(400).json({ error: "Prompt is missing" });
//   }

//   const sizeMap = {
//     "16:9": { width: 1024, height: 576 },
//     "4:3": { width: 1024, height: 768 },
//     "1:1": { width: 1024, height: 1024 }
//   };

//   const { width, height } = sizeMap[aspectRatio] || sizeMap["16:9"];

//   try {
// const formData = new FormData();
//     formData.append("prompt", prompt);
// formData.append(
//   "negative_prompt",
//   "realistic photography, people, faces, hands, text, logos, dashboards, charts, watermarks"
// );
// formData.append("width", width);
// formData.append("height", height);
// formData.append("steps", 25);
// formData.append("cfg_scale", 7);
// formData.append("samples", 1);

//     const response = await fetch(
//       "https://api.stability.ai/v2beta/stable-image/generate/sdxl",
//       {
//         method: "POST",
//         headers: {
//           ...formData.getHeaders(),
//           Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
//           Accept: "image/png",
//         },
//         body: formData
//       }
//     );

//  if (!response.ok) {
//   const errorText = await response.text();
//   console.error("❌ Stability error:", errorText);
//   return res.status(400).json({ error: errorText });
// }

//   const buffer = await response.arrayBuffer();
// const base64Image = Buffer.from(buffer).toString("base64");

// res.json({ image: base64Image });

//   } catch (error) {
//   console.error("🔥 Stability API ERROR:", error);
//   res.status(500).json({
//     error: "Image generation failed",
//     details: error.message
//   });
// }
// });

// app.get("/", (req, res) => {
//   res.send("AI Image Generator Backend is running");
// });

// app.listen(5000, () => {
//   console.log("Backend running on http://localhost:5000");
// });
// console.log("Routes registered");




import cors from "cors";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/generate-image", async (req, res) => {
  const { prompt, aspectRatio } = req.body;

  console.log("🔍 Received request:");
  console.log("- Prompt length:", prompt?.length || 0);
  console.log("- Aspect ratio:", aspectRatio);
  console.log("- First 100 chars of prompt:", prompt?.substring(0, 100) || "EMPTY");

  if (!prompt || typeof prompt !== "string") {
    console.error("❌ Invalid prompt:", typeof prompt, prompt);
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (prompt.trim().length === 0) {
    console.error("❌ Empty prompt after trim");
    return res.status(400).json({ error: "Prompt cannot be empty" });
  }

  // Truncate prompt if it exceeds Stability API limit (2000 chars)
  let finalPrompt = prompt.trim();
  if (finalPrompt.length > 2000) {
    console.warn(`⚠️ Prompt too long (${finalPrompt.length} chars), truncating to 2000`);
    finalPrompt = finalPrompt.substring(0, 2000);
    // Try to truncate at a sentence boundary to avoid cutting words
    const lastPeriod = finalPrompt.lastIndexOf('.');
    const lastSpace = finalPrompt.lastIndexOf(' ');
    if (lastPeriod > 1900) {
      finalPrompt = finalPrompt.substring(0, lastPeriod + 1);
    } else if (lastSpace > 1900) {
      finalPrompt = finalPrompt.substring(0, lastSpace);
    }
    console.log(`📝 Truncated prompt to ${finalPrompt.length} characters`);
  }

  // ✅ VALID Stability sizes (divisible by 64)
const sizeMap = {
  "1:1": { width: 1024, height: 1024 },
  "16:9": { width: 1536, height: 640 },
  "4:3": { width: 1344, height: 768 }
};

const { width, height } = sizeMap[aspectRatio] || sizeMap["16:9"];


  try {
    const requestBody = {
      text_prompts: [
        {
          text: finalPrompt
        }
      ],
      cfg_scale: 7,
      steps: 25,
      width,
      height
    };

    console.log("📤 Sending to Stability API:");
    console.log("- Final prompt text length:", requestBody.text_prompts[0].text.length);
    console.log("- Width x Height:", width, "x", height);

    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    if (!response.ok) {
      // 🔴 This is where Stability returns id / name / errors[]
      console.error("STABILITY ERROR:", JSON.stringify(data, null, 2));
      return res.status(400).json(data);
    }

    // ✅ Base64 image (official response shape)
    const base64Image = data.artifacts[0].base64;

    return res.json({ image: base64Image });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return res.status(500).json({
      error: "Image generation failed",
      details: error.message
    });
  }
});

app.get("/", (_, res) => {
  res.send("AI Image Generator Backend is running");
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
