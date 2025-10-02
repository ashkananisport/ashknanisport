// src/components/Footer.tsx

import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope ,FaYoutube } from 'react-icons/fa';

interface FooterProps {
    content: {
        copyright: string;
        quickLinks: string;
        socialMedia: Array<{
            platform: string;
            icon: string;
            url: string;
        }>;
        partners: Array<{
            name: string;
            logoUrl: string;
            url: string;
        }>;
        transferMarket: { // إضافة واجهة TransferMarket
            title: string;
            highlight: string;
            description: string;
            logoUrl: string;
            profileUrl: string;
            buttonText: string;
        };
        nav: {
            home: string;
            about: string;
            services: string;
            achievements: string;
            deals: string;
            gallery: string;
            documents: string;
            contact: string;
            playerSigning: string;
            agentBenefits: string;
            transferMarket: string;
            AshknaniChampionship:string;

        };
    };
}

const Footer: React.FC<FooterProps> = ({ content }) => {
    // إنشاء خريطة الأيقونات
    const iconMap = {
        FaFacebook: <FaFacebook />,
        FaTwitter: <FaTwitter />,
        FaInstagram: <FaInstagram />,
        FaEnvelope : <FaEnvelope  />,
        FaYoutube:<FaYoutube/>
    };

    // تقسيم الروابط إلى عمودين
    const navLinks = [
        { href: '#hero', text: content.nav.home },
        { href: '#about', text: content.nav.about },
        { href: '#agent-benefits', text: content.nav.agentBenefits },
        { href: '#services', text: content.nav.services },
        { href: '#achievements', text: content.nav.achievements },
        { href: '#gallery', text: content.nav.gallery },
        { href: '#player-signing', text: content.nav.playerSigning },
        { href: '#ashkani-championship', text: content.nav.AshknaniChampionship },
        { href: '#consultation-booking', text: content.nav.contact }
    ];

    // تقسيم الروابط إلى نصفين
    const half = Math.ceil(navLinks.length / 2);
    const firstColumnLinks = navLinks.slice(0, half);
    const secondColumnLinks = navLinks.slice(half);

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo">
                    <img src="/images/logo.png" alt="Ashkanani Sport Marketing Logo" loading="lazy"/>
                </div>
                
                <div className="footer-content">
                    <div className="footer-section">
                        <h3>{content.quickLinks}</h3>
                        <div className="footer-columns">
                            <div className="footer-column">
                                <ul className="footer-links">
                                    {firstColumnLinks.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.href}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="footer-column">
                                <ul className="footer-links">
                                    {secondColumnLinks.map((link, index) => (
                                        <li key={index}>
                                            <a href={link.href}>{link.text}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="footer-section">
                        <h3>تابعنا</h3>
                        <div className="social-links">
                            {content.socialMedia.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.url} 
                                    aria-label={social.platform}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    {iconMap[social.icon]}
                                </a>
                            ))}
                        </div>
                    </div>
                    
                    {/* قسم ترانسفير ماركت منفصل */}
                    <div className="footer-section transfermarket-section">
                        <h3>TransferMarket</h3>
                        <div className="transfermarket-container">
                            <a 
                                href={content.transferMarket.profileUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="transfermarket-logo-link"
                                title={content.transferMarket.title}
                            >
                                <img 
                                    src={content.transferMarket.logoUrl} 
                                    alt={content.transferMarket.title} 
                                    className="transfermarket-logo"
                                    loading="lazy"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                
                {/* قسم شركاؤنا - تم نقله إلى الأسفل */}
                <div className="footer-partners-section">
                    <h3>شركاؤنا</h3>
                    <div className="partners-grid">
                        {content.partners.map((partner, index) => (
                            <a 
                                key={index}
                                href={partner.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="partner-logo"
                                title={partner.name}
                            >
                                <img src={partner.logoUrl} alt={partner.name} loading="lazy"/>
                            </a>
                        ))}
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>{content.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;