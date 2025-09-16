import React from 'react';
import { FaTrophy, FaAward, FaStar } from 'react-icons/fa';

const iconMap = {
    FaTrophy: <FaTrophy />,
    FaAward: <FaAward />,
    FaStar: <FaStar />
};

const Achievements = ({ content }) => (
    <section id="achievements" className="section" style={{backgroundColor: 'var(--primary-color)'}}>
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
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

export default Achievements;
