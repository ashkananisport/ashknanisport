import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Deals = ({ content, language }) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // استخدام عناوين ثابتة بناءً على اللغة
    const titlePart1 = language === 'en' ? 'Best Contracts &' : 'ابرز العقود';
    const titlePart2 = language === 'en' ? 'Deals' : 'والصفقات';
    
    // النص الجديد الذي سيظهر تحت العنوان
    const subtitleText = language === 'en' 
        ? 'We have approximately 177 deals since the company\'s establishment in all countries'
        : 'نمتلك ما يقارب 177 صفقة منذ انشاء الشركة بجميع الدول';

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
            <section id="deals" className="section">
                <div className="container">
                    <h2 className="section-title">{titlePart1} <span>{titlePart2}</span></h2>
                    {/* إضافة السطر الجديد تحت العنوان */}
                    <p className="section-subtitle">{subtitleText}</p>
                    
                    {/* زر بدلاً من الصور */}
                    <div className="deals-button-container">
                        <button 
                            className="deals-view-button"
                            onClick={handleButtonClick}
                        >
                            {language === 'en' ? 'View Best Deals' : 'شاهد ابرز الصفقات'}
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
                            src={content.list[currentImageIndex].img} 
                            alt={content.list[currentImageIndex].title}
                            className="deals-enlarged-image"
                        />
                        
                        <div className="deals-enlarged-info">
                            <h3>{content.list[currentImageIndex].title}</h3>
                            <p>{content.list[currentImageIndex].description}</p>
                        </div>
                        
                        {content.list.length > 1 && (
                            <div className="deals-enlarged-controls">
                                <button 
                                    className="deals-enlarged-nav deals-enlarged-next"
                                    onClick={handleNextImage}
                                    aria-label={language === 'en' ? "Next" : "التالي"}
                                >
                                    <FaChevronRight />
                                </button>
                                
                                <div className="deals-enlarged-counter">
                                    {currentImageIndex + 1} / {content.list.length}
                                </div>
                                <button 
                                    className="deals-enlarged-nav deals-enlarged-prev"
                                    onClick={handlePrevImage}
                                    aria-label={language === 'en' ? "Previous" : "السابق"}
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

export default Deals;