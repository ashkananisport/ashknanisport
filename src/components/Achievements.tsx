import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Achievements = ({ content, language }) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // جملة واحدة ثابتة بناءً على اللغة
    const description = language === 'en' 
        ? "Ashkanani Sports Company honors the outstanding talents of young age groups for coaches and players"
        : "شركة أشكناني سبورت تقوم بتكريم أبرز مواهب المراحل السنية للمدربين واللاعبين";

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setIsEnlarged(true);
        // منع التمرير عند فتح التكبير
        document.body.style.overflow = 'hidden';
    };

    const handleCloseEnlarged = () => {
        setIsEnlarged(false);
        // استعادة التمرير عند الإغلاق
        document.body.style.overflow = 'auto';
    };

    const handlePrevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + content.list.length) % content.list.length);
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % content.list.length);
    };

    return (
        <>
            <section id="achievements" className="section achievements-section">
                <div className="container">
                    <h2 className="section-title">
                        {language === 'en' ? 'Awards & Achievements' : 'الجوائز والإنجازات'}
                    </h2>
                    <p className="section-subtitle">{description}</p>
                    <div className="achievements-grid">
                        {content.list.slice(0, 3).map((achievement, index) => (
                            <div key={index} className="achievement-card">
                                <div className="card-image-container">
                                    <img 
                                        src={achievement.imageUrl} 
                                        alt={`Achievement ${index + 1}`} 
                                        onClick={() => handleImageClick(index)}
                                        className="card-image"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* طبقة التكبير */}
            {isEnlarged && (
                <div className="deals-enlarged-overlay" onClick={handleCloseEnlarged}>
                    <div className="deals-enlarged-container" onClick={(e) => e.stopPropagation()}>
                        <button 
                            className="deals-enlarged-close"
                            onClick={handleCloseEnlarged}
                            aria-label="إغلاق"
                        >
                            <FaTimes />
                        </button>
                        
                        <img 
                            src={content.list[currentImageIndex].imageUrl} 
                            alt={`Achievement ${currentImageIndex + 1}`}
                            className="deals-enlarged-image"
                        />
                        
                        <div className="deals-enlarged-info">
                            <p>
                                {language === 'en' 
                                    ? 'Ashkanani Sports Company Honor' 
                                    : 'تكريم من شركة أشكناني سبورت'}
                            </p>
                        </div>
                        
                        {content.list.length > 1 && (
                            <div className="deals-enlarged-controls">
                                <button 
                                    className="deals-enlarged-nav deals-enlarged-prev"
                                    onClick={handlePrevImage}
                                    aria-label="السابق"
                                >
                                    
                                    <FaChevronRight />
                                </button>
                                
                                <div className="deals-enlarged-counter">
                                    {currentImageIndex + 1} / {content.list.length}
                                </div>
                                
                                <button 
                                    className="deals-enlarged-nav deals-enlarged-next"
                                    onClick={handleNextImage}
                                    aria-label="التالي"
                                >
                                    <FaChevronLeft />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Achievements;