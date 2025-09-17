// src/components/AgentBenefits.tsx

import React from 'react';
import { AgentBenefitsContent } from '../types';
import { FaHandshake, FaShieldAlt, FaChartLine, FaGlobe, FaMoneyBillWave, FaUserFriends } from 'react-icons/fa';
interface AgentBenefitsProps {
  content: AgentBenefitsContent;
}
const iconMap = {
  'FaHandshake': <FaHandshake />,
  'FaShieldAlt': <FaShieldAlt />,
  'FaChartLine': <FaChartLine />,
  'FaGlobe': <FaGlobe />,
  'FaMoneyBillWave': <FaMoneyBillWave />,
  'FaUserFriends': <FaUserFriends />
};
const AgentBenefits: React.FC<AgentBenefitsProps> = ({ content }) => {
  return (
    <section className="section agent-benefits" id="agent-benefits">
      <div className="container">
        <h2 className="section-title">
          {content.title} <span>{content.highlight}</span>
        </h2>
        
        <p className="section-description">
          {content.description}
        </p>
        
        <div className="benefits-grid">
          {content.benefits.map((benefit, index) => (
            <div key={index} className="benefit-card">
              <div className="benefit-icon">
                {iconMap[benefit.icon] || <FaHandshake />}
              </div>
              <h3>{benefit.itemtitle}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentBenefits;