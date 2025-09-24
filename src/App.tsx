import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import PlayerSigning from './components/PlayerSigning'; 
import TransferMarket from './components/TransferMarket'; 
import AgentBenefits from './components/AgentBenefits'; 
import FloatingVideo from './components/FloatingVideo'; 
import ChatBot from './components/ChatBot';
import ConsultationBooking from './components/ConsultationBooking'; 
import WhatsAppButton from './components/WhatsAppButton';
import { Language, AppContent, LanguageContent } from './types';
import './styles/index.css'; 

// ثوابت للتخزين المؤقت
const CACHE_KEY = 'ashkanani_data';
const CACHE_DURATION = 1; // 30 دقيقة

function App() {
    const [language, setLanguage] = useState<Language>('ar');
    const [content, setContent] = useState<AppContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // دالة للتحقق من صلاحية التخزين المؤقت
    const isCacheValid = useCallback((cachedData: any) => {
        return cachedData && cachedData.timestamp && 
               (Date.now() - cachedData.timestamp < CACHE_DURATION);
    }, []);

    // دالة لجلب البيانات مع التخزين المؤقت
    const fetchData = useCallback(async () => {
        setLoading(true);
        
        try {
            // التحقق من وجود بيانات في التخزين المؤقت
            const cachedData = localStorage.getItem(CACHE_KEY);
            
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                
                if (isCacheValid(parsedData)) {
                    console.log('Using cached data');
                    setContent(parsedData.data);
                    setLoading(false);
                    return;
                }
            }
            
            // جلب البيانات من الخادم
            console.log('Fetching fresh data');
            const response = await fetch('https://script.google.com/macros/s/AKfycbzJH4yEjichjVOamFkiAwnxTVpSblF54AA-BIe9sAT62Jk-baW0z4GxwnGxfpd5HYj9/exec');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data: AppContent = await response.json();
            
            // تخزين البيانات في localStorage
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data,
                timestamp: Date.now()
            }));
            
            setContent(data);
        } catch (err) {
            console.error("Failed to load company data:", err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            
            // محاولة استخدام البيانات المخزنة حتى لو منتهية الصلاحية
            const cachedData = localStorage.getItem(CACHE_KEY);
            if (cachedData) {
                const parsedData = JSON.parse(cachedData);
                setContent(parsedData.data);
                setError(null);
            }
        } finally {
            setLoading(false);
        }
    }, [isCacheValid]);

    // تحديث البيانات في الخلفية كل 5 دقائق
    useEffect(() => {
        const interval = setInterval(() => {
            fetch('https://script.google.com/macros/s/AKfycbwBOglUo6_OoahLXIKQXu2YTnQB-Qn4jjufHepLfl7mu1e-XjPy66JCarKsNXezOGDK/exec')
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data,
                        timestamp: Date.now()
                    }));
                    console.log('Background data refresh completed');
                })
                .catch(err => console.log('Background refresh failed:', err));
        }, 5 * 60 * 1000); // كل 5 دقائق
        
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        document.documentElement.lang = language;
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    useEffect(() => {
        if (!content) return;

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
    }, [content]);
    
    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'en' ? 'ar' : 'en');
    }, []);

    // استخدام useMemo لمنع إعادة التصيير غير الضروري
    const currentContent = useMemo(() => {
        if (!content) return null;
        return content[language];
    }, [content, language]);

    if (loading) {
        return <div className="loading-container">Loading...</div>;
    }

    if (error) {
        return <div className="error-container">Error loading data: {error}</div>;
    }

    if (!content) {
        return <div className="error-container">No data available</div>;
    }

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
                <AgentBenefits content={currentContent.agentBenefits} />
                <Services content={currentContent.services} language={language} /> 
                <Achievements content={currentContent.achievements} language={language} />
                <Deals content={currentContent.deals} language={language} />
                <Gallery content={currentContent.gallery}  language={language}/>
                <PlayerSigning content={currentContent.playerSigning} />
                <ConsultationBooking content={currentContent.consultationBooking} language={language} />
            </main>
            <Footer 
                content={{
                    ...currentContent.footer, 
                    nav: currentContent.header.nav,
                    transferMarket: currentContent.transferMarket 
                }} 
            />
            
            {/* إضافة زر الواتساب الثابت */}
            <WhatsAppButton 
                phoneNumber="96597131223"
                defaultMessage="مرحباً، أود حجز استشارة مع الكابتن أحمد جابر أشكناني"
                iconSize={36}
                iconColor="#FFFFFF"
            />
            
            <FloatingVideo 
                videoUrl="https://res.cloudinary.com/dl5duvmve/video/upload/v1758725812/video2_eft2ud.mp4" 
                thumbnailUrl="images/thumb2.png"
                autoPlay={true}
                muted={true}
                controls={false}
                width={120}
                height={160}
            />
        </>
    );
}

export default App;