import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Contact = ({ content }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Form submitted! (demo)');
    };
    
    return (
        <section id="contact" className="section">
            <div className="container">
                <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
                <div className="contact-grid">
                    <div className="contact-details">
                        <p><FaMapMarkerAlt /> {content.info.address}</p>
                        <p><FaPhone /> {content.info.phone}</p>
                        <p><FaEnvelope /> {content.info.email}</p>
                        <div className="social-links">
                            <a href="#" aria-label="Instagram"><FaInstagram /></a>
                            <a href="#" aria-label="Twitter"><FaTwitter /></a>
                            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
                        </div>
                         <div className="map-container">
                            <iframe
                                src={content.mapEmbedUrl}
                                // FIX: The allowFullScreen attribute for an iframe in React/JSX should be a boolean. Setting it to `""` causes a type error.
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                    <div className="contact-form-container">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <input type="text" placeholder={content.form.name} required />
                            </div>
                            <div className="form-group">
                                <input type="email" placeholder={content.form.email} required />
                            </div>
                            <div className="form-group">
                                <textarea rows={6} placeholder={content.form.message} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">{content.form.submit}</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;