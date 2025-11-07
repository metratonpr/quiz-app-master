import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './ThemeSelector.css';

const ThemeSelector = ({ themes, onThemeSelect, selectedTheme }) => {
  return (
    <div className="theme-selector">
      <h2 className="text-center mb-4">
        <span className="emoji">🎯</span> Escolha seu tema!
      </h2>
      <Row className="g-3">
        {themes.map((theme) => (
          <Col key={theme.id} xs={12} sm={6} md={4} lg={3}>
            <Card 
              className={`theme-card ${selectedTheme?.id === theme.id ? 'selected' : ''}`}
              onClick={() => onThemeSelect(theme)}
              style={{ 
                background: theme.gradient,
                cursor: 'pointer',
                transform: selectedTheme?.id === theme.id ? 'scale(1.05)' : 'scale(1)',
                transition: 'all 0.3s ease'
              }}
            >
              <Card.Body className="text-center text-white">
                <div className="theme-name">
                  {theme.name}
                </div>
                <div className="theme-questions">
                  {theme.questions.length} perguntas
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ThemeSelector;