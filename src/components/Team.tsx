import React from 'react';
import { BsCheck2Circle } from 'react-icons/bs';

const Team = ({ content }) => (
    <section id="team" className="section">
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
            <div className="team-content">
                <div className="team-card">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" 
                      alt={content.name} 
                      className="team-photo"
                    />
                    <div className="team-info">
                        <h3>{content.name}</h3>
                        <p className="role">{content.role}</p>
                        <ul>
                            {content.credentials.map((item, index) => (
                                <li key={index}><BsCheck2Circle /> {item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

export default Team;
