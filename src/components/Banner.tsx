
import React, { useState, useEffect } from 'react';

interface BannerProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

const Banner: React.FC<BannerProps> = ({ 
  images, 
  autoPlay = true, 
  interval = 5000 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-xl mb-6">
      <div 
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div key={index} className="w-full flex-shrink-0">
            <img 
              src={image} 
              alt={`Banner ${index + 1}`} 
              className="w-full h-40 object-cover rounded-xl"
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
        {images.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Banner;
