// Layer 2: Product context (data → text)
import { sanitizeProductName } from '../uxGuards.js';

export const productContextLayer = ({ productCategory, industry, productName }) => {
  // Fail-safe: sanitize product name at prompt level
  const safeName = sanitizeProductName(productCategory, productName);
  
  return `Product type: ${productCategory}
Industry: ${industry}
Product name: ${safeName}`;
};