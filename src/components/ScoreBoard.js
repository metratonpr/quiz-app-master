import React from 'react';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import './ScoreBoard.css';

const ScoreBoard = ({ 
  score, 
  totalQuestions, 
  correctAnswers, 
  theme, 
  gameMode, 
  teamName, 
  onPlayAgain, 
  onNewTheme 
}) => {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 80) return { text: "🏆 Incrível! Você é um expert!", color: "#48bb78" };
    if (percentage >= 60) return { text: "🎉 Muito bem! Bom conhecimento!", color: "#4299e1" };
    if (percentage >= 40) return { text: "😊 Legal! Pode melhorar ainda!", color: "#ed8936" };
    return { text: "😅 Não desista! Tente novamente!", color: "#f56565" };
  };

  const performanceMessage = getPerformanceMessage();

  return (
    <div className="scoreboard-container">
      <Card className="scoreboard-card">
        <Card.Header 
          className="scoreboard-header"
          style={{ background: theme.gradient }}
        >
          <h2 className="text-white text-center mb-0">
            🎯 Resultado Final
          </h2>
          {gameMode === 'team' && teamName && (
            <div className="team-result">Equipe: {teamName}</div>
          )}
        </Card.Header>

        <Card.Body className="scoreboard-body">
          <div className="score-section">
            <div className="final-score">
              <span className="score-label">Pontuação Final</span>
              <span className="score-value">{score}</span>
            </div>
            
            <div className="stats-row">
              <Row className="text-center g-3">
                <Col xs={4}>
                  <div className="stat-item">
                    <div className="stat-number">{correctAnswers}</div>
                    <div className="stat-label">Acertos</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="stat-item">
                    <div className="stat-number">{totalQuestions - correctAnswers}</div>
                    <div className="stat-label">Erros</div>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className="stat-item">
                    <div className="stat-number">{percentage}%</div>
                    <div className="stat-label">Aproveitamento</div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="progress-section">
              <div className="progress-label">Desempenho</div>
              <ProgressBar 
                now={percentage} 
                className="performance-bar"
                style={{ height: '20px' }}
              />
            </div>

            <div 
              className="performance-message"
              style={{ color: performanceMessage.color }}
            >
              {performanceMessage.text}
            </div>
          </div>

          <div className="theme-info">
            <div className="theme-badge" style={{ background: theme.gradient }}>
              Tema: {theme.name}
            </div>
          </div>

          <Row className="action-buttons g-3">
            <Col xs={12} sm={6}>
              <Button
                variant="primary"
                size="lg"
                className="action-btn play-again-btn"
                onClick={onPlayAgain}
              >
                🔄 Jogar Novamente
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                variant="outline-primary"
                size="lg"
                className="action-btn new-theme-btn"
                onClick={onNewTheme}
              >
                🎯 Novo Tema
              </Button>
            </Col>
          </Row>

          <div className="share-section">
            <p className="share-text">Compartilhe seu resultado!</p>
            <div className="share-message">
              🎮 Acabei de fazer {score} pontos no Quiz {theme.name}! 
              {percentage >= 80 ? " 🏆" : percentage >= 60 ? " 🎉" : " 😊"}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ScoreBoard;