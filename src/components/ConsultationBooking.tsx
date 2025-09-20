// src/components/ConsultationBooking.tsx
import React, { useState } from 'react';
import { Language } from '../types';

interface ConsultationBookingProps {
  content: {
    title: string;
    description: string;
    services: Array<{
      id: number;
      title: string;
      price: number;
      description: string;
    }>;
    workingHours: string;
    workingDays: string;
    form: {
      name: string;
      phone: string;
      service: string;
      date: string;
      time: string;
      submit: string;
    };
    contact: {
      address: string;
      phone: number;
      email: string;
      mapEmbedUrl: string;
    };
  };
  language: Language;
}

const ConsultationBooking: React.FC<ConsultationBookingProps> = ({ content, language }) => {
  
  // فحص أمان أولي
  if (!content || !content.contact) {
    return (
      <div className="consultation-booking">
        <div className="container">
          <div className="error-message">
            <p>بيانات الحجز غير متوفرة حالياً</p>
          </div>
        </div>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', service: '', date: '', time: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم';
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الهاتف';
      isValid = false;
    } else if (!/^\d{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الهاتف غير صحيح';
      isValid = false;
    }
    
    if (!formData.service) {
      newErrors.service = 'الرجاء اختيار نوع الاستشارة';
      isValid = false;
    }
    
    if (!formData.date) {
      newErrors.date = 'الرجاء اختيار التاريخ';
      isValid = false;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'لا يمكن اختيار تاريخ سابق';
        isValid = false;
      }
    }
    
    if (!formData.time) {
      newErrors.time = 'الرجاء اختيار الوقت';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const createWhatsAppLink = () => {
    const phoneNumber = "96597131223";
    const selectedService = formData.service ? content.services.find(s => s.id === parseInt(formData.service)) : null;
    
    const message = `مرحباً، أود حجز استشارة مع الكابتن أحمد جابر أشكناني\n\nالاسم: ${formData.name}\nرقم الهاتف: ${formData.phone}\nنوع الاستشارة: ${selectedService ? selectedService.title : ''}\nالسعر: ${selectedService ? selectedService.price + ' دينار كويتي' : ''}\nالتاريخ: ${formData.date}\nالوقت: ${formData.time}`;
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      window.open(createWhatsAppLink(), '_blank');
    }
  };

  return (
    <section className="section consultation-booking" id="consultation-booking">
      <div className="container">
        <h2 className="section-title">{content.title}</h2>
        <p className="section-description">{content.description}</p>
        
        <div className="consultation-container">
          <div className="consultation-info">
            <div className="office-info">
              <h3>مكتب الكابتن أحمد جابر أشكناني</h3>
              <p>{content.workingDays}</p>
              <p>{content.workingHours}</p>
            </div>
            <div className="map-container">
              {content.contact?.mapEmbedUrl ? (
                <iframe
                  src={content.contact.mapEmbedUrl}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  style={{ 
                    border: 0, 
                    width: '100%', 
                    height: '300px',
                    borderRadius: '8px'
                  }}
                  title={`Ashkanani Sport Location - ${content.contact?.address || ''}`}
                  aria-label={`Map showing location of Ashkanani Sport at ${content.contact?.address || ''}`}
                ></iframe>
              ) : (
                <div className="map-placeholder">
                  <p>معلومات الخريطة غير متوفرة</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="booking-form-container">
            <form onSubmit={handleWhatsAppSubmit} className="booking-form">
              <div className="form-group">
                <label htmlFor="name">{content.form.name}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">{content.form.phone}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                  required
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="service">{content.form.service}</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={errors.service ? 'error' : ''}
                  required
                >
                  <option value="">اختر الاستشارة</option>
                  {content.services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title} - {service.price} دينار كويتي
                    </option>
                  ))}
                </select>
                {errors.service && <span className="error-message">{errors.service}</span>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">{content.form.date}</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={errors.date ? 'error' : ''}
                    required
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="time">{content.form.time}</label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={errors.time ? 'error' : ''}
                    required
                  >
                    <option value="">اختر الوقت</option>
                    <option value="17:00">5:00 م</option>
                    <option value="17:30">5:30 م</option>
                    <option value="18:00">6:00 م</option>
                    <option value="18:30">6:30 م</option>
                    <option value="19:00">7:00 م</option>
                    <option value="19:30">7:30 م</option>
                    <option value="20:00">8:00 م</option>
                  </select>
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>
              
              <div className="form-actions">
                <button type="submit" className="whatsapp-btn">
                  <i className="fab fa-whatsapp"></i> حجز عبر واتساب
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationBooking;