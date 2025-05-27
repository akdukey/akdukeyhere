'use client'

import { useState,useMemo, useRef ,useEffect} from "react";
import AnimationWrapper from "../animation-wrapper";
import { motion } from 'framer-motion';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa"
import Image from "next/image";
import home from "../../../assets/home.jpg"

const variants = () => ({
  offscreen: { y: 150, opacity: 0 },
  onscreen: ({ duration = 2 } = {}) => ({
    y: 0,
    opacity: 1,
    transition: { type: "spring", duration }
  })
});

const socialIcons = [
  { 
    id: "facebook", 
    icon: <FaFacebookF color="blue" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://facebook.com",
    label: "Facebook"
  },
  { 
    id: "twitter", 
    icon: <FaTwitter color="black" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://twitter.com",
    label: "Twitter"
  },
  { 
    id: "linkedin", 
    icon: <FaLinkedinIn className=" text-blue-700 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://linkedin.com",
    label: "LinkedIn"
  },
  { 
    id: "instagram", 
    icon: <FaInstagram className="text-pink-600 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />,
    href: "https://instagram.com",
    label: "Instagram"
  }
];
 const images = [

    'https://images.unsplash.com/photo-1748323002178-55a6174c4a99',
     'https://images.unsplash.com/photo-1748279423471-0b923df37c59',
    

  ];
export default function ClientHomeView({ data }) {
  const setVariants = useMemo(() => variants(), []);
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFlipping(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
        setIsFlipping(false);
      }, 300); // Half of the flip animation duration
    }, 2000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    if (index !== currentIndex) {
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentIndex(index);
        setIsFlipping(false);
      }, 300);
    }
  };

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12" id="home">
         <div className="h-[6vh] w-full bg-transparent flex items-center justify-center">
      
    </div>
      <AnimationWrapper>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center" variants={setVariants}>
          {/* Content */}
          <div className="flex flex-col justify-center order-2 sm:order-1">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {data && data.length 
                ? data[0]?.heading.split(" ").map((item, index) => (
                    <span key={index} className={`${index === 1 || index === 3 ? "text-green-main" : "text-gray-200"}`}>
                      {item}{" "}
                    </span>
                  )) 
                : null
              }
            </h1>
            <p className="text-[#ffffff] text-base md:text-lg mb-8">
              {data && data.length ? data[0]?.summary : null}
            </p>
            
            {/* Social Icons */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
            <p className="text-gray-500 text-sm sm:text-base font-medium">Follow me on social media to stay connected!</p>
              {socialIcons.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{ type: "spring", damping: 10, stiffness: 100, duration: 1.5 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 cursor-pointer px-3 py-2 sm:px-4 sm:py-3 bg-white rounded-lg border-2 border-blue-400 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="text-blue-400 underline font-medium text-sm sm:text-base hidden sm:inline">
                      {item.label}
                    </span>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
          
          {/* Image */}
           <motion.div 
      ref={containerRef} 
      className="flex justify-center mb-6 sm:mb-0" 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        drag 
        dragConstraints={containerRef} 
        className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full shadow-xl overflow-hidden transition-all duration-300 hover:scale-105"
        style={{ 
          background: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
          border: "10px solid #22c55e",
          perspective: '1000px'
        }}
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
        }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-500/50 z-10 transition-opacity duration-300 hover:opacity-0"></div>
        
        {/* Flip container */}
        <div 
          className={`absolute inset-0 z-20 transition-transform duration-600 ${
            isFlipping ? 'rotate-y-180' : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipping ? 'rotateY(180deg)' : 'rotateY(0deg)'
          }}
        >
          {/* Front face */}
          <motion.div 
            className="absolute inset-0 w-full h-full"
            style={{ backfaceVisibility: 'hidden' }}
            initial={{ scale: 1.2, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }} 
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover absolute "
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </motion.div>
          
          {/* Back face */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <img
              src={images[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-cover absolute "
              style={{ 
                width: '100%', 
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

        {/* Navigation arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110 z-30"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots indicator */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1 z-30">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-white scale-125 shadow-md' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>

        {/* Image counter */}
        <div className="absolute top-3 right-3 bg-black bg-opacity-40 text-white px-2 py-1 rounded-full text-xs z-30">
          {currentIndex + 1}/{images.length}
        </div>
      </motion.div>
    </motion.div>
        </motion.div>
      </AnimationWrapper>
    </section>
  );
}