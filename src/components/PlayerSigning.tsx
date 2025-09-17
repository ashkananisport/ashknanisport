// src/components/PlayerSigning.tsx

import React, { useState } from 'react';
import { PlayerSigningContent } from '../types';

interface PlayerSigningProps {
  content: PlayerSigningContent;
}

const PlayerSigning: React.FC<PlayerSigningProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<string>('professional');

  return (
    <section className="section player-signing" id="player-signing">
      <div className="container">
        <h2 className="section-title">
          {content.title} <span>{content.highlight}</span>
        </h2>
        
        <div className="signing-tabs">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'professional' ? 'active' : ''}`}
              onClick={() => setActiveTab('professional')}
            >
              {content.professional.title}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'amateur' ? 'active' : ''}`}
              onClick={() => setActiveTab('amateur')}
            >
              {content.amateur.title}
            </button>
            <button 
              className={`tab-btn ${activeTab === 'individual' ? 'active' : ''}`}
              onClick={() => setActiveTab('individual')}
            >
              {content.individual.title}
            </button>
          </div>
          
          <div className="tab-content">
            {activeTab === 'professional' && (
              <div className="tab-pane">
                <div className="signing-content">
                  <div className="signing-text">
                    <h3>{content.professional.title}</h3>
                    <p>{content.professional.description}</p>
                    <ul>
                      {content.professional.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="signing-media">
                    <div className="signing-video">
                      <h4>{content.videoTitle}</h4>
                      <div className="video-container">
                        <iframe 
                          src={content.professional.videoUrl} 
                          title={content.professional.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين المحترفين */}
                <div className="player-gallery">
                  <h3 className="gallery-title">{content.professional.gallery.title}</h3>
                  <div className="gallery-grid">
                    {content.professional.gallery.images.map((image, index) => (
                      <div key={index} className="gallery-item">
                        <img src={image} alt={`${content.professional.title} ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'amateur' && (
              <div className="tab-pane">
                <div className="signing-content">
                  <div className="signing-text">
                    <h3>{content.amateur.title}</h3>
                    <p>{content.amateur.description}</p>
                    <ul>
                      {content.amateur.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="signing-media">
                    <div className="signing-video">
                      <h4>{content.videoTitle}</h4>
                      <div className="video-container">
                        <iframe 
                          src={content.amateur.videoUrl} 
                          title={content.amateur.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين الهواة */}
                <div className="player-gallery">
                  <h3 className="gallery-title">{content.amateur.gallery.title}</h3>
                  <div className="gallery-grid">
                    {content.amateur.gallery.images.map((image, index) => (
                      <div key={index} className="gallery-item">
                        <img src={image} alt={`${content.amateur.title} ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'individual' && (
              <div className="tab-pane">
                <div className="signing-content">
                  <div className="signing-text">
                    <h3>{content.individual.title}</h3>
                    <p>{content.individual.description}</p>
                    <ul>
                      {content.individual.steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="signing-media">
                    <div className="signing-video">
                      <h4>{content.videoTitle}</h4>
                      <div className="video-container">
                        <iframe 
                          src={content.individual.videoUrl} 
                          title={content.individual.title}
                          frameBorder="0" 
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                          allowFullScreen>
                        </iframe>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين الفرديين */}
                <div className="player-gallery">
                  <h3 className="gallery-title">{content.individual.gallery.title}</h3>
                  <div className="gallery-grid">
                    {content.individual.gallery.images.map((image, index) => (
                      <div key={index} className="gallery-item">
                        <img src={image} alt={`${content.individual.title} ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* قسم الدعوة للتواصل */}
        <div className="cta-section">
          <div className="cta-content">
            <h3>{content.cta.title}</h3>
            <p>{content.cta.description}</p>
            <div className="cta-buttons">
              <a 
                href={`https://wa.me/${content.cta.whatsappNumber}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-whatsapp"
              >
                <span className="whatsapp-icon">💬</span> {content.cta.whatsappText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlayerSigning;