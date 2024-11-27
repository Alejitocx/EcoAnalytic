import React, { useState } from 'react';
import '../styles/Card.css';  // Asegúrate de tener este archivo con los estilos apropiados.

interface CardProps {
  img: string;
  title: string;
  summary: string;
  details: React.ReactNode; 
}

const Card: React.FC<CardProps> = ({ img, title, summary, details }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`card ${isExpanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
      <img className="card-img" src={img} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{summary}</p>
        {isExpanded && (
          <div className="expanded-content">
            <p>{details}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
