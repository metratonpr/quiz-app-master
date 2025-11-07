import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import './JsonInput.css';

const JsonInput = ({ onJsonSubmit }) => {
  const [jsonText, setJsonText] = useState('');
  const [showExample, setShowExample] = useState(false);

  const exampleJson = {
    "theme": "Animais",
    "words": [
      "Cachorro", "Gato", "Elefante", "Leão", "Tigre", "Girafa", 
      "Macaco", "Pássaro", "Peixe", "Cobra", "Borboleta", "Abelha",
      "Cavalo", "Vaca", "Porco", "Ovelha", "Coelho", "Hamster"
    ]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jsonText.trim()) {
      onJsonSubmit(jsonText);
    }
  };

  const handleUseExample = () => {
    setJsonText(JSON.stringify(exampleJson, null, 2));
    setShowExample(false);
  };

  return (
    <div className="json-input-container">
      <Card className="json-input-card">
        <Card.Header className="json-input-header">
          <h2 className="text-center mb-0">
            📝 Insira suas Palavras
          </h2>
          <p className="subtitle">Cole um JSON com o tema e lista de palavras</p>
        </Card.Header>
        
        <Card.Body className="json-input-body">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="form-label">
                <strong>JSON com suas palavras:</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={12}
                placeholder="Cole aqui o JSON com suas palavras..."
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                className="json-textarea"
              />
            </Form.Group>

            <div className="button-group">
              <Button
                type="submit"
                size="lg"
                className="generate-btn"
                disabled={!jsonText.trim()}
              >
                🎯 Gerar Quiz
              </Button>
              
              <Button
                variant="outline-info"
                size="lg"
                onClick={() => setShowExample(!showExample)}
                className="example-btn"
              >
                💡 {showExample ? 'Ocultar' : 'Ver'} Exemplo
              </Button>
            </div>
          </Form>

          {showExample && (
            <Alert variant="info" className="example-alert">
              <Alert.Heading className="example-title">
                📋 Exemplo de JSON
              </Alert.Heading>
              <pre className="example-code">
                {JSON.stringify(exampleJson, null, 2)}
              </pre>
              <div className="text-center mt-3">
                <Button 
                  variant="info" 
                  onClick={handleUseExample}
                  className="use-example-btn"
                >
                  ✨ Usar este Exemplo
                </Button>
              </div>
            </Alert>
          )}

          <div className="instructions">
            <h5>📋 Como usar:</h5>
            <ul>
              <li>Crie um JSON com <code>"theme"</code> (nome do tema) e <code>"words"</code> (array de palavras)</li>
              <li>O sistema escolherá automaticamente 10 palavras aleatórias</li>
              <li>Você verá cada palavra e deve marcar se acertou ou errou</li>
              <li>No final, verá quantas palavras conhecia!</li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default JsonInput;