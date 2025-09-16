import React from 'react';

const Timeline = ({ content }) => (
    <section id="history" className="section" style={{backgroundColor: 'var(--primary-color)'}}>
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
            <div className="timeline-container">
                {content.events.map((event, index) => (
                    <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-content">
                            <span className="year">{event.year}</span>
                            <h3>{event.title}</h3>
                            <p>{event.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Timeline;
