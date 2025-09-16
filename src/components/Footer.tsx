import React from 'react';
import { FaInstagram, FaTwitter, FaWhatsapp} from 'react-icons/fa';

// FIX: Added explicit types for component props to fix syntax errors and type issues.
// The original code was syntactically invalid, with JSX outside a component definition,
// which caused a cascade of errors including `Cannot find name 'div'` and `Type 'unknown' is not assignable`.
// This also addresses the type error for `value` in `Object.entries` by typing `content.nav`.
interface FooterProps {
    content: {
        nav: { [key: string]: string };
        copyright: string;
    };
}


const Footer: React.FC<FooterProps> = ({ content }) => (
    <footer className="footer">
        <div className="container">
            <div className="footer-logo">
                <img src="/images/logo.png" alt="Ashkanani Sport Marketing Logo" />
            </div>
             <ul className="footer-links">
                {Object.entries(content.nav).map(([key, value]) => (
                     <li key={key}><a href={`#${key}`}>{value}</a></li>
                ))}
            </ul>
            <div className="social-links">
                <a href="https://www.instagram.com/ashkanani.sport/" aria-label="Instagram"><FaInstagram /></a>
                <a href="https://x.com/ashkanani_sport" aria-label="Twitter"><FaTwitter /></a>
                <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
            <p className="copyright">{content.copyright}</p>
        </div>
    </footer>
);

export default Footer;
