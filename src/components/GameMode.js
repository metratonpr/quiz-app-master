import React, { useState } from 'react';
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import './GameMode.css';

const GameMode = ({ onModeSelect }) => {
  const [selectedMode, setSelectedMode] = useState('solo');
  const [players, setPlayers] = useState([
    { id: 1, name: '' },
    { id: 2, name: '' }
  ]);
  const [turnBased, setTurnBased] = useState(true);

  const addPlayer = () => {
    const newId = Math.max(...players.map(p => p.id)) + 1;
    setPlayers([...players, { id: newId, name: '' }]);
  };

  const removePlayer = (id) => {
    if (players.length > 2) {
      setPlayers(players.filter(p => p.id !== id));
    }
  };

  const updatePlayerName = (id, name) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, name } : p
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (selectedMode === 'solo') {
      onModeSelect({
        mode: 'solo',
        turnBased: false,
        players: []
      });
    } else {
      const validPlayers = players.filter(p => p.name.trim());
      
      if (validPlayers.length < 2) {
        alert('Por favor, digite pelo menos 2 nomes de jogadores!');
        return;
      }
      
      onModeSelect({
        mode: 'duelo',
        turnBased,
        players: validPlayers.map(p => ({ name: p.name.trim(), score: 0 }))
      });
    }
  };

  return (
    <div className="game-mode-container">
      <Card className="game-mode-card">
        <Card.Header className="game-mode-header">
          <h2 className="mode-title">
            🎮 Modo de Jogo
          </h2>
          <p className="mode-subtitle">Escolha como você quer jogar!</p>
        </Card.Header>

        <Card.Body className="game-mode-body">
          <Form onSubmit={handleSubmit}>
            <Row className="mode-selection mb-4">
              <Col xs={12} md={6}>
                <div 
                  className={`mode-option ${selectedMode === 'solo' ? 'selected' : ''}`}
                  onClick={() => setSelectedMode('solo')}
                >
                  <div className="mode-icon">🧠</div>
                  <h4>Solo</h4>
                  <p>Teste seu conhecimento individualmente</p>
                </div>
              </Col>
              <Col xs={12} md={6}>
                <div 
                  className={`mode-option ${selectedMode === 'duelo' ? 'selected' : ''}`}
                  onClick={() => setSelectedMode('duelo')}
                >
                  <div className="mode-icon">⚔️</div>
                  <h4>Duelo</h4>
                  <p>Desafie um amigo em uma competição</p>
                </div>
              </Col>
            </Row>

            {selectedMode === 'duelo' && (
              <div className="duelo-settings">
                <div className="players-section mb-4">
                  <div className="section-header">
                    <h5 className="section-title">👥 Jogadores</h5>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={addPlayer}
                      className="add-player-btn"
                    >
                      ➕ Adicionar Jogador
                    </Button>
                  </div>
                  
                  <Row className="g-3">
                    {players.map((player, index) => (
                      <Col key={player.id} xs={12} md={6} lg={4}>
                        <div className="player-card">
                          <div className="player-header">
                            <span className="player-number">Jogador {index + 1}</span>
                            {players.length > 2 && (
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => removePlayer(player.id)}
                                className="remove-btn"
                              >
                                ❌
                              </Button>
                            )}
                          </div>
                          <Form.Control
                            type="text"
                            placeholder={`Nome do jogador ${index + 1}`}
                            value={player.name}
                            onChange={(e) => updatePlayerName(player.id, e.target.value)}
                            className="player-input"
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </div>

                <Row className="turn-settings mb-4">
                  <Col>
                    <Form.Check
                      type="checkbox"
                      id="turn-based"
                      label="🔄 Jogo por turnos (cada jogador responde uma pergunta por vez)"
                      checked={turnBased}
                      onChange={(e) => setTurnBased(e.target.checked)}
                      className="turn-checkbox"
                    />
                    <div className="turn-explanation">
                      {turnBased ? (
                        <small className="text-muted">
                          ⏳ Os jogadores se alternarão a cada pergunta
                        </small>
                      ) : (
                        <small className="text-muted">
                          🏃‍♂️ Ambos os jogadores podem responder cada pergunta
                        </small>
                      )}
                    </div>
                  </Col>
                </Row>
              </div>
            )}

            <div className="mode-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="start-game-btn"
              >
                🚀 Iniciar Jogo
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameMode;