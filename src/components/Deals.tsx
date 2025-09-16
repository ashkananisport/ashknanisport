import React from 'react';

const Deals = ({ content }) => (
    <section id="deals" className="section">
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
            <div className="grid-container">
                {content.list.map((deal, index) => (
                    <div key={index} className="card">
                        <img src={deal.img} alt={deal.title} />
                        <h3>{deal.title}</h3>
                        <p>{deal.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Deals;
