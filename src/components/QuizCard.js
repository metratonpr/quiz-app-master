import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar, Row, Col } from 'react-bootstrap';
import './QuizCard.css';

const QuizCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onAnswer, 
  score,
  theme,
  gameMode,
  teamName,
  timerEnabled = true,
  timerDuration = 15
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timerDuration);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(timerDuration);
  }, [question, timerDuration]);

  useEffect(() => {
    if (timerEnabled && timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timerEnabled && timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, showResult, timerEnabled]);

  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    
    setTimeout(() => {
      onAnswer(answer);
    }, 2000);
  };

  const progress = (currentQuestion / totalQuestions) * 100;
  const isCorrect = selectedAnswer === question.answer;

  return (
    <div className="quiz-card-container">
      <div className="quiz-header">
        <div className="quiz-info">
          <div className="theme-badge" style={{ background: theme.gradient }}>
            {theme.name}
          </div>
          {gameMode === 'team' && teamName && (
            <div className="team-name">Equipe: {teamName}</div>
          )}
        </div>
        <div className="score-display">
          Pontuação: <span className="score-number">{score}</span>
        </div>
      </div>

      <ProgressBar 
        now={progress} 
        className="quiz-progress"
        variant="info"
      />

      <Card className="quiz-card" style={{ borderTop: `4px solid ${theme.color}` }}>
        <Card.Header className="quiz-card-header">
          <div className="question-counter">
            Pergunta {currentQuestion} de {totalQuestions}
          </div>
          {timerEnabled && (
            <div className="timer">
              <span className={`timer-text ${timeLeft <= 5 ? 'urgent' : ''}`}>
                ⏱️ {timeLeft}s
              </span>
            </div>
          )}
        </Card.Header>

        <Card.Body className="quiz-card-body">
          <h3 className="question-text">
            {question.question}
          </h3>

          <Row className="answer-buttons g-3">
            <Col xs={12} sm={6}>
              <Button
                variant={showResult ? (question.answer === true ? 'success' : 'outline-success') : 'outline-primary'}
                size="lg"
                className={`answer-btn ${selectedAnswer === true ? 'selected' : ''} ${
                  showResult && selectedAnswer === true && !isCorrect ? 'wrong' : ''
                }`}
                onClick={() => handleAnswer(true)}
                disabled={showResult}
              >
                <span className="answer-icon">✓</span>
                VERDADEIRO
              </Button>
            </Col>
            <Col xs={12} sm={6}>
              <Button
                variant={showResult ? (question.answer === false ? 'success' : 'outline-success') : 'outline-danger'}
                size="lg"
                className={`answer-btn ${selectedAnswer === false ? 'selected' : ''} ${
                  showResult && selectedAnswer === false && !isCorrect ? 'wrong' : ''
                }`}
                onClick={() => handleAnswer(false)}
                disabled={showResult}
              >
                <span className="answer-icon">✗</span>
                FALSO
              </Button>
            </Col>
          </Row>

          {showResult && (
            <div className={`result-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
              {selectedAnswer === null ? (
                <div className="timeout-message">
                  {timerEnabled ? (
                    <>⏰ Tempo esgotado! A resposta correta era: {question.answer ? 'VERDADEIRO' : 'FALSO'}</>
                  ) : (
                    <>🤔 Não respondeu! A resposta correta era: {question.answer ? 'VERDADEIRO' : 'FALSO'}</>
                  )}
                </div>
              ) : isCorrect ? (
                <div className="correct-message">
                  🎉 Correto! +10 pontos
                </div>
              ) : (
                <div className="incorrect-message">
                  😔 Incorreto! A resposta correta era: {question.answer ? 'VERDADEIRO' : 'FALSO'}
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default QuizCard;