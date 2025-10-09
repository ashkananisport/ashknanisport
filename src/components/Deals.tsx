import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Deals = ({ content, language }) => {
    const [isEnlarged, setIsEnlarged] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [currentDealType, setCurrentDealType] = useState('deals'); // 'deals' أو 'importantDeals'

    // استخدام عناوين ثابتة بناءً على اللغة
    const titlePart1 = language === 'en' ? 'Best Contracts &' : 'ابرز العقود';
    const titlePart2 = language === 'en' ? 'Deals' : 'والصفقات';
    
    // النص الجديد الذي سيظهر تحت العنوان
    const subtitleText = language === 'en' 
        ? 'We have approximately 177 deals since the company\'s establishment in all countries'
        : 'نمتلك ما يقارب 177 صفقة منذ انشاء الشركة بجميع الدول';

    // نصوص الأزرار
    const dealsButtonText = language === 'en' ? 'View Best Deals' : 'شاهد ابرز الصفقات';
    const importantDealsButtonText = language === 'en' ? 'View European Deals' : 'شاهد ابرز الصفقات الاوروبية';

    const handleDealsButtonClick = () => {
        setCurrentDealType('deals');
        setCurrentImageIndex(0);
        setIsEnlarged(true);
        document.body.style.overflow = 'hidden';
    };

    const handleImportantDealsButtonClick = () => {
        setCurrentDealType('importantDeals');
        setCurrentImageIndex(0);
        setIsEnlarged(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseEnlarged = () => {
        setIsEnlarged(false);
        document.body.style.overflow = 'auto';
    };

    const handlePrevImage = () => {
        const currentList = currentDealType === 'deals' ? content.deals : content.importantDeals;
        setCurrentImageIndex((prev) => (prev - 1 + currentList.length) % currentList.length);
    };

    const handleNextImage = () => {
        const currentList = currentDealType === 'deals' ? content.deals : content.importantDeals;
        setCurrentImageIndex((prev) => (prev + 1) % currentList.length);
    };

    // الحصول على القائمة الحالية بناءً على النوع المحدد
    const getCurrentList = () => {
        return currentDealType === 'deals' ? content.deals : content.importantDeals;
    };

    return (
        <>
            <section id="deals" className="section">
                <div className="container">
                    <h2 className="section-title">{titlePart1} <span>{titlePart2}</span></h2>
                    {/* إضافة السطر الجديد تحت العنوان */}
                    <p className="section-subtitle">{subtitleText}</p>
                    
                    {/* حاوية الأزرار */}
                    <div className="deals-buttons-container">
                        <button 
                            className="deals-view-button"
                            onClick={handleDealsButtonClick}
                        >
                            {dealsButtonText}
                        </button>
                        <button 
                            className="deals-view-button important-deals-button"
                            onClick={handleImportantDealsButtonClick}
                        >
                            {importantDealsButtonText}
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
                            src={getCurrentList()[currentImageIndex].img} 
                            alt={getCurrentList()[currentImageIndex].title}
                            className="deals-enlarged-image"
                            loading="lazy"
                        />
                        
                        <div className="deals-enlarged-info">
                            <h3>{getCurrentList()[currentImageIndex].title}</h3>
                            <p>{getCurrentList()[currentImageIndex].description}</p>
                        </div>
                        
                        {getCurrentList().length > 1 && (
                            <div className="deals-enlarged-controls">
                                <button 
                                    className="deals-enlarged-nav deals-enlarged-prev"
                                    onClick={handlePrevImage}
                                    aria-label={language === 'en' ? "Previous" : "السابق"}
                                >
                                    {language === 'en' ? <FaChevronLeft /> : <FaChevronRight />}
                                </button>

                                <div className="deals-enlarged-counter">
                                    {currentImageIndex + 1} / {getCurrentList().length}
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

export default Deals;