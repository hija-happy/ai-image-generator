// Prompt Builder - Assembles all layers
import { compositionLayer } from './compositionLayer.js';
import { negativePromptLayer } from './negativePromptLayer.js';
import { productContextLayer } from './productContextLayer.js';
import { systemStyleLayer } from './systemStyleLayer.js';
import { visualDirectionLayer } from './visualDirectionLayer.js';

// Assemble all layers
export const buildPrompt = (inputs) => {
  return [
    systemStyleLayer(),
    productContextLayer(inputs),
    visualDirectionLayer(inputs),
    compositionLayer(),
    negativePromptLayer()
  ].join("\n\n");
};