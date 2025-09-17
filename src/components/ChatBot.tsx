// src/components/ChatBot.tsx

import React, { useState, useEffect } from 'react';

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{text: string, sender: 'user' | 'bot'}[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);
    const [hasOpened, setHasOpened] = useState(false);

    // إرسال رسالة ترحيب عند أول فتح للشات
    useEffect(() => {
        if (isOpen && !hasOpened) {
            const welcomeMessage = { 
                text: "مرحباً بك في اشكناني سبورت كيف يمكننا مساعدتك؟", 
                sender: 'bot' as const 
            };
            setMessages([welcomeMessage]);
            setHasOpened(true);
        }
    }, [isOpen, hasOpened]);

    // تحديث عدد الرسائل غير المقروءة عند إضافة رسالة جديدة والشات مغلق
    useEffect(() => {
        if (!isOpen && messages.length > 0) {
            setUnreadCount(messages.length);
        }
    }, [messages, isOpen]);

    // إعادة تعيين العداد عند فتح الشات
    useEffect(() => {
        if (isOpen) {
            setUnreadCount(0);
        }
    }, [isOpen]);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    const handleSendMessage = () => {
        if (inputValue.trim() === '') return;
        
        // Add user message
        const newMessage = { text: inputValue, sender: 'user' as const };
        setMessages(prev => [...prev, newMessage]);
        setInputValue('');
        
        // Simulate bot response after a delay
        setTimeout(() => {
            const botResponse = { 
                text: "شكراً لرسالتك! سنتواصل معك قريباً.", 
                sender: 'bot' as const 
            };
            setMessages(prev => [...prev, botResponse]);
        }, 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="chatbot-container">
            {/* Chat button with robot icon */}
            <button 
                className="chatbot-button" 
                onClick={toggleChat}
                aria-label="فتح الدردشة"
            >
                <span className="chatbot-robot">🤖</span>
                {/* عرض عداد الرسائل غير المقروءة */}
                {unreadCount > 0 && (
                    <span className="unread-count">{unreadCount}</span>
                )}
            </button>

            {/* Chat window */}
            {isOpen && (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="header-info">
                            <span className="header-robot">🤖</span>
                            <div>
                                <h3>دردشة معنا</h3>
                                <p>نحن هنا لمساعدتك</p>
                            </div>
                        </div>
                        <button className="close-chat" onClick={toggleChat}>✕</button>
                    </div>
                    <div className="chatbot-messages">
                        {messages.map((message, index) => (
                            <div 
                                key={index} 
                                className={`message ${message.sender}`}
                            >
                                {message.text}
                            </div>
                        ))}
                    </div>
                    <div className="chatbot-input">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="اكتب رسالتك..."
                        />
                        <button onClick={handleSendMessage}>إرسال</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;