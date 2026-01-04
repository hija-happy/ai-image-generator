import React, { useState } from "react";

function Test() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = ""; // replace with your key

  const generateImage = async () => {
    if (!prompt) return;
    setLoading(true);
    setImageUrl(null);

    try {
const response = await fetch("http://localhost:5000/generate-image", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt }),
});



      const data = await response.json();
      console.log("API Response:", data);

      if (data?.candidates?.[0]?.content?.parts?.[0]?.imageBase64) {
        setImageUrl("data:image/png;base64," + data.candidates[0].content.parts[0].imageBase64);
      } else {
        alert("No image generated. Check API response.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating image.");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Gemini Image Generator</h2>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt"
        style={{ width: "300px", padding: "10px", marginRight: "10px" }}
      />
      <button onClick={generateImage} disabled={loading}>
        {loading ? "Generating..." : "Generate Image"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {imageUrl ? (
          <img src={imageUrl} alt="Generated" style={{ maxWidth: "500px", border: "2px solid #ccc", borderRadius: "10px" }} />
        ) : (
          <p>No image generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default Test;
