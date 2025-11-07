import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import JsonInput from './components/JsonInput';
import GameMode from './components/GameMode';
import WordCard from './components/WordCard';
import DuelCard from './components/DuelCard';
import ResultCard from './components/ResultCard';
import Settings from './components/Settings';
import { useSound } from './hooks/useSound';

function App() {
  const [gameState, setGameState] = useState('json-input'); // json-input, mode-selection, playing, finished
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [theme, setTheme] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // Game mode states
  const [gameMode, setGameMode] = useState(null); // { mode: 'solo'|'duelo', turnBased: boolean, players: [] }
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  
  const [settings, setSettings] = useState({
    soundEnabled: true,
    animationsEnabled: true,
    visualTheme: 'default',
    timeLimit: 30, // tempo limite em segundos, 0 = sem limite
    autoAdvance: false // avanço automático para próxima palavra
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

  // Processar JSON e ir para seleção de modo
  const handleJsonSubmit = (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      if (data.theme && data.words && Array.isArray(data.words)) {
        const shuffledWords = shuffleArray(data.words).slice(0, 10);
        setTheme(data.theme);
        setWords(shuffledWords);
        setCurrentWordIndex(0);
        setCorrectAnswers(0);
        setGameState('mode-selection');
        
        if (settings.soundEnabled) playClickSound();
      } else {
        alert('JSON inválido! Certifique-se de ter as propriedades "theme" e "words".');
      }
    } catch (error) {
      alert('Erro ao processar JSON: ' + error.message);
    }
  };

  // Selecionar modo de jogo
  const handleModeSelect = (selectedMode) => {
    setGameMode(selectedMode);
    setCurrentPlayerIndex(0);
    
    // Resetar scores se for duelo
    if (selectedMode.mode === 'duelo') {
      selectedMode.players.forEach(player => player.score = 0);
    }
    
    setGameState('playing');
    if (settings.soundEnabled) playClickSound();
  };

  // Responder palavra (modo solo)
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

  // Responder palavra (modo duelo)
  const handleDuelAnswer = (playerIndex, isCorrect) => {
    if (settings.soundEnabled) {
      if (isCorrect && playerIndex !== null) {
        playCorrectSound();
      } else {
        playIncorrectSound();
      }
    }

    // Atualizar score do jogador que acertou
    if (isCorrect && playerIndex !== null && gameMode.players[playerIndex]) {
      const updatedPlayers = [...gameMode.players];
      updatedPlayers[playerIndex].score += 1;
      setGameMode({ ...gameMode, players: updatedPlayers });
    }

    // Próximo turno se for modo por turnos
    if (gameMode.turnBased) {
      setCurrentPlayerIndex((prevIndex) => 
        (prevIndex + 1) % gameMode.players.length
      );
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
    setGameMode(null);
    setCurrentPlayerIndex(0);
  };

  // Jogar novamente com as mesmas palavras
  const handlePlayAgain = () => {
    if (settings.soundEnabled) playClickSound();
    setCurrentWordIndex(0);
    setCorrectAnswers(0);
    setCurrentPlayerIndex(0);
    
    // Resetar scores se for duelo
    if (gameMode && gameMode.mode === 'duelo') {
      const resetPlayers = gameMode.players.map(player => ({ ...player, score: 0 }));
      setGameMode({ ...gameMode, players: resetPlayers });
    }
    
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

          {gameState === 'mode-selection' && (
            <GameMode onModeSelect={handleModeSelect} />
          )}

          {gameState === 'playing' && words.length > 0 && gameMode && (
            <>
              {gameMode.mode === 'solo' ? (
                <WordCard
                  word={words[currentWordIndex]}
                  currentWord={currentWordIndex + 1}
                  totalWords={words.length}
                  theme={theme}
                  correctAnswers={correctAnswers}
                  onAnswer={handleAnswer}
                  timeLimit={settings.timeLimit}
                  onBackToHome={handleRestart}
                  autoAdvance={settings.autoAdvance}
                />
              ) : (
                <DuelCard
                  word={words[currentWordIndex]}
                  currentWord={currentWordIndex + 1}
                  totalWords={words.length}
                  theme={theme}
                  players={gameMode.players}
                  currentPlayerIndex={currentPlayerIndex}
                  turnBased={gameMode.turnBased}
                  onAnswer={handleDuelAnswer}
                  onBackToHome={handleRestart}
                  timeLimit={settings.timeLimit}
                  autoAdvance={settings.autoAdvance}
                />
              )}
            </>
          )}

          {gameState === 'finished' && (
            <ResultCard
              correctAnswers={gameMode?.mode === 'solo' ? correctAnswers : null}
              totalWords={words.length}
              theme={theme}
              gameMode={gameMode}
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
