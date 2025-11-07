import React, { useState } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';
import './TeamSetup.css';

const TeamSetup = ({ onTeamReady, onBack, theme }) => {
  const [teamName, setTeamName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      onTeamReady(teamName.trim());
    }
  };

  return (
    <div className="team-setup">
      <Card className="team-setup-card">
        <Card.Header 
          className="team-setup-header"
          style={{ background: theme.gradient }}
        >
          <h2 className="text-white text-center mb-0">
            👥 Configuração da Equipe
          </h2>
        </Card.Header>
        
        <Card.Body className="team-setup-body">
          <div className="setup-content">
            <div className="instruction-text">
              <p>Escolha um nome criativo para sua equipe!</p>
              <p className="sub-instruction">O nome aparecerá durante todo o jogo.</p>
            </div>
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <InputGroup size="lg">
                  <InputGroup.Text>
                    <span className="input-icon">🏷️</span>
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Digite o nome da equipe..."
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    maxLength={30}
                    className="team-input"
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Máximo 30 caracteres
                </Form.Text>
              </Form.Group>
              
              <div className="button-group">
                <Button
                  type="submit"
                  size="lg"
                  className="start-btn"
                  disabled={!teamName.trim()}
                >
                  🚀 Começar Quiz
                </Button>
                
                <Button
                  variant="outline-secondary"
                  size="lg"
                  onClick={onBack}
                  className="back-btn"
                >
                  ← Voltar
                </Button>
              </div>
            </Form>
            
            <div className="tips-section">
              <h5>💡 Dicas para um bom nome:</h5>
              <ul>
                <li>Seja criativo e divertido</li>
                <li>Use emojis se quiser</li>
                <li>Evite nomes muito longos</li>
                <li>Represente bem sua equipe!</li>
              </ul>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default TeamSetup;