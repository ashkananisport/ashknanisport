// src/components/WhatsAppButton.tsx
import React, { useState } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  defaultMessage?: string;
  className?: string;
  iconSize?: number;
  iconColor?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "96597131223", 
  defaultMessage = "مرحباً، أود الاستفسار عن خدماتكم",
  className = "",
  iconSize = 36,
  iconColor = "#FFF"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  const handleQuickWhatsApp = () => {
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <button
        onClick={handleQuickWhatsApp}
        className={`whatsapp-float ${className}`}
        aria-label="تواصل معنا عبر واتساب"
      >
        <FaWhatsapp 
          size={iconSize}
          color={iconColor}
        />
      </button>

      {isOpen && (
        <div className="whatsapp-popup-overlay">
          <div className="whatsapp-popup">
            <button 
              className="close-popup" 
              onClick={() => setIsOpen(false)}
              aria-label="إغلاق"
            >
              <FaTimes />
            </button>
            
            <h3>تواصل معنا عبر واتساب</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>رسالتك:</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>
              
              <button type="submit" className="send-btn">
                إرسال إلى واتساب
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default WhatsAppButton;