import React from 'react';
import { Card, Button, Row, Col, ProgressBar } from 'react-bootstrap';
import './ResultCard.css';

const ResultCard = ({ 
  correctAnswers, 
  totalWords, 
  theme, 
  onPlayAgain, 
  onRestart 
}) => {
  const percentage = Math.round((correctAnswers / totalWords) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { text: "🏆 Fantástico! Você é um expert!", color: "#48bb78", emoji: "🎉" };
    if (percentage >= 70) return { text: "🎉 Muito bem! Excelente conhecimento!", color: "#4299e1", emoji: "👏" };
    if (percentage >= 50) return { text: "😊 Bom trabalho! Continue aprendendo!", color: "#ed8936", emoji: "👍" };
    if (percentage >= 30) return { text: "🤔 Não foi mal! Há espaço para crescer!", color: "#f093fb", emoji: "💪" };
    return { text: "😅 Continue estudando! Você vai melhorar!", color: "#f56565", emoji: "📚" };
  };

  const performanceMessage = getPerformanceMessage();

  return (
    <div className="result-card-container">
      <Card className="result-card">
        <Card.Header className="result-header">
          <h2 className="result-title">
            🎯 Resultado Final
          </h2>
          <div className="theme-display">
            Tema: {theme}
          </div>
        </Card.Header>

        <Card.Body className="result-body">
          <div className="score-section">
            <div className="main-score">
              <div className="score-circle">
                <div className="score-percentage">{percentage}%</div>
                <div className="score-label">Conhecimento</div>
              </div>
            </div>
            
            <div className="stats-grid">
              <Row className="text-center g-3">
                <Col xs={6}>
                  <div className="stat-box correct-stat">
                    <div className="stat-icon">✅</div>
                    <div className="stat-number">{correctAnswers}</div>
                    <div className="stat-label">Acertos</div>
                  </div>
                </Col>
                <Col xs={6}>
                  <div className="stat-box incorrect-stat">
                    <div className="stat-icon">❌</div>
                    <div className="stat-number">{totalWords - correctAnswers}</div>
                    <div className="stat-label">Erros</div>
                  </div>
                </Col>
              </Row>
            </div>

            <div className="progress-section">
              <div className="progress-label">Seu Desempenho</div>
              <ProgressBar 
                now={percentage} 
                className="performance-bar"
                style={{ 
                  height: '25px',
                  background: performanceMessage.color + '20'
                }}
              />
              <div className="percentage-display">{percentage}%</div>
            </div>

            <div 
              className="performance-message"
              style={{ 
                background: `linear-gradient(135deg, ${performanceMessage.color}20 0%, ${performanceMessage.color}10 100%)`,
                borderLeft: `4px solid ${performanceMessage.color}`
              }}
            >
              <span className="performance-emoji">{performanceMessage.emoji}</span>
              <span className="performance-text">{performanceMessage.text}</span>
            </div>
          </div>

          <Row className="action-buttons g-3">
            <Col xs={12} sm={4}>
              <Button
                variant="primary"
                size="lg"
                className="action-btn play-again-btn"
                onClick={onPlayAgain}
              >
                🔄 Mesmas Palavras
              </Button>
            </Col>
            <Col xs={12} sm={4}>
              <Button
                variant="outline-primary"
                size="lg"
                className="action-btn new-words-btn"
                onClick={onRestart}
              >
                📝 Novas Palavras
              </Button>
            </Col>
            <Col xs={12} sm={4}>
              <Button
                variant="outline-secondary"
                size="lg"
                className="action-btn home-btn"
                onClick={onRestart}
              >
                🏠 Início
              </Button>
            </Col>
          </Row>

          <div className="share-section">
            <div className="share-title">🎉 Compartilhe seu resultado!</div>
            <div className="share-message">
              🧠 Acabei de testar meu conhecimento em "{theme}" e acertei {correctAnswers} de {totalWords} palavras! 
              {performanceMessage.emoji}
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ResultCard;