import React, { useEffect } from 'react'
import './index.css'
import gsap from "gsap";
import { useRef } from 'react';
const LandingPage = () => {

  const bubbleRef = useRef([]);

  useEffect(()=>{
    bubbleRef.current.forEach((bubble)=>{
      animateBubble(bubble);
    });
  },[]);

  const animateBubble = (bub)=>{
    gsap.to(bub, {
      x: random(-100, 300),
      y: random(-300, 300),
      scale: random(0.8, 1.5),
      duration: random(2, 5),
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });
  };

  const random = (min, max) => Math.random() * (max - min) + min;


  return (
    <div className='relative overflow-hidden h-screen bg-black text-white flex flex-col items-center justify-center'    
    >
       {[...Array(10)].map((_, i) => (
        <div
          key={i}
          ref={(bub) => (bubbleRef.current[i] = bub)}
          className="bubble"
          style={{
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
         
          }}
        ></div>
      ))}
        <div className='text-center mb-5 px-45 py-1'
        >
            <h1 className='text-6xl font-bold text-center px-35 mb-3'>Create <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
  Stunning Images </span> with AI Magic</h1>
            <p >Transform your imagination into breathtaking visuals. Generate professional-quality images from simple text descriptions in seconds.</p>
        </div>
        <div>
            <button className='btn'>Start Creating Now</button>
        </div>
    </div>
  )
}

export default LandingPage