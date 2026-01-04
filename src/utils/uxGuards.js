// UX Guards - Preventing invalid intent from reaching the model

// Guard #1: Hardware product detection
const blockedKeywords = [
  "iphone",
  "samsung",
  "macbook",
  "ipad",
  "pixel",
  "oneplus",
  "android",
  "windows",
  "xbox",
  "playstation"
];

export function isHardwareProduct(name) {
  return blockedKeywords.some(word =>
    name.toLowerCase().includes(word)
  );
}

// Guard #2: Industry × Tone compatibility
const toneCompatibility = {
  Fintech: ["Clean & minimal", "Professional & serious", "Modern & futuristic"],
  Health: ["Clean & minimal", "Professional & serious"],
  Education: ["Friendly & playful", "Clean & minimal"],
  "E-commerce": ["Friendly & playful", "Modern & futuristic", "Clean & minimal"],
  "Developer / Tech": ["Clean & minimal", "Modern & futuristic"],
  Marketing: ["Friendly & playful", "Modern & futuristic"]
};

export function isToneRecommended(industry, tone) {
  return toneCompatibility[industry]?.includes(tone);
}

export function getSuggestedTones(industry) {
  return toneCompatibility[industry] || ["Clean & minimal"];
}

// Guard #3: Style × Background auto-adjustment
export function normalizeBackground(style, background) {
  if (style === "3D illustration" && background === "Dark") {
    return "Dark with soft gradient lighting";
  }
  if (style === "Abstract shapes" && background === "Dark") {
    return "Dark with subtle highlights";
  }
  return background;
}

// Guard #4: Product name sanitization for prompt
export function sanitizeProductName(productCategory, productName) {
  if (productCategory === "SaaS" || productCategory === "AI Product") {
    return productName.replace(/iphone|macbook|ipad|samsung|pixel/gi, "").trim();
  }
  return productName;
}

// Validation function for form submission
export function validateInputs(inputs) {
  const errors = [];
  const warnings = [];

  // Check SaaS vs hardware conflict
  if ((inputs.productCategory === "SaaS" || inputs.productCategory === "AI Product") && 
      isHardwareProduct(inputs.productName)) {
    errors.push("SaaS and AI products should use fictional or software-style names.");
  }

  // Check tone compatibility
  if (!isToneRecommended(inputs.industry, inputs.tone)) {
    const suggested = getSuggestedTones(inputs.industry).join(", ");
    warnings.push(
      `"${inputs.tone}" is uncommon for ${inputs.industry}. Consider: ${suggested}`
    );
  }

  return { errors, warnings };
}