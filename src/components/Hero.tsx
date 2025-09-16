import React from 'react';

const Hero = ({ content }) => (
    <section id="hero" className="hero">
        <h1 className="hero-logo">
                <img src="/images/logo.png" alt="Ashkanani Sport Marketing Logo" />
        </h1>
        <p className="hero-tagline">{content.tagline}</p>
        <div className="hero-cta">
            <a href="#contact" className="btn btn-primary">{content.cta1}</a>
            <a href="#about" className="btn btn-secondary">{content.cta2}</a>
        </div>
    </section>
);

export default Hero;