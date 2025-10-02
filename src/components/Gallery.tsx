import React, { useState, useEffect } from 'react';
import { FaPlay, FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

const Gallery = ({ content, language }) => {
    const [activeTab, setActiveTab] = useState('photos');
    const [modalItem, setModalItem] = useState({ isOpen: false, type: null, index: -1 });
useEffect(() => {
  document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
}, [language]);

    const openModal = (type, index) => {
        setModalItem({ isOpen: true, type, index });
        // منع التمرير عند فتح المودال
        document.body.style.overflow = 'hidden';
    };
    
    const closeModal = () => {
        setModalItem({ isOpen: false, type: null, index: -1 });
        // استعادة التمرير عند الإغلاق
        document.body.style.overflow = 'auto';
    };

    useEffect(() => {
        const handler = (e: any) => {
            if (e.detail.sectionId === 'gallery') {
                setActiveTab(e.detail.tab);
            }
        };
        window.addEventListener('switchTab', handler);
        return () => window.removeEventListener('switchTab', handler);
    }, []);

    // تعديل دالة التنقل لتكون متسقة مع اتجاه اللغة
    const handlePrev = () => {
    const items = content[modalItem.type];
    if (!items || items.length <= 1) return;
    const newIndex = (modalItem.index - 1 + items.length) % items.length;
    setModalItem({ ...modalItem, index: newIndex });
};

const handleNext = () => {
    const items = content[modalItem.type];
    if (!items || items.length <= 1) return;
    const newIndex = (modalItem.index + 1) % items.length;
    setModalItem({ ...modalItem, index: newIndex });
};

    const currentItems = content[activeTab];
    const currentModalData = modalItem.isOpen ? content[modalItem.type][modalItem.index] : null;

    // استخدام عناوين ثابتة بناءً على اللغة
    const titlePart1 = language === 'en' ? 'Our' : 'معرض';
    const titlePart2 = language === 'en' ? 'Gallery' : 'الصور والفيديو';

    // نصوص الأزرار بناءً على اللغة
    const viewPhotosText = language === 'en' ? 'View Best Photos' : 'شاهد أبرز الصور';
    const viewVideosText = language === 'en' ? 'View Best Videos' : 'شاهد أبرز الفيديوهات';

    // دالة لفتح المعرض مباشرة
    const openGalleryDirectly = (type) => {
        if (content[type] && content[type].length > 0) {
            openModal(type, 0);
        }
    };

    // تحديد أيقونات الأسهم بناءً على اللغة
    const getPrevIcon = () => {
        return language === 'en' ? <FaChevronLeft /> : <FaChevronRight />;
    };
    
    const getNextIcon = () => {
        return language === 'en' ? <FaChevronRight /> : <FaChevronLeft />;
    };

    return (
        <section id="gallery" className="section">
            <div className="container">
                <h2 className="section-title">{titlePart1} <span>{titlePart2}</span></h2>
                
                <div className="gallery-tabs">
                    <button 
                        className={`tab-btn ${activeTab === 'photos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('photos')}
                    >
                        {content.tabs.photos}
                    </button>
                    <button 
                        className={`tab-btn ${activeTab === 'videos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('videos')}
                    >
                        {content.tabs.videos}
                    </button>
                </div>

                {/* المحتوى الخاص بكل تبويب */}
                <div className="tab-content">
                    {activeTab === 'photos' && (
                        <div className="tab-pane">
                            <div className="gallery-description">
                                <p>{language === 'en' ? 
                                    'Browse our collection of memorable moments and achievements.' : 
                                    'تصفح مجموعتنا من اللحظات والإنجازات المميزة.'}</p>
                                
                                {/* زر عرض الصور */}
                                <div className="gallery-action-container">
                                    <button 
                                        className="gallery-action-btn"
                                        onClick={() => openGalleryDirectly('photos')}
                                    >
                                        {viewPhotosText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'videos' && (
                        <div className="tab-pane">
                            <div className="gallery-description">
                                <p>{language === 'en' ? 
                                    'Watch our collection of highlight videos and interviews.' : 
                                    'شاهد مجموعتنا من مقاطع الفيديو المميزة والمقابلات.'}</p>
                                
                                {/* زر عرض الفيديوهات */}
                                <div className="gallery-action-container">
                                    <button 
                                        className="gallery-action-btn"
                                        onClick={() => openGalleryDirectly('videos')}
                                    >
                                        {viewVideosText}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* شبكة المعرض (مخفية الآن) */}
                <div className="gallery-grid" style={{ display: 'none' }}>
                    {activeTab === 'photos' && content.photos.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => openModal('photos', index)}>
                            <img src={item.src} alt={item.title} loading="lazy"/>
                            <div className="gallery-overlay"><h3>{item.title}</h3></div>
                        </div>
                    ))}
                    {activeTab === 'videos' && content.videos.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => openModal('videos', index)}>
                            {item.thumbnail && <img src={item.thumbnail} alt={item.title} loading="lazy"/>}
                            <div className="gallery-overlay">
                                <span className="play-icon"><FaPlay /></span>
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
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
                        {modalItem.type === 'photos' ? (
                            <img src={currentModalData.src} alt={currentModalData.title} loading="lazy"/>
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
                        }
                    }>
                        {getNextIcon()}
                    </button>
                    
                    {/* عداد الصور/الفيديوهات */}
                    <div className="modal-counter">
                        {modalItem.index + 1} / {content[modalItem.type].length}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;