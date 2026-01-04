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
    <div className="text-center p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Generate Hero Visual</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Basics Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-left text-gray-800">Product Basics</h2>
            
            {/* Product Name */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter product name..."
                value={formData.productName}
                onChange={(e) => handleInputChange('productName', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Product Category */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Product Category
              </label>
              <select
                value={formData.productCategory}
                onChange={(e) => handleInputChange('productCategory', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="SaaS">SaaS</option>
                <option value="Mobile App">Mobile App</option>
                <option value="Developer Tool">Developer Tool</option>
                <option value="AI Product">AI Product</option>
              </select>
            </div>

            {/* Industry */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                value={formData.industry}
                onChange={(e) => handleInputChange('industry', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Fintech">Fintech</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Developer / Tech">Developer / Tech</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
          </div>

          {/* Visual Preferences Section */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-left text-gray-800">Visual Preferences</h2>
            
            {/* Tone */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Tone
              </label>
              <select
                value={formData.tone}
                onChange={(e) => handleInputChange('tone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Clean & minimal">Clean & minimal</option>
                <option value="Modern & futuristic">Modern & futuristic</option>
                <option value="Friendly & playful">Friendly & playful</option>
                <option value="Professional & serious">Professional & serious</option>
              </select>
            </div>

            {/* Visual Style */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Visual Style
              </label>
              <select
                value={formData.visualStyle}
                onChange={(e) => handleInputChange('visualStyle', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Flat illustration">Flat illustration</option>
                <option value="3D illustration">3D illustration</option>
                <option value="Abstract shapes">Abstract shapes</option>
                <option value="Isometric UI-style">Isometric UI-style</option>
              </select>
            </div>

            {/* Background */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Background
              </label>
              <select
                value={formData.background}
                onChange={(e) => handleInputChange('background', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="Soft gradient">Soft gradient</option>
              </select>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-left text-sm font-medium text-gray-700 mb-1">
                Aspect Ratio
              </label>
              <select
                value={formData.aspectRatio}
                onChange={(e) => handleInputChange('aspectRatio', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="16:9">16:9 (default hero)</option>
                <option value="4:3">4:3</option>
                <option value="1:1">1:1</option>
              </select>
            </div>
          </div>
        </div>

        {/* Errors Display */}
        {errors.length > 0 && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-red-400 mr-2">⚠️</div>
              <div>
                <h4 className="text-sm font-medium text-red-800">Please fix the following:</h4>
                <ul className="mt-1 text-sm text-red-600">
                  {errors.map((error, index) => (
                    <li key={index} className="mt-1">• {error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Warnings Display */}
        {warnings.length > 0 && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-yellow-400 mr-2">💡</div>
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Suggestions:</h4>
                <ul className="mt-1 text-sm text-yellow-600">
                  {warnings.map((warning, index) => (
                    <li key={index} className="mt-1">• {warning}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Generate Button */}
        <div className="mt-8">
          <button
            onClick={generateImage}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            disabled={loading}
          >
            {loading ? "Generating Hero Visual..." : "Generate Hero Visual"}
          </button>
        </div>
      </div>

      {loading && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700">Generating your hero visual...</p>
        </div>
      )}

      {imageURL && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Your Hero Visual</h3>
          <img 
            src={imageURL} 
            alt="Generated Hero Visual" 
            className="max-w-full mx-auto rounded-lg shadow-md" 
          />
        </div>
      )}
    </div>
  );
};

export default PromptPage;
