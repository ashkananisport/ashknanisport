import React from 'react';

const Deals = ({ content, language }) => {
    // استخدام عناوين ثابتة بناءً على اللغة
    const titlePart1 = language === 'en' ? 'Contracts &' : 'العقود';
    const titlePart2 = language === 'en' ? 'Deals' : 'والصفقات';

    return (
        <section id="deals" className="section">
            <div className="container">
                <h2 className="section-title">{titlePart1} <span>{titlePart2}</span></h2>
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
};

export default Deals;