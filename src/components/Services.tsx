import React from 'react';
import { FaFutbol, FaBullhorn, FaHandshake, FaAppleAlt, FaGavel, FaGlobe, FaBrain, FaDumbbell } from 'react-icons/fa';

const iconMap = {
    FaFutbol: <FaFutbol />,
    FaBullhorn: <FaBullhorn />,
    FaHandshake: <FaHandshake />,
    FaAppleAlt: <FaAppleAlt />,
    FaGavel: <FaGavel />,
    FaGlobe: <FaGlobe />,
    FaBrain: <FaBrain />,
    FaDumbbell: <FaDumbbell />,
};


const Services = ({ content }) => (
    <section id="services" className="section" style={{backgroundColor: 'var(--primary-color)'}}>
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
            <div className="grid-container">
                {content.list.map((service, index) => (
                    <div key={index} className="card">
                        <div className="card-icon">{iconMap[service.icon]}</div>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Services;
