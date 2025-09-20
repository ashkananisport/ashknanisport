import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';

interface AdvertisementImageProps {
  advertisements: any[]; // تغيير لاستقبال بيانات الإعلانات
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'middle-left';
  size?: 'small' | 'medium' | 'large';
  autoPlay?: boolean;
  interval?: number;
  showCloseButton?: boolean;
  enableZoom?: boolean;
}

const AdvertisementImage: React.FC<AdvertisementImageProps> = ({
  advertisements,
  position = 'bottom-right',
  size = 'medium',
  autoPlay = true,
  interval = 3000,
  showCloseButton = true,
  enableZoom = true
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isEnlarged, setIsEnlarged] = useState(false);
  
  // فلترة الإعلانات حسب الموضع والحجم
  const filteredAds = advertisements.filter(ad => 
    ad.position === position && ad.size === size
  );

  useEffect(() => {
    if (!autoPlay || filteredAds.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredAds.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, filteredAds.length]);

  useEffect(() => {
    // منع التمرير عند فتح التكبير
    if (isEnlarged) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isEnlarged]);

  if (!isVisible || filteredAds.length === 0) return null;

  const currentAd = filteredAds[currentIndex];

  const containerClasses = `
    advertisement-image-container
    advertisement-image-${position}
    advertisement-image-${size}
  `;

  const handleImageClick = () => {
    console.log("Image clicked, enableZoom:", enableZoom);
    if (enableZoom) {
      console.log("Setting isEnlarged to true");
      setIsEnlarged(true);
    } else if (currentAd.linkUrl) {
      window.open(currentAd.linkUrl, '_blank');
    }
  };

  const handleCloseEnlarged = () => {
    console.log("Closing enlarged view");
    setIsEnlarged(false);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + filteredAds.length) % filteredAds.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % filteredAds.length);
  };

  const handleIndicatorClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  // إنشاء طبقة التكبير
  const renderEnlargedView = () => {
    if (!isEnlarged) return null;
    
    return (
      <div 
        className="advertisement-image-enlarged-overlay" 
        onClick={handleCloseEnlarged}
      >
        <div 
          className="advertisement-image-enlarged-container" 
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            className="advertisement-image-enlarged-close"
            onClick={handleCloseEnlarged}
            aria-label="إغلاق التكبير"
          >
            <FaTimes />
          </button>
          
          <img 
            src={currentAd.imageUrl} 
            alt={currentAd.altText}
            className="advertisement-image-enlarged"
          />
          
          {filteredAds.length > 1 && (
            <div className="advertisement-image-enlarged-controls">
              <button 
                className="advertisement-image-enlarged-nav advertisement-image-enlarged-prev"
                onClick={handlePrevImage}
                aria-label="الصورة السابقة"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                </svg>
              </button>
              
              <div className="advertisement-image-enlarged-indicators">
                {filteredAds.map((_, index) => (
                  <button
                    key={index}
                    className={`advertisement-indicator ${index === currentIndex ? 'active' : ''}`}
                    onClick={(e) => handleIndicatorClick(index, e)}
                    aria-label={`الصورة ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="advertisement-image-enlarged-nav advertisement-image-enlarged-next"
                onClick={handleNextImage}
                aria-label="الصورة التالية"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
            </div>
          )}
          
          {currentAd.linkUrl && (
            <a 
              href={currentAd.linkUrl} 
              className="advertisement-image-enlarged-link"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              زيارة الرابط
            </a>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className={containerClasses}>
        {showCloseButton && (
          <button 
            className="advertisement-image-close"
            onClick={() => setIsVisible(false)}
            aria-label="إغلاق الإعلان"
          >
            <FaTimes />
          </button>
        )}
        
        {filteredAds.length > 1 && (
          <div className="advertisement-image-indicators">
            {filteredAds.map((_, index) => (
              <button
                key={index}
                className={`advertisement-indicator ${index === currentIndex ? 'active' : ''}`}
                onClick={(e) => handleIndicatorClick(index, e)}
                aria-label={`الصورة ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        <img 
          src={currentAd.imageUrl} 
          alt={currentAd.altText}
          className="advertisement-image"
          onClick={handleImageClick}
          style={{ cursor: enableZoom ? 'pointer' : (currentAd.linkUrl ? 'pointer' : 'default') }}
        />
      </div>
      
      {/* استخدام Portal لعرض طبقة التكبير */}
      {typeof document !== 'undefined' && 
        document.body && 
        createPortal(renderEnlargedView(), document.body)}
    </>
  );
};

export default AdvertisementImage;