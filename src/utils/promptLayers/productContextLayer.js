// Layer 2: Product context (data → text)
import { sanitizeProductName } from '../uxGuards.js';

const getIndustryVisualContext = (industry, productCategory) => {
  const contexts = {
    'Fintech': 'sleek modern architecture, glass buildings, urban skylines, clean geometric patterns, blue and silver tones, professional business environments',
    'Health': 'clean medical environments, soft natural lighting, white and blue tones, sterile yet warm atmospheres, organic shapes and forms',
    'Education': 'bright learning environments, books and knowledge symbols, warm natural lighting, inspiring academic settings, growth and development themes',
    'E-commerce': 'modern retail spaces, shopping environments, product displays, commercial photography style, vibrant and engaging colors',
    'Developer / Tech': 'modern tech workspaces, coding environments, circuit patterns, digital aesthetics, blue and green tech colors, innovative technology themes',
    'Marketing': 'creative agency environments, colorful and dynamic compositions, modern advertising aesthetics, bold and engaging visuals'
  };
  
  return contexts[industry] || 'modern professional environments, clean and sophisticated aesthetics';
};

export const productContextLayer = ({ productCategory, industry, productName }) => {
  // Fail-safe: sanitize product name at prompt level
  const safeName = sanitizeProductName(productCategory, productName);
  const visualContext = getIndustryVisualContext(industry, productCategory);
  
  return `Create professional photography for a ${productCategory} in the ${industry} industry called "${safeName}".
Visual context should include: ${visualContext}.
The photography should capture the essence of ${industry} through appropriate settings, colors, and atmosphere.
Avoid generic product photography - make it specific to ${industry} and ${productCategory} aesthetics.
The image should feel relevant to ${industry} professionals and ${productCategory} users.`;
};