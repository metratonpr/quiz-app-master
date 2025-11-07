import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import './WordCard.css';

const WordCard = ({ 
  word, 
  currentWord, 
  totalWords, 
  theme, 
  correctAnswers, 
  onAnswer,
  timeLimit = 0,
  onBackToHome,
  autoAdvance = false
}) => {
  const [answered, setAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [timerActive, setTimerActive] = useState(timeLimit > 0);
  const [showNextButton, setShowNextButton] = useState(false);

  // Reset answered state when word changes
  useEffect(() => {
    setAnswered(false);
    setTimeLeft(timeLimit);
    setTimerActive(timeLimit > 0);
    setShowNextButton(false);
  }, [word, currentWord, timeLimit]);

  // Timer effect
  useEffect(() => {
    if (!timerActive || answered || timeLimit === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Tempo esgotado - não pontua e passa para próxima
          setAnswered(true);
          onAnswer(false); // Considera como erro/não sabe
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, answered, timeLimit, onAnswer]);

  const handleAnswer = (isCorrect) => {
    if (answered) return;
    
    setAnswered(true);
    setTimerActive(false);
    
    if (autoAdvance) {
      // Avanço automático após 2 segundos
      setTimeout(() => {
        onAnswer(isCorrect);
      }, 2000);
    } else {
      // Modo manual - mostra botão "Avançar"
      setShowNextButton(true);
    }
  };

  const handleNextWord = () => {
    onAnswer(false); // Chama onAnswer para avançar
  };

  const progress = (currentWord / totalWords) * 100;

  return (
    <div className="word-card-container">
      <div className="word-header">
        <div className="theme-info">
          <div className="theme-badge">
            📚 {theme}
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
        <div className="score-info">
          <span className="score-text">Acertos: </span>
          <span className="score-number">{correctAnswers}</span>
        </div>
      </div>

      <ProgressBar 
        now={progress} 
        className="word-progress"
        variant="success"
      />

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
        </div>
      )}

      <Card className="word-card">
        <Card.Header className="word-card-header">
          <div className="word-counter">
            Palavra {currentWord} de {totalWords}
          </div>
        </Card.Header>

        <Card.Body className="word-card-body">
          <div className="word-display">
            <h1 className="word-text">
              {word}
            </h1>
          </div>

          <div className="question-text">
            Você conhece esta palavra?
          </div>

          <Row className="answer-buttons g-4">
            <Col xs={12} sm={6}>
              <Button
                variant="success"
                size="lg"
                className={`answer-btn correct-btn ${answered ? 'disabled' : ''}`}
                onClick={() => handleAnswer(true)}
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
                onClick={() => handleAnswer(false)}
                disabled={answered}
              >
                <span className="answer-icon">✗</span>
                <span className="answer-text">NÃO SEI</span>
              </Button>
            </Col>
          </Row>

          {answered && (
            <div className="feedback-message">
              {autoAdvance ? (
                <div className="next-word-info">
                  {timeLeft === 0 ? (
                    <>⏰ Tempo esgotado! Próxima palavra em instantes...</>
                  ) : (
                    <>⏳ Próxima palavra em instantes...</>
                  )}
                </div>
              ) : showNextButton ? (
                <div className="manual-advance">
                  <Button
                    variant="primary"
                    size="lg"
                    className="advance-btn"
                    onClick={handleNextWord}
                  >
                    <span className="advance-icon">⏭️</span>
                    <span className="advance-text">AVANÇAR</span>
                  </Button>
                </div>
              ) : (
                <div className="answer-recorded">
                  ✓ Resposta registrada
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default WordCard;