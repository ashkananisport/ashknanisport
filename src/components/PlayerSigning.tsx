import React, { useState, useRef, useEffect } from 'react';
import { PlayerSigningContent } from '../types';

interface PlayerSigningProps {
  content: PlayerSigningContent;
}

const PlayerSigning: React.FC<PlayerSigningProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<string>('professional');
  const professionalAudioRef = useRef<HTMLAudioElement>(null);
  const amateurAudioRef = useRef<HTMLAudioElement>(null);
  const individualAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');

  // تحديد المرجع المناسب بناءً على التبويب النشط
  const getCurrentAudioRef = () => {
    switch (activeTab) {
      case 'professional':
        return professionalAudioRef;
      case 'amateur':
        return amateurAudioRef;
      case 'individual':
        return individualAudioRef;
      default:
        return professionalAudioRef;
    }
  };

  // تحديد مصدر الصوت بناءً على التبويب النشط
  const getCurrentAudioSource = () => {
    switch (activeTab) {
      case 'professional':
        return content.professional.videoUrl;
      case 'amateur':
        return  content.amateur.videoUrl;
      case 'individual':
        return content.individual.videoUrl;
      default:
        return  content.professional.videoUrl;
    }
  };

  // تحديد عنوان الصوت بناءً على التبويب النشط
  const getCurrentAudioTitle = () => {
    switch (activeTab) {
      case 'professional':
        return content.professional.audiotitle;
      case 'amateur':
        return content.amateur.audiotitle;
      case 'individual':
        return content.individual.audiotitle;
      default:
        return content.audiotitle || "صوت";
    }
  };

  // توقف الصوت عند تبديل التبويبات
  useEffect(() => {
    const currentRef = getCurrentAudioRef();
    if (currentRef.current) {
      currentRef.current.pause();
      setIsPlaying(false);
      setCurrentAudio('');
    }
  }, [activeTab]);

  const togglePlayPause = () => {
    const currentRef = getCurrentAudioRef();
    const audioSource = getCurrentAudioSource();
    
    if (currentRef.current) {
      if (isPlaying && currentAudio === activeTab) {
        currentRef.current.pause();
        setIsPlaying(false);
      } else {
        // إذا كان هناك صوت قيد التشغيل من تبويب آخر، أوقفه
        if (currentAudio !== activeTab && currentAudio !== '') {
          const prevAudioRef = getCurrentAudioRef();
          if (prevAudioRef.current) {
            prevAudioRef.current.pause();
          }
        }
        
        // تحديث مصدر الصوت إذا تغير
        if (currentRef.current.src !== audioSource) {
          currentRef.current.src = audioSource;
          currentRef.current.load();
        }
        
        currentRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setCurrentAudio(activeTab);
          })
          .catch(error => {
            console.error("Error playing audio:", error);
            setIsPlaying(false);
          });
      }
    }
  };

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
                    <div className="signing-audio">
                      <h4>{content.audioTitle}</h4>
                      <div className="audio-container">
                        <div className="audio-player">
                          <div className="audio-controls">
                            <button 
                              className={`play-pause-btn ${isPlaying && currentAudio === 'professional' ? 'playing' : ''}`}
                              onClick={togglePlayPause}
                              aria-label={isPlaying && currentAudio === 'professional' ? "إيقاف الصوت" : "تشغيل الصوت"}
                            >
                              {isPlaying && currentAudio === 'professional' ? (
                                <span className="pause-icon">❚❚</span>
                              ) : (
                                <span className="play-icon">▶</span>
                              )}
                            </button>
                            <div className="audio-info">
                              <div className="audio-title">{getCurrentAudioTitle()}</div>
                              <div className="audio-subtitle">{content.professional.title}</div>
                            </div>
                          </div>
                          <audio 
                            ref={professionalAudioRef}
                            src={ content.professional.videoUrl}
                            onPlay={() => {
                              setIsPlaying(true);
                              setCurrentAudio('professional');
                            }}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين المحترفين */}
                <div className="player-gallery">
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
                    <div className="signing-audio">
                      <h4>{content.audioTitle}</h4>
                      <div className="audio-container">
                        <div className="audio-player">
                          <div className="audio-controls">
                            <button 
                              className={`play-pause-btn ${isPlaying && currentAudio === 'amateur' ? 'playing' : ''}`}
                              onClick={togglePlayPause}
                              aria-label={isPlaying && currentAudio === 'amateur' ? "إيقاف الصوت" : "تشغيل الصوت"}
                            >
                              {isPlaying && currentAudio === 'amateur' ? (
                                <span className="pause-icon">❚❚</span>
                              ) : (
                                <span className="play-icon">▶</span>
                              )}
                            </button>
                            <div className="audio-info">
                              <div className="audio-title">{getCurrentAudioTitle()}</div>
                              <div className="audio-subtitle">{content.amateur.title}</div>
                            </div>
                          </div>
                          <audio 
                            ref={amateurAudioRef}
                            src={content.amateur.videoUrl}
                            onPlay={() => {
                              setIsPlaying(true);
                              setCurrentAudio('amateur');
                            }}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين الهواة */}
                <div className="player-gallery">
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
                    <div className="signing-audio">
                      <h4>{content.audioTitle}</h4>
                      <div className="audio-container">
                        <div className="audio-player">
                          <div className="audio-controls">
                            <button 
                              className={`play-pause-btn ${isPlaying && currentAudio === 'individual' ? 'playing' : ''}`}
                              onClick={togglePlayPause}
                              aria-label={isPlaying && currentAudio === 'individual' ? "إيقاف الصوت" : "تشغيل الصوت"}
                            >
                              {isPlaying && currentAudio === 'individual' ? (
                                <span className="pause-icon">❚❚</span>
                              ) : (
                                <span className="play-icon">▶</span>
                              )}
                            </button>
                            <div className="audio-info">
                              <div className="audio-title">{getCurrentAudioTitle()}</div>
                              <div className="audio-subtitle">{content.individual.title}</div>
                            </div>
                          </div>
                          <audio 
                            ref={individualAudioRef}
                            src={ content.individual.videoUrl}
                            onPlay={() => {
                              setIsPlaying(true);
                              setCurrentAudio('individual');
                            }}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* معرض الصور للاعبين الفرديين */}
                <div className="player-gallery">
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
      </div>
    </section>
  );
};

export default PlayerSigning;