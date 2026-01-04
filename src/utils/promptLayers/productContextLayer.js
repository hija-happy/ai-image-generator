// Layer 2: Product context (data → text)
export const productContextLayer = ({ productCategory, industry, productName }) => {
  return `Product type: ${productCategory},
Industry: ${industry},
Product name: ${productName}.`;
};