import { useState } from "react";
import { buildPrompt } from '../utils/promptLayers/index.js';
import { validateInputs } from '../utils/uxGuards.js';

const PromptPage = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "SaaS",
    industry: "Fintech",
    tone: "Clean & minimal",
    visualStyle: "Flat illustration",
    background: "Light",
    aspectRatio: "16:9"
  });
  const [imageURL, setImageURL] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const handleInputChange = (field, value) => {
    const updatedFormData = {
      ...formData,
      [field]: value
    };
    
    setFormData(updatedFormData);
    
    // Real-time validation (warnings only, not errors)
    const { warnings: newWarnings } = validateInputs(updatedFormData);
    setWarnings(newWarnings);
    
    // Convert to JSON and console.log for testing
    const inputs = {
      productName: updatedFormData.productName,
      productCategory: updatedFormData.productCategory,
      industry: updatedFormData.industry,
      tone: updatedFormData.tone,
      visualStyle: updatedFormData.visualStyle,
      background: updatedFormData.background,
      aspectRatio: updatedFormData.aspectRatio
    };
    
    console.log("Current inputs as JSON:", JSON.stringify(inputs, null, 2));
  };

  const generatePrompt = () => {
    return buildPrompt(formData);
  };

const generateImage = async () => {
  // Validate inputs before proceeding
  const validation = validateInputs(formData);
  
  if (validation.errors.length > 0) {
    setErrors(validation.errors);
    return;
  }
  
  // Clear any previous errors
  setErrors([]);
  
  if (!formData.productName.trim()) {
    setErrors(["Please enter a product name"]);
    return;
  }

  setLoading(true);
  setImageURL(null); // clear old image while loading

  

   try {
    const res = await fetch("http://localhost:5000/api/generate-image", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: generatePrompt(),
        aspectRatio: formData.aspectRatio || "16:9"
      })
    });
    

//     if (!res.ok) {
//       const errorData = await res.json();
//       throw new Error(errorData.error || "Server error");
//     }

//     const data = await res.json();

//     // Check if response data is valid and has an array with at least one image URL
//      if (!data || !data.image) {
//       throw new Error("Invalid response from server");
//     }

//     const imageSrc = `data:image/png;base64,${data.image}`;
//     setImageURL(imageSrc);
     
//      console.log("Image generated successfully");
//   } catch (error) {
//     console.error("Error generating image:", error);
//     alert("Failed to generate image. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

 const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Generation failed");
    }

    // ✅ THIS is the key line
    const imgSrc = `data:image/png;base64,${data.image}`;
    setImageURL(imgSrc);

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

    
  

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background Bubbles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 rounded-full opacity-40 mix-blend-screen animate-pulse"
            style={{
              background: i % 2 === 0 
                ? 'radial-gradient(circle at 30% 30%, #cba6c1, #ff5fd2, #b967ff)' 
                : 'radial-gradient(circle at 30% 30%, #4e04ee, #6019d2, #8b5cf6)',
              filter: 'blur(60px)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center pt-12 pb-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 mb-4">
              ✨ AI-Powered Hero Visuals
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-500 to-pink-400 bg-clip-text text-transparent">
                Generate Hero Visuals
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Create stunning, professional hero images for your landing pages in seconds. 
              Powered by intelligent prompts and quality guardrails.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
        <div className="bg-black/70 backdrop-blur-sm rounded-2xl shadow-2xl border border-purple-500/30 overflow-hidden">
          
          {/* Form Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 text-white">
            <h2 className="text-2xl font-semibold">Design Your Hero Visual</h2>
            <p className="text-purple-100 mt-2">Fill out the details below to generate your custom hero image</p>
          </div>

          {/* Form Content */}
          <div className="p-8 bg-gradient-to-br from-black/90 to-purple-900/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Product Basics Section */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-white">Product Basics</h3>
                </div>
                
                {/* Product Name */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., FlowAI, DataSync Pro..."
                    value={formData.productName}
                    onChange={(e) => handleInputChange('productName', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white placeholder-purple-400"
                  />
                </div>

                {/* Product Category */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Product Category
                  </label>
                  <select
                    value={formData.productCategory}
                    onChange={(e) => handleInputChange('productCategory', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="SaaS" className="bg-black text-white">SaaS</option>
                    <option value="Mobile App" className="bg-black text-white">Mobile App</option>
                    <option value="Developer Tool" className="bg-black text-white">Developer Tool</option>
                    <option value="AI Product" className="bg-black text-white">AI Product</option>
                  </select>
                </div>

                {/* Industry */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Industry
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleInputChange('industry', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="Fintech" className="bg-black text-white">Fintech</option>
                    <option value="Health" className="bg-black text-white">Health</option>
                    <option value="Education" className="bg-black text-white">Education</option>
                    <option value="E-commerce" className="bg-black text-white">E-commerce</option>
                    <option value="Developer / Tech" className="bg-black text-white">Developer / Tech</option>
                    <option value="Marketing" className="bg-black text-white">Marketing</option>
                  </select>
                </div>
              </div>

              {/* Visual Preferences Section */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-3">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-white">Visual Preferences</h3>
                </div>
                
                {/* Tone */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Tone
                  </label>
                  <select
                    value={formData.tone}
                    onChange={(e) => handleInputChange('tone', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="Clean & minimal" className="bg-black text-white">Clean & minimal</option>
                    <option value="Modern & futuristic" className="bg-black text-white">Modern & futuristic</option>
                    <option value="Friendly & playful" className="bg-black text-white">Friendly & playful</option>
                    <option value="Professional & serious" className="bg-black text-white">Professional & serious</option>
                  </select>
                </div>

                {/* Visual Style */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Visual Style
                  </label>
                  <select
                    value={formData.visualStyle}
                    onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="Flat illustration" className="bg-black text-white">Flat illustration</option>
                    <option value="3D illustration" className="bg-black text-white">3D illustration</option>
                    <option value="Abstract shapes" className="bg-black text-white">Abstract shapes</option>
                    <option value="Isometric UI-style" className="bg-black text-white">Isometric UI-style</option>
                  </select>
                </div>

                {/* Background */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Background
                  </label>
                  <select
                    value={formData.background}
                    onChange={(e) => handleInputChange('background', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="Light" className="bg-black text-white">Light</option>
                    <option value="Dark" className="bg-black text-white">Dark</option>
                    <option value="Soft gradient" className="bg-black text-white">Soft gradient</option>
                  </select>
                </div>

                {/* Aspect Ratio */}
                <div className="group">
                  <label className="block text-sm font-medium text-purple-300 mb-2">
                    Aspect Ratio
                  </label>
                  <select
                    value={formData.aspectRatio}
                    onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                    className="w-full p-4 border border-purple-500/30 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all duration-200 bg-black/50 backdrop-blur-sm text-white"
                  >
                    <option value="16:9" className="bg-black text-white">16:9 (default hero)</option>
                    <option value="4:3" className="bg-black text-white">4:3</option>
                    <option value="1:1" className="bg-black text-white">1:1</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Errors Display */}
            {errors.length > 0 && (
              <div className="mt-8 p-6 bg-red-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="text-red-400 text-xl mr-3">⚠️</div>
                  <div>
                    <h4 className="text-lg font-medium text-red-300 mb-2">Please fix the following:</h4>
                    <ul className="space-y-1 text-red-200">
                      {errors.map((error, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Warnings Display */}
            {warnings.length > 0 && (
              <div className="mt-6 p-6 bg-yellow-900/30 border border-yellow-500/50 rounded-xl backdrop-blur-sm">
                <div className="flex items-start">
                  <div className="text-yellow-400 text-xl mr-3">💡</div>
                  <div>
                    <h4 className="text-lg font-medium text-yellow-300 mb-2">Suggestions for better results:</h4>
                    <ul className="space-y-1 text-yellow-200">
                      {warnings.map((warning, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-yellow-400 mr-2">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Generate Button */}
            <div className="mt-10 text-center">
              <button
                onClick={generateImage}
                disabled={loading}
                className="group relative inline-flex items-center px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-lg font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transform hover:-translate-y-1"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating your hero visual...
                  </>
                ) : (
                  <>
                    <span className="mr-2">✨</span>
                    Generate Hero Visual
                    <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5-5 5M6 12h12"></path>
                    </svg>
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-purple-400">
                High-quality results in 10-15 seconds
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8">
          <div className="bg-black/80 backdrop-blur-sm p-8 rounded-2xl border border-purple-500/30 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
              <svg className="animate-spin w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Creating your hero visual</h3>
            <p className="text-purple-300">Please wait while we generate your custom image...</p>
          </div>
        </div>
      )}

      {/* Generated Image Display */}
      {imageURL && (
        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl border border-purple-500/30 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-6 text-white">
              <h3 className="text-2xl font-semibold flex items-center">
                <span className="mr-3">🎉</span>
                Your Hero Visual is Ready!
              </h3>
              <p className="text-purple-100 mt-2">Download and use in your landing page</p>
            </div>
            <div className="p-8">
              <div className="relative group">
                <img 
                  src={imageURL} 
                  alt="Generated Hero Visual" 
                  className="w-full rounded-xl shadow-2xl shadow-purple-500/20 transition-transform duration-300 group-hover:scale-[1.02]" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="mt-6 flex justify-center space-x-4">
                <button className="px-6 py-3 bg-black/50 border border-purple-500/50 text-purple-300 rounded-lg hover:bg-purple-900/30 hover:border-purple-400 transition-colors">
                  Download PNG
                </button>
                <button 
                  onClick={() => {setImageURL(null); setFormData({...formData})}}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-colors"
                >
                  Generate Another
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptPage;
