import React from 'react';
import { FaFilePdf, FaFileAlt } from 'react-icons/fa';

const iconMap = {
    FaFilePdf: <FaFilePdf />,
    FaFileAlt: <FaFileAlt />
};

const Documents = ({ content }) => (
    <section id="documents" className="section" style={{backgroundColor: 'var(--primary-color)'}}>
        <div className="container">
            <h2 className="section-title">{content.title_part1} <span>{content.title_part2}</span></h2>
            <div className="documents-list">
                {content.list.map((doc, index) => (
                    <div key={index} className="document-item">
                        <div className="document-info">
                           <span className="doc-icon">{iconMap[doc.icon]}</span>
                           <h3>{doc.title}</h3>
                        </div>
                        <a href={doc.fileUrl} className="btn btn-secondary" download>Download</a>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Documents;
