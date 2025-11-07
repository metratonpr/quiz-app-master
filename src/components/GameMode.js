import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './GameMode.css';

const GameMode = ({ onModeSelect, onBack }) => {
  const modes = [
    {
      id: 'solo',
      title: '🎮 Solo',
      description: 'Jogue sozinho e teste seus conhecimentos!',
      color: '#8B5CF6',
      gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)'
    },
    {
      id: 'team',
      title: '👥 Equipe',
      description: 'Jogue em equipe e compartilhe a diversão!',
      color: '#10B981',
      gradient: 'linear-gradient(135deg, #10B981 0%, #059669 100%)'
    }
  ];

  return (
    <div className="game-mode">
      <div className="text-center mb-4">
        <h2>
          <span className="emoji">🎯</span> Como você quer jogar?
        </h2>
        <p className="subtitle">Escolha o modo de jogo que preferir</p>
      </div>
      
      <Row className="justify-content-center g-4">
        {modes.map((mode) => (
          <Col key={mode.id} xs={12} sm={6} md={5}>
            <Card 
              className="mode-card"
              style={{ background: mode.gradient }}
              onClick={() => onModeSelect(mode.id)}
            >
              <Card.Body className="text-center text-white">
                <div className="mode-title">{mode.title}</div>
                <div className="mode-description">{mode.description}</div>
                <Button 
                  variant="light" 
                  size="lg" 
                  className="mode-button mt-3"
                >
                  Selecionar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <div className="text-center mt-4">
        <Button variant="outline-secondary" onClick={onBack}>
          <i className="bi bi-arrow-left"></i> Voltar aos Temas
        </Button>
      </div>
    </div>
  );
};

export default GameMode;