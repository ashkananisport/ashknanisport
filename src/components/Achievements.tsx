import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Achievements = ({ content, language }) => {
    const [isEnlarged, setIsEnlarged] =useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // جملة واحدة ثابتة بناءً على اللغة
    const description = language === 'en' 
        ? "Ashkanani Sports Company honors the outstanding talents of young age groups for coaches and players"
        : "شركة أشكناني سبورت تقوم بتكريم أبرز مواهب المراحل السنية للمدربين واللاعبين";

    const handleButtonClick = () => {
        setCurrentImageIndex(0);
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
                        {language === 'en' ? 'Awards & Achievements' : 'الجوائز والتكريمات'}
                    </h2>
                    <p className="section-subtitle">{description}</p>
                    
                    {/* زر بدلاً من الصور */}
                    <div className="achievements-button-container">
                        <button 
                            className="achievements-view-button"
                            onClick={handleButtonClick}
                        >
                            {language === 'en' ? 'View Honors' : 'شاهد التكريمات'}
                        </button>
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
                            aria-label={language === 'en' ? "Close" : "إغلاق"}
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
                                aria-label={language === 'en' ? "Previous" : "السابق"}
                                >
                                {language === 'en' ? <FaChevronLeft /> : <FaChevronRight />}
                                </button>
                                
                                <div className="deals-enlarged-counter">
                                {currentImageIndex + 1} / {content.list.length}
                                </div>
                                
                                <button 
                                className="deals-enlarged-nav deals-enlarged-next"
                                onClick={handleNextImage}
                                aria-label={language === 'en' ? "Next" : "التالي"}
                                >
                                {language === 'en' ? <FaChevronRight /> : <FaChevronLeft />}
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