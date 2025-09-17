import React from 'react';
import { FaTrophy, FaAward, FaStar } from 'react-icons/fa';

const iconMap = {
    FaTrophy: <FaTrophy />,
    FaAward: <FaAward />,
    FaStar: <FaStar />
};

const Achievements = ({ content, language }) => {
    // استخدام عناوين ثابتة بناءً على اللغة
    const titlePart1 = language === 'en' ? 'Awards &' : 'الجوائز';
    const titlePart2 = language === 'en' ? 'Achievements' : 'والإنجازات';

    return (
        <section id="achievements" className="section" style={{backgroundColor: 'var(--primary-color)'}}>
            <div className="container">
                <h2 className="section-title">{titlePart1} <span>{titlePart2}</span></h2>
                <div className="grid-container">
                    {content.list.map((item, index) => (
                        <div key={index} className="card">
                            <div className="card-icon">{iconMap[item.icon]}</div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;