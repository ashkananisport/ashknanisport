import React, { useState } from 'react';
import { FaPlay, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = ({ content }) => {
    const [activeTab, setActiveTab] = useState('photos');
    const [modalItem, setModalItem] = useState({ isOpen: false, type: null, index: -1 });

    const openModal = (type, index) => setModalItem({ isOpen: true, type, index });
    const closeModal = () => setModalItem({ isOpen: false, type: null, index: -1 });

    const handleNav = (direction) => {
        const items = content[activeTab];
        let newIndex = modalItem.index + direction;
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;
        setModalItem({ ...modalItem, index: newIndex });
    };

    const currentItems = content[activeTab];
    const currentModalData = modalItem.isOpen ? content[modalItem.type][modalItem.index] : null;

    return (
        <section id="gallery" className="section">
            <div className="container">
                <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
                
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

                <div className="gallery-grid">
                    {activeTab === 'photos' && content.photos.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => openModal('photos', index)}>
                            <img src={item.src} alt={item.title} />
                            <div className="gallery-overlay"><h3>{item.title}</h3></div>
                        </div>
                    ))}
                    {activeTab === 'videos' && content.videos.map((item, index) => (
                        <div key={index} className="gallery-item" onClick={() => openModal('videos', index)}>
                            {/* لو عندك صورة thumbnail للفيديو، استخدميها */}
                            {item.thumbnail && <img src={item.thumbnail} alt={item.title} />}
                            <div className="gallery-overlay">
                                <span className="play-icon"><FaPlay /></span>
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalItem.isOpen && currentModalData && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                    <button className="modal-nav prev" onClick={(e) => {e.stopPropagation(); handleNav(-1)}}><FaChevronLeft /></button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        {modalItem.type === 'photos' ? (
                        <img src={currentModalData.src} alt={currentModalData.title} />
                        ) : (
                        <div
                        className="modal-video-container"
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '100%',
                            height: '80vh',  // ارتفاع المودال
                            padding: '20px', // مسافة حول الفيديو
                            boxSizing: 'border-box',
                        }}
                        >
                        <video
                            controls
                            autoPlay
                            style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            display: 'block',
                            }}
                        >
                            <source src={currentModalData.src} type="video/mp4" />
                            متصفحك لا يدعم عرض الفيديو
                        </video>
                        </div>


                        )}
                        </div>
                    <button className="modal-nav next" onClick={(e) => {e.stopPropagation(); handleNav(1)}}><FaChevronRight /></button>
                </div>
            )}
        </section>
    );
};

export default Gallery;
