import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Alert, Spinner } from 'react-bootstrap';
import { apiService } from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import ContinentManager from './components/ContinentManager';
import CountryManager from './components/CountryManager';
import CityManager from './components/CityManager';
import ApiExplorer from './components/ApiExplorer';

type ActiveTab = 'news' | 'continents' | 'countries' | 'cities' | 'api';

function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('news');
  const [health, setHealth] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const checkHealth = async () => {
    try {
      setLoading(true);
      await apiService.health();
      setHealth(true);
      setError('');
    } catch (err) {
      setHealth(false);
      setError('Erro ao conectar com o backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="rosa-bg">
      {/* Navbar Rosa */}
      <Navbar variant="dark" className="rosa-navbar" expand="lg">
        <Container>
          <Navbar.Brand href="#" className="fw-bold">
            🌍 GeoNexus
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                active={activeTab === 'news'}
                onClick={() => setActiveTab('news')}
              >
                📰 Notícias
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'continents'}
                onClick={() => setActiveTab('continents')}
              >
                🌎 Continentes
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'countries'}
                onClick={() => setActiveTab('countries')}
              >
                🇧🇷 Países
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'cities'}
                onClick={() => setActiveTab('cities')}
              >
                🏙️ Cidades
              </Nav.Link>
              <Nav.Link
                active={activeTab === 'api'}
                onClick={() => setActiveTab('api')}
              >
                🔍 API Explorer
              </Nav.Link>
            </Nav>
            <Nav>
              {loading ? (
                <Spinner animation="border" size="sm" className="loading-spinner" />
              ) : health ? (
                <Alert variant="success" className="mb-0 py-1 px-2">
                  ✅ Online
                </Alert>
              ) : (
                <Alert variant="danger" className="mb-0 py-1 px-2">
                  ❌ Offline
                </Alert>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Conteúdo Principal */}
      <Container fluid className="py-4">
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
            <button className="btn btn-sm btn-outline-danger ms-2" onClick={checkHealth}>
              Tentar Novamente
            </button>
          </Alert>
        )}

        {/* Renderizar Componente Ativo */}

        {activeTab === 'continents' && <ContinentManager />}
        {activeTab === 'countries' && <CountryManager />}
        {activeTab === 'cities' && <CityManager />}
        {activeTab === 'api' && <ApiExplorer />}
      </Container>
    </div>
  );
}

export default App;