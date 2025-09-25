import React, { useState, useRef, useEffect } from 'react';
import { PlayerSigningContent } from '../types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PlayerSigningProps {
  content: PlayerSigningContent;
}

const PlayerSigning: React.FC<PlayerSigningProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState<string>('professional');
  const professionalAudioRef = useRef<HTMLAudioElement>(null);
  const individualAudioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<string>('');
  
  // حالة جديدة لتكبير الصور
  const [enlargedImage, setEnlargedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    index: number;
    total: number;
  } | null>(null);
  
useEffect(() => {
  const handler = (e: any) => {
    if (e.detail.sectionId === 'player-signing') {
      setActiveTab(e.detail.tab);
    }
  };
  window.addEventListener('switchTab', handler);
  return () => window.removeEventListener('switchTab', handler);
}, []);

  // تحديد المرجع المناسب بناءً على التبويب النشط
  const getCurrentAudioRef = () => {
    switch (activeTab) {
      case 'professional':
        return professionalAudioRef;
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
      case 'individual':
        return content.individual.videoUrl;
      default:
        return content.professional.videoUrl;
    }
  };

  // تحديد عنوان الصوت بناءً على التبويب النشط
  const getCurrentAudioTitle = () => {
    switch (activeTab) {
      case 'professional':
        return content.professional.audiotitle;
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

  // دالة لفتح الصورة المكبرة
  const openEnlargedImage = (src: string, alt: string, title: string, index: number, total: number) => {
    setEnlargedImage({ src, alt, title, index, total });
  };

  // دالة لإغلاق الصورة المكبرة
  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  // دالة للتنقل بين الصور
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!enlargedImage) return;
    
    const gallery = activeTab === 'professional' 
      ? content.professional.gallery.images 
      : content.individual.gallery.images;
    
    let newIndex = direction === 'next' 
      ? enlargedImage.index + 1 
      : enlargedImage.index - 1;
    
    // التأكد من أن الفهرس ضمن النطاق الصحيح
    if (newIndex < 0) newIndex = gallery.length - 1;
    if (newIndex >= gallery.length) newIndex = 0;
    
    setEnlargedImage({
      src: gallery[newIndex],
      alt: `${activeTab === 'professional' ? content.professional.title : content.individual.title} ${newIndex + 1}`,
      title: activeTab === 'professional' ? content.professional.title : content.individual.title,
      index: newIndex,
      total: gallery.length
    });
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
                            src={content.professional.videoUrl}
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
                      <div 
                        key={index} 
                        className="gallery-item card-image-container"
                        onClick={() => openEnlargedImage(
                          image, 
                          `${content.professional.title} ${index + 1}`, 
                          content.professional.title,
                          index,
                          content.professional.gallery.images.length
                        )}
                      >
                        <img 
                          src={image} 
                          alt={`${content.professional.title} ${index + 1}`} 
                          className="card-image"
                        />
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
                            src={content.individual.videoUrl}
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
                      <div 
                        key={index} 
                        className="gallery-item card-image-container"
                        onClick={() => openEnlargedImage(
                          image, 
                          `${content.individual.title} ${index + 1}`, 
                          content.individual.title,
                          index,
                          content.individual.gallery.images.length
                        )}
                      >
                        <img 
                          src={image} 
                          alt={`${content.individual.title} ${index + 1}`} 
                          className="card-image"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* تراكب الصورة المكبرة */}
      {enlargedImage && (
        <div 
          className="deals-enlarged-overlay" 
          onClick={closeEnlargedImage}
        >
          <div 
            className="deals-enlarged-container" 
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="deals-enlarged-close" 
              onClick={closeEnlargedImage}
              aria-label="إغلاق"
            >
              ✕
            </button>
            
            <img 
              src={enlargedImage.src} 
              alt={enlargedImage.alt} 
              className="deals-enlarged-image"
            />
            
            <div className="deals-enlarged-info">
              <h3>{enlargedImage.title}</h3>
              <p>{enlargedImage.alt}</p>
            </div>
            
            <div className="deals-enlarged-controls">
              <button 
                className="deals-enlarged-nav" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('prev');
                }}
                aria-label="الصورة السابقة"
              >
                {content.language === 'en' ? <FaChevronLeft /> : <FaChevronRight />}
              </button>
              
              <div className="deals-enlarged-counter">
                {enlargedImage.index + 1} / {enlargedImage.total}
              </div>
              
              <button 
                className="deals-enlarged-nav" 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('next');
                }}
                aria-label="الصورة التالية"
              >
                {content.language === 'en' ? <FaChevronRight /> : <FaChevronLeft />}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default PlayerSigning;