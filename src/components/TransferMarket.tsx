import React, { useState } from 'react';
import { TransferMarketContent } from '../types';

interface TransferMarketProps {
  content: TransferMarketContent;
}

const TransferMarket: React.FC<TransferMarketProps> = ({ content }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    console.log('TransferMarket logo loaded successfully');
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setImageError(true);
    console.error('Failed to load TransferMarket logo:', e);
    e.currentTarget.src = "https://tmssl.akamaized.net/images/logo/transfermarkt_logo.svg";
  };

  return (
    <section className="section transfer-market" id="transfer-market">
      <div className="container">
        <h2 className="section-title">
          {content.title} <span>{content.highlight}</span>
        </h2>
        
        <p className="section-description">
          {content.description}
        </p>
        
        <div className="transfermarket-content">
          <div className="logo-container">
            {!imageError ? (
              <>
                <img 
                  src={content.logoUrl} 
                  alt="TransferMarket Logo" 
                  className={`transfermarket-logo ${imageLoaded ? 'loaded' : ''}`}
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ 
                    display: imageLoaded ? 'block' : 'none',
                    backgroundColor: 'transparent'
                  }}
                  loading="lazy"
                />
                {!imageLoaded && (
                  <div className="image-placeholder">
                    <div className="spinner"></div>
                  </div>
                )}
              </>
            ) : (
              // الصورة البديلة في حالة الخطأ
              <div className="text-logo">
                <span className="transfer-text">Transfer</span>
                <span className="market-text">Market</span>
              </div>
            )}
          </div>
          
          <div className="cta-container">
            <a 
              href={content.profileUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-transfermarket"
            >
              {content.buttonText}
              <i className="fas fa-external-link-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransferMarket;