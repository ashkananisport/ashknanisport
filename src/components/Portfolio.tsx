import React, { useState } from 'react';

const Portfolio = ({ content }) => {
    const [modalImage, setModalImage] = useState(null);

    const openModal = (img) => setModalImage(img);
    const closeModal = () => setModalImage(null);

    return (
        <section id="portfolio" className="section">
            <div className="container">
                <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
                <div className="portfolio-grid">
                    {content.items.map((item, index) => (
                        <div key={index} className="portfolio-item" onClick={() => openModal(item.img)}>
                            <img src={item.img} alt={item.title} />
                            <div className="portfolio-overlay">
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {modalImage && (
                <div className="modal-backdrop" onClick={closeModal}>
                    <button className="modal-close" onClick={closeModal}>&times;</button>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img src={modalImage} alt="Portfolio showcase" />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Portfolio;
