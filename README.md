# 🎨 AI Image Generator


AI Hero Visual Generator is a modern, professional web application that creates conversion-optimized hero images for landing pages. Built with React and featuring a beautiful dark theme with purple-pink gradients, it combines intelligent prompt engineering with user-friendly design.


## 🎭 Key Features

###  **Smart Visual Generation**
- **Layered Prompt System** - Professional 5-layer prompt architecture
- **Quality Guardrails** - Built-in UX guards prevent poor combinations
- **Industry-Specific** - Tailored for different business types and industries
- **Style Variety** - Multiple visual styles: Flat, 3D, Abstract, Isometric

###  **Intelligent UX Guards**
- **Hardware Detection** - Prevents inappropriate product names for SaaS
- **Tone Compatibility** - Industry-specific tone recommendations
- **Auto-Correction** - Silent background optimization for better results
- **Real-time Validation** - Immediate feedback with suggestions

### **Beautiful Dark UI**
- **Modern Dark Theme** - Sleek black background with purple-pink accents
- **Animated Backgrounds** - GSAP-powered floating gradient bubbles
- **Glass Morphism** - Semi-transparent cards with backdrop blur
- **Responsive Design** - Perfect on desktop, tablet, and mobile

### **Professional Features**
- **Form Validation** - Comprehensive error handling and warnings
- **Loading States** - Engaging animation during generation
- **Success Celebration** - Beautiful result display with download options
- **Accessibility** - WCAG-compliant design patterns

## 🚀 Tech Stack

### **Frontend**
- **React 19.1.0** - Modern React with latest features
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **GSAP 3.13.0** - Professional animations
- **React Router DOM 7.6.2** - Client-side routing

### **Backend**
- **Express 5.1.0** - Node.js server framework
- **CORS 2.8.5** - Cross-origin resource sharing
- **Node Fetch 3.3.2** - HTTP requests

### **Additional Services**
- **Firebase 11.9.1** - Authentication and database
- **AI Image Generation API** - Custom image generation service


## 🛠️ Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Firebase account (for authentication)
- AI image generation API access

### **1. Clone the Repository**
```bash
git clone https://github.com/hija-happy/ai-image-generator.git
cd ai-image-generator
```

### **2. Install Frontend Dependencies**
```bash
npm install
```

### **3. Install Backend Dependencies**
```bash
cd ai-image-proxy
npm install
cd ..
```

### **4. Start Development Servers**

**Frontend (Terminal 1):**
```bash
npm run dev
```

**Backend (Terminal 2):**
```bash
cd ai-image-proxy
npm start
```

Visit `http://localhost:5173` to see the application.

## 🎨 Usage Guide

### **1. Landing Page**
- Beautiful animated landing page with floating bubbles
- Click "Start Creating Now" to begin

### **2. Authentication** (planned)
- Register new account or login
- Complete profile setup

### **3. Generate Hero Visuals**
- **Product Basics**: Name, category, industry
- **Visual Preferences**: Tone, style, background, aspect ratio
- Real-time validation and suggestions
- Click "Generate Hero Visual"

### **4. Download Results**
- View generated image
- Download PNG format
- Generate variations

## 🛡️ UX Guards System

### **Quality Guardrails**
- **Hardware Detection**: Prevents "iPhone" in SaaS products
- **Tone Matching**: Industry-appropriate tone suggestions  
- **Style Optimization**: Auto-adjusts problematic combinations
- **Prompt Sanitization**: Cleans input at generation level

### **User Experience**
- **Warnings** (Yellow): Suggestions, non-blocking
- **Errors** (Red): Must fix before generation
- **Smart Defaults**: Optimal settings for each industry

## 🎭 Theme & Design

### **Color Palette**
```css
--color-black: #0a0a0b           /* Primary background */
--color-purple: #8b5cf6          /* Primary accent */
--color-pink: #ec4899            /* Secondary accent */  
--gradient-primary: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)
```

### **Design System**
- **Typography**: Inter font family
- **Shadows**: Purple-tinted shadows
- **Borders**: Semi-transparent purple
- **Animations**: GSAP-powered smooth transitions

## 📋 Prompt Architecture

### **5-Layer System**
1. **System Style** - Quality standards (constant)
2. **Product Context** - User input data (dynamic)  
3. **Visual Direction** - Style preferences (controlled)
4. **Composition** - Layout guidelines (constant)
5. **Negative Prompts** - Quality control (constant)

## 🌍 Live Demo


🔗 **[View Live Application](https://landing-visual-ai.netlify.app/)**

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### **Development Guidelines**
- Follow React best practices
- Maintain the layered prompt architecture
- Test UX guards thoroughly
- Ensure responsive design
- Document new features

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Tailwind CSS** - For the utility-first CSS
- **GSAP** - For smooth animations
- **Vite** - For lightning-fast development
- **Firebase** - For backend services

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/hija-happy/ai-image-generator/issues)
- **Email**: hijahappy2004@gmail.com

---

<div align="center">
  <p><strong>Built with ❤️ by Hija Happy</strong></p>
  <p>⭐ Star this repository if you find it helpful!</p>
</div>

