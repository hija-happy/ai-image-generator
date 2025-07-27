import React, { useState } from "react";

const PromptPage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);

const generateImage = async () => {
  if (!prompt.trim()) {
    alert("Please enter a prompt");
    return;
  }

  setLoading(true);
  setImageURL(null); // clear old image while loading

  try {
    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    // Check if response data is valid and has an array with at least one image URL
    if (!data || !data.data || !data.data[0]) {
      throw new Error("Invalid response from server");
    }

    setImageURL(data.data[0]);
    console.log("Image generated:", data.data[0]);
  } catch (error) {
    console.error("Error generating image:", error);
    alert("Failed to generate image. Please try again.");
  } finally {
    setLoading(false);
  }
};

    
  

  return (
    <div className="text-center p-4">
      <h1 className="text-xl font-bold mb-2">AI Image Generator</h1>
      <input
        type="text"
        placeholder="Enter your prompt..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="p-2 border rounded w-full max-w-md"
      />
        <button
        onClick={generateImage}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading} // disable button while loading
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {loading && <p className="mt-4">Generating image...</p>}

      {imageURL && (
        <div className="mt-4">
          <img src={imageURL} alt="Generated" className="max-w-full rounded" />
        </div>
      )}
    </div>
  );
};

export default PromptPage;
