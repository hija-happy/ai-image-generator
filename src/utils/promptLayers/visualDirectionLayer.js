// Layer 3: Visual direction (controlled variation)
import { normalizeBackground } from '../uxGuards.js';

export const visualDirectionLayer = ({ visualStyle, tone, background, aspectRatio }) => {
  // Auto-adjust problematic style × background combinations
  const safeBackground = normalizeBackground(visualStyle, background);
  
  return `Visual style: ${visualStyle}
Tone: ${tone}
Background: ${safeBackground}
Aspect ratio: ${aspectRatio}`;
};