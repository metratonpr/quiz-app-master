import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import JsonInput from './components/JsonInput';
import WordCard from './components/WordCard';
import ResultCard from './components/ResultCard';
import Settings from './components/Settings';
import { useSound } from './hooks/useSound';

function App() {
  const [gameState, setGameState] = useState('json-input'); // json-input, playing, finished
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [theme, setTheme] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    soundEnabled: true,
    animationsEnabled: true,
    visualTheme: 'default',
    timeLimit: 30 // tempo limite em segundos, 0 = sem limite
  });

  const { playCorrectSound, playIncorrectSound, playClickSound } = useSound();

  // Aplicar tema visual
  useEffect(() => {
    const themeGradients = {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      sunset: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      ocean: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      forest: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    };
    
    document.body.style.background = themeGradients[settings.visualTheme];
  }, [settings.visualTheme]);

  // Função para embaralhar array
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Processar JSON e iniciar jogo
  const handleJsonSubmit = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.theme && data.words && Array.isArray(data.words)) {
        const shuffledWords = shuffleArray(data.words).slice(0, 10);
        setTheme(data.theme);
        setWords(shuffledWords);
        setCurrentWordIndex(0);
        setCorrectAnswers(0);
        setGameState('playing');
        
        if (settings.soundEnabled) playClickSound();
      } else {
        alert('JSON inválido! Certifique-se de ter as propriedades "theme" e "words".');
      }
    } catch (error) {
      alert('Erro ao processar JSON: ' + error.message);
    }
  };

  // Responder palavra
  const handleAnswer = (isCorrect) => {
    if (settings.soundEnabled) {
      if (isCorrect) {
        playCorrectSound();
        setCorrectAnswers(correctAnswers + 1);
      } else {
        playIncorrectSound();
      }
    } else {
      if (isCorrect) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }

    // Próxima palavra ou fim do jogo
    setTimeout(() => {
      if (currentWordIndex + 1 < words.length) {
        setCurrentWordIndex(currentWordIndex + 1);
      } else {
        setGameState('finished');
      }
    }, 1500);
  };

  // Reiniciar jogo
  const handleRestart = () => {
    if (settings.soundEnabled) playClickSound();
    setGameState('json-input');
    setWords([]);
    setTheme('');
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
  };

  // Jogar novamente com as mesmas palavras
  const handlePlayAgain = () => {
    if (settings.soundEnabled) playClickSound();
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setGameState('playing');
  };

  // Abrir configurações
  const handleOpenSettings = () => {
    if (settings.soundEnabled) playClickSound();
    setShowSettings(true);
  };

  return (
    <div className="App">
      <Container fluid className="app-container">
        <header className="app-header">
          <div className="header-top">
            <Button
              variant="outline-light"
              className="settings-btn"
              onClick={handleOpenSettings}
            >
              ⚙️
            </Button>
          </div>
          <h1 className="app-title">
            <span className="title-emoji">📚</span>
            Teste de Vocabulário
            <span className="title-emoji">🧠</span>
          </h1>
          <p className="app-subtitle">Descubra quantas palavras você conhece!</p>
        </header>

        <main className="app-main">
          {gameState === 'json-input' && (
            <JsonInput onJsonSubmit={handleJsonSubmit} />
          )}

          {gameState === 'playing' && words.length > 0 && (
            <WordCard
              word={words[currentWordIndex]}
              currentWord={currentWordIndex + 1}
              totalWords={words.length}
              theme={theme}
              correctAnswers={correctAnswers}
              onAnswer={handleAnswer}
              timeLimit={settings.timeLimit}
              onBackToHome={handleRestart}
            />
          )}

          {gameState === 'finished' && (
            <ResultCard
              correctAnswers={correctAnswers}
              totalWords={words.length}
              theme={theme}
              onPlayAgain={handlePlayAgain}
              onRestart={handleRestart}
            />
          )}
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Teste de Vocabulário - Expandindo seu conhecimento! 📚✨</p>
        </footer>

        <Settings
          show={showSettings}
          onHide={() => setShowSettings(false)}
          settings={settings}
          onSettingsChange={setSettings}
        />
      </Container>
    </div>
  );
}

export default App;
