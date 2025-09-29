import React, { useState, useEffect } from 'react';
import { FaTimes, FaTag, FaGift, FaPercent } from 'react-icons/fa';

interface Advertisement {
  id: number;
  title: string;
  description: string;
  image?: string;
  link?: string;
  bgColor?: string;
  textColor?: string;
  icon?: React.ReactNode;
}

interface AdvertisementBannerProps {
  advertisements: Advertisement[];
  position?: 'top' | 'bottom' | 'floating';
  autoPlay?: boolean;
  interval?: number;
  showCloseButton?: boolean;
}

const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  advertisements,
  position = 'top',
  autoPlay = true,
  interval = 5000,
  showCloseButton = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!autoPlay || advertisements.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % advertisements.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, advertisements.length]);

  if (!isVisible || advertisements.length === 0) return null;

  const currentAd = advertisements[currentIndex];

  const bannerStyles = {
    backgroundColor: currentAd.bgColor || '#ff6b6b',
    color: currentAd.textColor || '#ffffff',
  };

  const containerClasses = `
    advertisement-banner 
    advertisement-banner-${position}
    ${position === 'floating' ? 'advertisement-floating' : ''}
  `;

  return (
    <div className={containerClasses} style={bannerStyles}>
      {showCloseButton && (
        <button 
          className="advertisement-close"
          onClick={() => setIsVisible(false)}
          aria-label="إغلاق الإعلان"
        >
          <FaTimes />
        </button>
      )}
      
      <div className="advertisement-content">
        <div className="advertisement-icon">
          {currentAd.icon || <FaTag />}
        </div>
        
        <div className="advertisement-text">
          <h3>{currentAd.title}</h3>
          <p>{currentAd.description}</p>
        </div>
        
        {currentAd.image && (
          <div className="advertisement-image">
            <img src={currentAd.image} alt={currentAd.title} />
          </div>
        )}
        
        {currentAd.link && (
          <a 
            href={currentAd.link} 
            className="advertisement-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            اكتشف المزيد
          </a>
        )}
      </div>
      
      {advertisements.length > 1 && (
        <div className="advertisement-indicators">
          {advertisements.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`الإعلان ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertisementBanner;