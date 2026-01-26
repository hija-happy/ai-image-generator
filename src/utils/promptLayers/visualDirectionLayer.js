// Layer 3: Visual direction (controlled variation)
import { normalizeBackground } from '../uxGuards.js';

export const visualDirectionLayer = ({ visualStyle, tone, background, aspectRatio }) => {
  // Auto-adjust problematic style × background combinations
  const safeBackground = normalizeBackground(visualStyle, background);
  
  return `Photography style: ${visualStyle} with ${tone} aesthetic.
Lighting and mood: ${safeBackground} background with professional studio-quality lighting.
Aspect ratio: ${aspectRatio}
Color palette and atmosphere should match the ${tone} style.
Composition should feel ${tone} and use ${safeBackground} tones effectively.`;
};