// Prompt Builder - Assembles all layers
import { compositionLayer } from './compositionLayer.js';
import { negativePromptLayer } from './negativePromptLayer.js';
import { productContextLayer } from './productContextLayer.js';
import { systemStyleLayer } from './systemStyleLayer.js';
import { visualDirectionLayer } from './visualDirectionLayer.js';

// Assemble all layers
export const buildPrompt = (inputs) => {
  console.log("buildPrompt called with inputs:", inputs);
  
  // Ensure inputs is defined with defaults
  const safeInputs = inputs || {
    productName: '',
    productCategory: 'SaaS',
    industry: 'Fintech',
    tone: 'Clean & minimal',
    visualStyle: 'Minimalist photography',
    background: 'Light',
    aspectRatio: '16:9'
  };
  
  const layers = [
    systemStyleLayer(),
    productContextLayer(safeInputs),
    visualDirectionLayer(safeInputs),
    compositionLayer(),
    negativePromptLayer()
  ];
  
  // Filter out any undefined/null/empty layers
  const validLayers = layers.filter(layer => layer && typeof layer === 'string' && layer.trim().length > 0);
  
  console.log("Generated layers:", validLayers.map((layer, index) => ({
    index,
    length: layer?.length || 0,
    preview: layer?.substring(0, 50) + '...'
  })));
  
  const result = validLayers.join("\n\n");
  console.log("Final prompt length:", result.length);
  
  if (result.length === 0) {
    console.error("WARNING: Empty prompt generated!");
    console.error("Raw layers:", layers);
    return "Professional product photography with clean composition."; // Emergency fallback
  }
  
  return result;
};