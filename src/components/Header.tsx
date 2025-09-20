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
            home: string;
            agentBenefits: string;
            playerSigning: string;
        };
        lang_toggle: string;
    };
    language: 'en' | 'ar';
    toggleLanguage: () => void;
}

const Header: React.FC<HeaderProps> = ({ content, language, toggleLanguage }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <nav className="nav">
                <div className="nav-container">
                    <a href="#hero" className="nav-logo">
                         <img src="/images/logo.png" alt="Ashkanani Sport Marketing Logo" />
                    </a>
                    
                    <div className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                         <ul className="nav-links">
                            <li><a href="#hero" onClick={closeMenu}>{content.nav.home}</a></li>
                            <li><a href="#about" onClick={closeMenu}>{content.nav.about}</a></li>
                            <li><a href="#agent-benefits" onClick={closeMenu}>{content.nav.agentBenefits}</a></li>
                            <li><a href="#services" onClick={closeMenu}>{content.nav.services}</a></li>
                            <li><a href="#achievements" onClick={closeMenu}>{content.nav.achievements}</a></li>
                            <li><a href="#deals" onClick={closeMenu}>{content.nav.deals}</a></li>
                            <li><a href="#gallery" onClick={closeMenu}>{content.nav.gallery}</a></li>
                            <li><a href="#player-signing" onClick={closeMenu}>{content.nav.playerSigning}</a></li>
                            <li><a href="#consultation-booking" onClick={closeMenu}>{content.nav.contact}</a></li>
                        </ul>
                        
                        <button onClick={() => { toggleLanguage(); closeMenu(); }} className="lang-switcher">
                            {content.lang_toggle}
                        </button>
                    </div>
                </div>
                
                <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
                    <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
                    <span className={`hamburger ${menuOpen ? 'open' : ''}`}></span>
                </button>
            </nav>
        </header>
    );
}

export default Header;