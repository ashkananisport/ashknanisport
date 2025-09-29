import React, { useState, useEffect } from 'react';
import { FaPlay, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const AshkaniChampionship = ({ content, language }) => {
    const [activeTab, setActiveTab] = useState('2024');
    const [modalItem, setModalItem] = useState({ isOpen: false, index: -1 });

    const openModal = (index) => {
        setModalItem({ isOpen: true, index });
        // منع التمرير عند فتح المودال
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        setModalItem({ isOpen: false, index: -1 });
        // استعادة التمرير عند الإغلاق
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handler = (e: any) => {
            if (e.detail.sectionId === 'ashkani-championship') {
                setActiveTab(e.detail.tab);
            }
        };
        window.addEventListener('switchTab', handler);
        return () => window.removeEventListener('switchTab', handler);
    }, []);

    const handlePrev = () => {
        const items = content.media[activeTab];
        if (!items || items.length <= 1) return;
        
        let newIndex;
        if (language === 'ar') {
            // في اللغة العربية: السهم الأيمن (السابق) ينتقل للعنصر التالي في المصفوفة
            newIndex = (modalItem.index + 1) % items.length;
        } else {
            // في اللغة الإنجليزية: السهم الأيسر (السابق) ينتقل للعنصر السابق في المصفوفة
            newIndex = (modalItem.index - 1 + items.length) % items.length;
        }
        
        setModalItem({ ...modalItem, index: newIndex });
    };

    const handleNext = () => {
        const items = content.media[activeTab];
        if (!items || items.length <= 1) return;
        
        let newIndex;
        if (language === 'ar') {
            // في اللغة العربية: السهم الأيسر (التالي) ينتقل للعنصر السابق في المصفوفة
            newIndex = (modalItem.index - 1 + items.length) % items.length;
        } else {
            // في اللغة الإنجليزية: السهم الأيمن (التالي) ينتقل للعنصر التالي في المصفوفة
            newIndex = (modalItem.index + 1) % items.length;
        }
        
        setModalItem({ ...modalItem, index: newIndex });
    };
    const currentMedia = content.media[activeTab];
    const currentModalData = modalItem.isOpen ? currentMedia[modalItem.index] : null;

    // نصوص الأزرار بناءً على اللغة
    const viewMediaText = language === 'en' ? 'View Championship Media' : 'شاهد وسائط البطولة';

    // تحديد أيقونات الأسهم بناءً على اللغة
    const getPrevIcon = () => {
        return language === 'en' ? <FaChevronLeft /> : <FaChevronRight />;
    };
    
    const getNextIcon = () => {
        return language === 'en' ? <FaChevronRight /> : <FaChevronLeft />;
    };

    return (
        <section id="ashkani-championship" className="section">
            <div className="container">
                <h2 className="section-title">
                    {content.title} 
                </h2>
                
                <div className="championship-description">
                    <p>{content.description}</p>
                </div>
                
                <div className="championship-tabs">
                    <button 
                        className={`tab-btn ${activeTab === '2024' ? 'active' : ''}`}
                        onClick={() => setActiveTab('2024')}
                    >
                        {content.tabs['2024']}
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === '2025' ? 'active' : ''}`}
                        onClick={() => setActiveTab('2025')}
                    >
                        {content.tabs['2025']}
                    </button>
                </div>

                {/* المحتوى الخاص بكل تبويب */}
                <div className="tab-content">
                    {activeTab === '2024' && (
                        <div className="tab-pane">
                            <div className="championship-description">
                                <p>{language === 'en' ? 
                                    'Browse our collection of memorable moments from the 2024 championship.' : 
                                    'تصفح مجموعتنا من اللحظات المميزة من بطولة 2024.'}</p>
                                
                                {/* زر عرض الوسائط */}
                                <div className="championship-action-container">
                                    <button 
                                        className="championship-action-btn"
                                        onClick={() => openModal(0)}
                                    >
                                        {viewMediaText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === '2025' && (
                        <div className="tab-pane">
                            <div className="championship-description">
                                <p>{language === 'en' ? 
                                    'Browse our collection of memorable moments from the 2025 championship.' : 
                                    'تصفح مجموعتنا من اللحظات المميزة من بطولة 2025.'}</p>
                                
                                {/* زر عرض الوسائط */}
                                <div className="championship-action-container">
                                    <button 
                                        className="championship-action-btn"
                                        onClick={() => openModal(0)}
                                    >
                                        {viewMediaText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* المودال المكبر */}
            {modalItem.isOpen && currentModalData && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <button className="modal-close-btn" onClick={closeModal}>
                        <FaTimes />
                    </button>
                    
                    <button 
                        className="modal-nav modal-nav-prev" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handlePrev();
                        }}
                    >
                        {getPrevIcon()}
                    </button>
                    
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {currentModalData.type === 'image' ? (
                            <img src={currentModalData.src} />
                        ) : (
                            <div className="modal-video-container">
                                <video
                                    key={`video-${modalItem.index}`} // مفتاح فريد لإعادة تحميل الفيديو عند التغيير
                                    controls
                                    autoPlay
                                >
                                    <source src={currentModalData.src} type="video/mp4" />
                                    {language === 'en' ? 
                                        'Your browser does not support the video tag.' : 
                                        'متصفحك لا يدعم عرض الفيديو'}
                                </video>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        className="modal-nav modal-nav-next" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleNext();
                        }}
                    >
                        {getNextIcon()}
                    </button>
                    
                    {/* عداد الوسائط */}
                    <div className="modal-counter">
                        {modalItem.index + 1} / {currentMedia.length}
                    </div>
                    
                 
                </div>
            )}
        </section>
    );
};

export default AshkaniChampionship;