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
            <p>{language === 'ar' ? 'بيانات الحجز غير متوفرة حالياً' : 'Booking data is currently unavailable'}</p>
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

  // إضافة حالة جديدة للرسالة
  const [bookingStatus, setBookingStatus] = useState<{
    type: 'idle' | 'checking' | 'error' | 'success';
    message: string;
  }>({
    type: 'idle',
    message: ''
  });

  // النصوص المترجمة حسب اللغة
  const translations = {
    ar: {
      officeTitle: 'مكتب الكابتن أحمد جابر أشكناني',
      errorName: 'الرجاء إدخال الاسم',
      errorPhone: 'الرجاء إدخال رقم الهاتف',
      errorPhoneInvalid: 'رقم الهاتف غير صحيح',
      errorService: 'الرجاء اختيار نوع الاستشارة',
      errorDate: 'الرجاء اختيار التاريخ',
      errorDatePast: 'لا يمكن اختيار تاريخ سابق',
      errorTime: 'الرجاء اختيار الوقت',
      checkingAvailability: 'جاري التحقق من توفر الموعد...',
      slotBooked: 'الميعاد محجوز بالفعل، اختر وقت آخر.',
      bookingSuccess: 'تم فتح واتساب لإتمام الحجز.',
      whatsappMessage: (name: string, phone: string, serviceTitle: string, servicePrice: number, date: string, time: string) => 
        `مرحباً، أود حجز استشارة مع الكابتن أحمد جابر أشكناني\n\nالاسم: ${name}\nرقم الهاتف: ${phone}\nنوع الاستشارة: ${serviceTitle}\nالسعر: ${servicePrice} دينار كويتي\nالتاريخ: ${date}\nالوقت: ${time}`,
      whatsappButton: 'حجز عبر واتساب',
      mapPlaceholder: 'معلومات الخريطة غير متوفرة',
      selectService: 'اختر الاستشارة',
      selectTime: 'اختر الوقت',
      timeOptions: [
        { value: '10:00 صباحاً', label: '10:00 صباحاً' },
        { value: '11:00 صباحاً', label: '11:00 صباحاً' },
        { value: '12:00 ظهراً', label: '12:00 ظهراً' },
        { value: '5:00 مساءً', label: '5:00 مساءً' },
        { value: '6:00 مساءً', label: '6:00 مساءً' },
        { value: '7:00 مساءً', label: '7:00 مساءً' },
        { value: '8:00 مساءً', label: '8:00 مساءً' }
      ]
    },
    en: {
      officeTitle: 'Captain Ahmed Jaber Ashkanani Office',
      errorName: 'Please enter your name',
      errorPhone: 'Please enter your phone number',
      errorPhoneInvalid: 'Invalid phone number',
      errorService: 'Please select a consultation type',
      errorDate: 'Please select a date',
      errorDatePast: 'Cannot select a past date',
      errorTime: 'Please select a time',
      checkingAvailability: 'Checking appointment availability...',
      slotBooked: 'This time slot is already booked. Please choose another.',
      bookingSuccess: 'Opening WhatsApp to complete your booking.',
      whatsappMessage: (name: string, phone: string, serviceTitle: string, servicePrice: number, date: string, time: string) => 
        `Hello, I would like to book a consultation with Captain Ahmed Jaber Ashkanani\n\nName: ${name}\nPhone: ${phone}\nConsultation Type: ${serviceTitle}\nPrice: ${servicePrice} KWD\nDate: ${date}\nTime: ${time}`,
      whatsappButton: 'Book via WhatsApp',
      mapPlaceholder: 'Map information is unavailable',
      selectService: 'Select Consultation',
      selectTime: 'Select Time',
      timeOptions: [
        { value: '10:00 AM', label: '10:00 AM' },
        { value: '11:00 AM', label: '11:00 AM' },
        { value: '12:00 PM', label: '12:00 PM' },
        { value: '5:00 PM', label: '5:00 PM' },
        { value: '6:00 PM', label: '6:00 PM' },
        { value: '7:00 PM', label: '7:00 PM' },
        { value: '8:00 PM', label: '8:00 PM' }
      ]
    }
  };

  // الحصول على الترجمات حسب اللغة المحددة
  const t = translations[language];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // إعادة تعيين حالة الحجز عند تغيير أي حقل
    if (bookingStatus.type !== 'idle') {
      setBookingStatus({ type: 'idle', message: '' });
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', service: '', date: '', time: '' };
    
    if (!formData.name.trim()) {
      newErrors.name = t.errorName;
      isValid = false;
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = t.errorPhone;
      isValid = false;
    } else if (!/^\d{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t.errorPhoneInvalid;
      isValid = false;
    }
    
    if (!formData.service) {
      newErrors.service = t.errorService;
      isValid = false;
    }
    
    if (!formData.date) {
      newErrors.date = t.errorDate;
      isValid = false;
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = t.errorDatePast;
        isValid = false;
      }
    }
    
    if (!formData.time) {
      newErrors.time = t.errorTime;
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const createWhatsAppLink = () => {
    const phoneNumber = "96597131223";
    const selectedService = formData.service ? content.services.find(s => s.id === parseInt(formData.service)) : null;
    
    const message = t.whatsappMessage(
      formData.name,
      formData.phone,
      selectedService ? selectedService.title : '',
      selectedService ? selectedService.price : 0,
      formData.date,
      formData.time
    );
    
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // تعيين حالة التحقق من التوفر
    setBookingStatus({ type: 'checking', message: t.checkingAvailability });

    const selectedService = content.services.find(s => s.id === parseInt(formData.service));
    const startDateTime = new Date(`${formData.date}T${convertTo24Hour(formData.time)}`);
    const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // ساعة واحدة

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzLq275gc4b3_9dnQVDe2x6Yxt5G-DjPL-GqYiDRxtQ_XVFmij7R46IB7UnL2VPq6BvBg/exec', {
        method: 'POST',
        body: JSON.stringify({
          title: `موعد استشارة - ${formData.name}`,
          start: toKuwaitLocalISOString(startDateTime),
          end: toKuwaitLocalISOString(endDateTime),
        }),
      });

      const data = await response.json();
      if (data.available) {
        setBookingStatus({ type: 'success', message: t.bookingSuccess });
        window.open(createWhatsAppLink(), '_blank');
      } else {
        setBookingStatus({ type: 'error', message: t.slotBooked });
      }
    } catch (error) {
      setBookingStatus({ 
        type: 'error', 
        message: language === 'ar' 
          ? 'حدث خطأ أثناء التحقق من التوفر. يرجى المحاولة مرة أخرى.' 
          : 'An error occurred while checking availability. Please try again.'
      });
    }
  };

  function convertTo24Hour(timeStr: string) {
    // مثال: "5:00 مساءً" → "17:00"
    const isPM = timeStr.includes('مساء') || timeStr.toLowerCase().includes('pm');
    const [hour, minute] = timeStr.match(/\d+/g)!.map(Number);
    let h = hour;
    if (isPM && h < 12) h += 12;
    if (!isPM && h === 12) h = 0;
    return `${String(h).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  }
function toKuwaitLocalISOString(date: Date) {
  // نأخذ الوقت المحلي ونشكّله بصيغة YYYY-MM-DDTHH:mm:ss
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}
  // ✅ السماح فقط باختيار سبت إلى أربعاء
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const selectedDate = new Date(value);
    const day = selectedDate.getDay(); 
    // getDay(): الأحد=0، الإثنين=1، ... السبت=6

    // الأيام المسموح بها: السبت(6)، الأحد(0)، الإثنين(1)، الثلاثاء(2)، الأربعاء(3)
    const allowedDays = [6, 0, 1, 2, 3];

    if (!allowedDays.includes(day)) {
      // نرجع القيمة فاضية ونظهر رسالة خطأ
      setFormData(prev => ({ ...prev, date: '' }));
      setErrors(prev => ({
        ...prev,
        date: language === 'ar'
          ? 'يمكن الحجز فقط من السبت إلى الأربعاء'
          : 'Bookings are allowed only from Saturday to Wednesday'
      }));
    } else {
      // لو اليوم مسموح، نحفظه ونمسح أي أخطاء
      setFormData(prev => ({ ...prev, date: value }));
      setErrors(prev => ({ ...prev, date: '' }));
    }

    // إعادة تعيين حالة الحجز
    if (bookingStatus.type !== 'idle') {
      setBookingStatus({ type: 'idle', message: '' });
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
              <h3>{t.officeTitle}</h3>
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
                  <p>{t.mapPlaceholder}</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="booking-form-container">
            {/* عرض رسالة الحالة */}
            {bookingStatus.type !== 'idle' && (
              <div className={`booking-status ${bookingStatus.type}`}>
                <div className="status-message">
                  {bookingStatus.type === 'checking' && (
                    <div className="loading-spinner"></div>
                  )}
                  <p>{bookingStatus.message}</p>
                </div>
              </div>
            )}
            
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
                  <option value="">{t.selectService}</option>
                  {content.services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.title} - { 
                          !isNaN(service.price) 
                            ? `${service.price} ${language === 'ar' ? 'دينار كويتي' : 'KWD'}` 
                            : service.price
                        }
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
                    onChange={handleDateChange}
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
                    <option value="">{t.selectTime}</option>
                    {t.timeOptions.map((timeOption, index) => (
                      <option key={index} value={timeOption.value}>
                        {timeOption.label}
                      </option>
                    ))}
                  </select>
                  {errors.time && <span className="error-message">{errors.time}</span>}
                </div>
              </div>
              
              <div className="form-actions">
                <button 
                  type="submit" 
                  className="whatsapp-btn"
                  disabled={bookingStatus.type === 'checking'}
                >
                  <i className="fab fa-whatsapp"></i> {t.whatsappButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .booking-status {
          margin-bottom: 20px;
          padding: 15px;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .booking-status.checking {
          background-color: #e3f2fd;
          border-left: 4px solid #2196f3;
        }
        
        .booking-status.error {
          background-color: #ffebee;
          border-left: 4px solid #f44336;
        }
        
        .booking-status.success {
          background-color: #e8f5e9;
          border-left: 4px solid #4caf50;
        }
        
        .status-message {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(33, 150, 243, 0.3);
          border-radius: 50%;
          border-top-color: #2196f3;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .whatsapp-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </section>
  );
};

export default ConsultationBooking;