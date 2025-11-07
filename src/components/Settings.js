import React from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import './Settings.css';

const Settings = ({ show, onHide, settings, onSettingsChange }) => {
  const handleChange = (key, value) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <Modal show={show} onHide={onHide} centered className="settings-modal">
      <Modal.Header closeButton className="settings-header">
        <Modal.Title>
          <span className="settings-icon">⚙️</span>
          Configurações
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="settings-body">
        <Form>
          <Row className="mb-4">
            <Col>
              <h5 className="section-title">🔊 Som</h5>
              <Form.Check
                type="switch"
                id="sound-switch"
                label="Efeitos sonoros"
                checked={settings.soundEnabled}
                onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                className="custom-switch"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5 className="section-title">🎮 Interface</h5>
              
              <Form.Check
                type="switch"
                id="animations-switch"
                label="Animações"
                checked={settings.animationsEnabled}
                onChange={(e) => handleChange('animationsEnabled', e.target.checked)}
                className="custom-switch"
              />
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5 className="section-title">⏱️ Tempo</h5>
              <Form.Group className="mb-3">
                <Form.Label>Tempo limite por pergunta (segundos)</Form.Label>
                <Form.Select
                  value={settings.timeLimit || 30}
                  onChange={(e) => handleChange('timeLimit', parseInt(e.target.value))}
                  className="time-select"
                >
                  <option value={10}>10 segundos</option>
                  <option value={15}>15 segundos</option>
                  <option value={20}>20 segundos</option>
                  <option value={30}>30 segundos</option>
                  <option value={45}>45 segundos</option>
                  <option value={60}>60 segundos</option>
                  <option value={0}>Sem limite de tempo</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h5 className="section-title">⏭️ Avanço</h5>
              <Form.Check
                type="switch"
                id="auto-advance-switch"
                label="Avanço automático para próxima palavra"
                checked={settings.autoAdvance || false}
                onChange={(e) => handleChange('autoAdvance', e.target.checked)}
                className="custom-switch"
              />
              <Form.Text className="text-muted">
                {settings.autoAdvance 
                  ? "As palavras avançam automaticamente após resposta" 
                  : "Necessário clicar para avançar para próxima palavra"
                }
              </Form.Text>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <h5 className="section-title">🎨 Tema Visual</h5>
              <div className="theme-selector-grid">
                {[
                  { id: 'default', name: 'Padrão', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                  { id: 'sunset', name: 'Pôr do Sol', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                  { id: 'ocean', name: 'Oceano', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                  { id: 'forest', name: 'Floresta', gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }
                ].map(theme => (
                  <div
                    key={theme.id}
                    className={`theme-option ${settings.visualTheme === theme.id ? 'selected' : ''}`}
                    style={{ background: theme.gradient }}
                    onClick={() => handleChange('visualTheme', theme.id)}
                  >
                    {theme.name}
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      
      <Modal.Footer className="settings-footer">
        <Button variant="primary" onClick={onHide} className="save-btn">
          💾 Salvar Configurações
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Settings;