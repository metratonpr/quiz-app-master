import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar, Row, Col, Table } from 'react-bootstrap';
import './DuelCard.css';

const DuelCard = ({ 
  word, 
  currentWord, 
  totalWords, 
  theme, 
  players,
  currentPlayerIndex,
  turnBased,
  onAnswer,
  onBackToHome,
  timeLimit = 0
}) => {
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerActive, setTimerActive] = useState(timeLimit > 0);

  // Reset state when word changes
  useEffect(() => {
    setAnswered(false);
    setTimeLeft(timeLimit);
    setTimerActive(timeLimit > 0);
  }, [word, currentWord, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || answered || timeLimit === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          setAnswered(true);
          onAnswer(null, false); // Tempo esgotado
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, answered, timeLimit, onAnswer]);

  const handleAnswer = (playerIndex, isCorrect) => {
    if (answered) return;
    
    setAnswered(true);
    setTimerActive(false);
    onAnswer(playerIndex, isCorrect);
  };

  const progress = (currentWord / totalWords) * 100;
  const currentPlayer = players[currentPlayerIndex];
  return (
    <div className="duel-card-container-fullscreen">
      <div className="duel-header">
        <div className="theme-info">
          <div className="theme-badge">
            ⚔️ {theme} - Duelo
          </div>
        </div>
        <div className="header-controls">
          <Button
            variant="outline-light"
            size="sm"
            className="back-to-home-btn"
            onClick={onBackToHome}
          >
            🏠 Voltar ao Início
          </Button>
        </div>
      </div>      <ProgressBar 
        now={progress} 
        className="word-progress"
        variant="success"
      />

      <Card className="duel-card">        <Card.Header className="duel-card-header">
          <div className="word-counter">
            Palavra {currentWord} de {totalWords}
          </div>
          {turnBased && (
            <div className="current-turn">
              <strong>{currentPlayer.name}</strong>
            </div>
          )}
        </Card.Header><Card.Body className="duel-card-body">
          <div className="word-and-player-display">
            <div className="word-display">
              <h1 className="word-text">
                {word}
              </h1>
            </div>
            
            {/* Indicador de vez do jogador ao lado da palavra */}
            {turnBased && (
              <div className="player-turn-card-side">
                <div className="turn-icon">🔥</div>
                <div className="turn-text">É a vez de</div>
                <div className="turn-player-name">{currentPlayer.name}</div>
              </div>
            )}
          </div>

          {timeLimit > 0 && (
            <div className="timer-container">
              <div className={`timer-display ${timeLeft <= 5 ? 'timer-warning' : ''} ${timeLeft === 0 ? 'timer-expired' : ''}`}>
                <span className="timer-icon">⏱️</span>
                <span className="timer-text">
                  {timeLeft > 0 ? `${timeLeft}s` : 'Tempo esgotado!'}
                </span>
              </div>
              <ProgressBar 
                now={(timeLeft / timeLimit) * 100} 
                className="timer-progress"
                variant={timeLeft <= 5 ? 'danger' : 'warning'}
              />
            </div>          )}<div className="question-text">
            {!turnBased && 'Quem conhece esta palavra?'}
          </div>

          {turnBased ? (
            /* Modo por turnos - apenas botões certo/errado */
            <Row className="answer-buttons g-4">
              <Col xs={12} sm={6}>
                <Button
                  variant="success"
                  size="lg"
                  className={`answer-btn correct-btn ${answered ? 'disabled' : ''}`}
                  onClick={() => handleAnswer(currentPlayerIndex, true)}
                  disabled={answered}
                >
                  <span className="answer-icon">✓</span>
                  <span className="answer-text">ACERTO</span>
                </Button>
              </Col>
              <Col xs={12} sm={6}>
                <Button
                  variant="danger"
                  size="lg"
                  className={`answer-btn incorrect-btn ${answered ? 'disabled' : ''}`}
                  onClick={() => handleAnswer(currentPlayerIndex, false)}
                  disabled={answered}
                >
                  <span className="answer-icon">✗</span>
                  <span className="answer-text">NÃO ACERTOU</span>
                </Button>
              </Col>
            </Row>
          ) : (
            /* Modo livre - botão para cada jogador */
            <Row className="player-buttons g-4">
              {players.map((player, index) => (
                <Col key={index} xs={12} sm={6}>
                  <Button
                    variant="primary"
                    size="lg"
                    className={`player-btn ${answered ? 'disabled' : ''}`}
                    onClick={() => handleAnswer(index, true)}
                    disabled={answered}
                    style={{
                      background: `linear-gradient(135deg, ${index === 0 ? '#4299e1' : '#48bb78'} 0%, ${index === 0 ? '#3182ce' : '#38a169'} 100%)`
                    }}
                  >
                    <span className="player-btn-icon">🏆</span>
                    <span className="player-btn-text">{player.name} ACERTOU</span>
                  </Button>
                </Col>
              ))}
              <Col xs={12}>
                <Button
                  variant="outline-secondary"
                  size="lg"
                  className={`nobody-btn ${answered ? 'disabled' : ''}`}
                  onClick={() => handleAnswer(null, false)}
                  disabled={answered}
                >
                  <span className="answer-icon">❌</span>
                  <span className="answer-text">NINGUÉM ACERTOU</span>
                </Button>
              </Col>
            </Row>          )}

          {/* Scoreboard movido para baixo dos botões */}
          {players.length <= 2 ? (
            /* Para 2 jogadores - cards lado a lado */
            <Row className="scoreboard-bottom mt-4">
              {players.map((player, index) => (
                <Col key={index} xs={6}>
                  <div className={`player-score-bottom ${currentPlayerIndex === index ? 'active-player' : ''}`}>
                    <div className="player-name">{player.name}</div>
                    <div className="player-points">{player.score}</div>
                    <div className="player-label">pontos</div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : (
            /* Para mais de 2 jogadores - tabela */
            <div className="scoreboard-table mt-4">
              <h5 className="scoreboard-title">📊 Placar Atual</h5>
              <table className="players-table">
                <thead>
                  <tr>
                    <th>Posição</th>
                    <th>Jogador</th>
                    <th>Pontos</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[...players]
                    .sort((a, b) => b.score - a.score)
                    .map((player, index) => {
                      const originalIndex = players.findIndex(p => p.name === player.name);
                      return (
                        <tr 
                          key={originalIndex} 
                          className={currentPlayerIndex === originalIndex ? 'active-row' : ''}
                        >
                          <td className="position-cell">
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`}
                          </td>
                          <td className="player-cell">{player.name}</td>
                          <td className="score-cell">{player.score}</td>
                          <td className="status-cell">
                            {currentPlayerIndex === originalIndex ? (
                              <span className="playing-badge">🔥 Jogando</span>
                            ) : (
                              <span className="waiting-badge">⏳ Aguardando</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          {answered && (
            <div className="feedback-message">
              <div className="next-word-info">
                {timeLeft === 0 ? (
                  <>⏰ Tempo esgotado! Próxima palavra em instantes...</>
                ) : (
                  <>⏳ Próxima palavra em instantes...</>
                )}
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DuelCard;
