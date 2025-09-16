import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Achievements from './components/Achievements';
import Deals from './components/Deals';
import Gallery from './components/Gallery';
import Documents from './components/Documents';
import Contact from './components/Contact';
import Footer from './components/Footer';

type Language = 'en' | 'ar';

function App() {
    const [language, setLanguage] = useState<Language>('ar');
    const [content, setContent] = useState(null);

    useEffect(() => {
        fetch('/company.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error("HTTP error " + response.status);
                }
                return response.json();
            })
            .then(data => {
                setContent(data);
            })
            .catch(error => {
                console.error("Failed to load company data:", error);
            });
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const sections = document.querySelectorAll('.section');
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => sections.forEach((section) => observer.unobserve(section));
    }, [content]); // Re-run when content loads
    
    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    }, []);

    if (!content) {
        return <div className="loading-container">Loading...</div>;
    }

    const currentContent = content[language];

    return (
        <>
            <Header
                content={currentContent.header}
                language={language}
                toggleLanguage={toggleLanguage}
            />
            <main>
                <Hero content={currentContent.hero} />
                <About content={currentContent.about} />
                <Services content={currentContent.services} />
                <Achievements content={currentContent.achievements} />
                <Deals content={currentContent.deals} />
                <Gallery content={currentContent.gallery} />
                <Contact content={currentContent.contact} />
            </main>
            <Footer content={{...currentContent.footer, nav: currentContent.header.nav}} />
        </>
    );
}

export default App;
