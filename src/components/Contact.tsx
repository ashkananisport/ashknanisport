import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = ({ content }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Form submitted! (demo)');
        setFormData({ name: '', email: '', message: '' });
    };
    
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
                <div className="contact-grid">
                    <div className="contact-details">
                        <div className="contact-info">
                            <p><FaMapMarkerAlt /> {content.info.address}</p>
                            <p><FaPhone /> {content.info.phone}</p>
                            <p><FaEnvelope /> {content.info.email}</p>
                        </div>
                        
                        <div className="map-container">
                            <iframe
                                src={content.mapEmbedUrl}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                style={{ 
                                    border: 0, 
                                    width: '100%', 
                                    height: '300px',
                                    borderRadius: '8px'
                                }}
                                title={`Ashkanani Sport Location - ${content.info.address}`}
                                aria-label={`Map showing location of Ashkanani Sport at ${content.info.address}`}
                            ></iframe>
                        </div>
                    </div>
                    
                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={content.form.name} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <input 
                                    type="email" 
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={content.form.email} 
                                    required 
                                />
                            </div>
                            <div className="form-group">
                                <textarea 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={6} 
                                    placeholder={content.form.message} 
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                {content.form.submit}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;