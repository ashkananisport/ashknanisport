import React, { useState, useEffect } from 'react';

interface HeaderProps {
    content: {
        nav: {
            about: string;
            services: string;
            achievements: string;
            deals: string;
            gallery: string;
            documents: string;
            contact: string;
        };
        lang_toggle: string;
    };
    language: 'en' | 'ar';
    toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ content, language, toggleLanguage }) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <a href="#hero" className="nav-logo">
                     <img src="/images/logo.png" alt="Ashkanani Sport Marketing Logo" />
                </a>
                <nav>
                     <ul className="nav-links">
                        <li><a href="#hero">{content.nav.home}</a></li>
                        <li><a href="#about">{content.nav.about}</a></li>
                        <li><a href="#agent-benefits">{content.nav.agentBenefits}</a></li>
                        <li><a href="#services">{content.nav.services}</a></li>
                        <li><a href="#achievements">{content.nav.achievements}</a></li>
                        <li><a href="#deals">{content.nav.deals}</a></li>
                        <li><a href="#gallery">{content.nav.gallery}</a></li>
                        <li><a href="#player-signing">{content.nav.playerSigning}</a></li>
                        <li><a href="#transfer-market">{content.nav.transferMarket}</a></li>
                        <li><a href="#documents">{content.nav.documents}</a></li>
                        <li><a href="#contact">{content.nav.contact}</a></li>
                    </ul>
                    </nav>
                <button onClick={toggleLanguage} className="lang-switcher">
                    {content.lang_toggle}
                </button>
            </nav>
        </header>
    );
}

export default Header;
