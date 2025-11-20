// frontend/src/components/ApiExplorer.tsx
import React, { useState } from 'react';
import { Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import { apiService } from '../services/api';
import type { ApiCountry, NewsArticle } from '../services/api';

const ApiExplorer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'countries' | 'news'>('countries');
  const [countries, setCountries] = useState<ApiCountry[]>([]);
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useState({
    countryCode: 'br',
    region: '',
    category: 'technology'
  });

  const exploreCountries = async () => {
    try {
      setLoading(true);
      setError('');
      const params: any = {};
      if (searchParams.region) params.region = searchParams.region;

      const response = await apiService.external.getCountries(params);
      setCountries(response.data.countries.slice(0, 12));
    } catch (err: any) {
      setError('Erro ao explorar países: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const exploreNews = async () => {
    try {
      setLoading(true);
      setError('');
      let response;

      if (searchParams.countryCode) {
        response = await apiService.news.getByCountry(searchParams.countryCode);
      } else if (searchParams.category) {
        response = await apiService.news.getByCategory(searchParams.category);
      } else {
        response = await apiService.news.getGeneral();
      }

      setNews(response.data.articles);
    } catch (err: any) {
      setError('Erro ao explorar notícias: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleExplore = () => {
    if (activeTab === 'countries') {
      exploreCountries();
    } else {
      exploreNews();
    }
  };

  return (
    <div>
      {/* Cabeçalho */}
      <Card className="rosa-card mb-4">
        <Card.Body className="text-center">
          <h2 className="text-rosa mb-3">🔍 API Explorer</h2>
          <p className="text-muted">
            Explore dados das APIs RestCountries e NewsData em tempo real
          </p>
        </Card.Body>
      </Card>

      {/* Abas e Controles */}
      <Card className="rosa-card mb-4">
        <Card.Body>
          <Row className="align-items-center">
            <Col>
              <div className="d-flex gap-2 mb-3">
                <Button
                  variant={activeTab === 'countries' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('countries')}
                >
                  Países
                </Button>
                <Button
                  variant={activeTab === 'news' ? 'primary' : 'outline-primary'}
                  onClick={() => setActiveTab('news')}
                >
                  Notícias
                </Button>
              </div>
            </Col>
            <Col xs="auto">
              <Button className="btn-rosa" onClick={handleExplore} disabled={loading}>
                {loading ? <Spinner animation="border" size="sm" /> : '🔍 Explorar'}
              </Button>
            </Col>
          </Row>

          {/* Filtros */}
          <Row>
            {activeTab === 'countries' && (
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Região</Form.Label>
                  <Form.Select
                    value={searchParams.region}
                    onChange={(e) => setSearchParams({ ...searchParams, region: e.target.value })}
                  >
                    <option value="">Todas as regiões</option>
                    <option value="africa">África</option>
                    <option value="americas">Américas</option>
                    <option value="asia">Ásia</option>
                    <option value="europe">Europa</option>
                    <option value="oceania">Oceania</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            )}
            {activeTab === 'news' && (
              <>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>País</Form.Label>
                    <Form.Control
                      type="text"
                      value={searchParams.countryCode}
                      onChange={(e) => setSearchParams({ ...searchParams, countryCode: e.target.value })}
                      placeholder="Código (ex: br, us)"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label>Categoria</Form.Label>
                    <Form.Select
                      value={searchParams.category}
                      onChange={(e) => setSearchParams({ ...searchParams, category: e.target.value })}
                    >
                      <option value="technology">Tecnologia</option>
                      <option value="sports">Esportes</option>
                      <option value="health">Saúde</option>
                      <option value="science">Ciência</option>
                      <option value="entertainment">Entretenimento</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </>
            )}
          </Row>
        </Card.Body>
      </Card>

      {error && <Alert variant="danger">{error}</Alert>}

      {/* Resultados */}
      {activeTab === 'countries' && (
        <Row>
          {countries.map((country, index) => (
            <Col md={6} lg={4} key={index} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={country.flag}
                      alt={country.name}
                      style={{ width: '50px', height: '30px', objectFit: 'cover', marginRight: '10px' }}
                    />
                    <div>
                      <h6 className="mb-0">{country.name}</h6>
                      <small className="text-muted">{country.officialName}</small>
                    </div>
                  </div>
                  <div className="small">
                    <div><strong>Capital:</strong> {country.capital}</div>
                    <div><strong>Região:</strong> {country.region}</div>
                    <div><strong>População:</strong> {country.population.toLocaleString()}</div>
                    <div><strong>Área:</strong> {country.area.toLocaleString()} km²</div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {countries.length === 0 && !loading && (
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-muted">Nenhum país encontrado</h5>
                  <p>Use os filtros acima para explorar países</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}

      {activeTab === 'news' && (
        <Row>
          {news.map((article, index) => (
            <Col md={6} key={index} className="mb-3">
              <Card className="h-100">
                <Card.Body>
                  <h6>{article.title}</h6>
                  <p className="small text-muted">{article.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge bg="secondary">{article.source_id}</Badge>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      href={article.link}
                      target="_blank"
                    >
                      Ler
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
          {news.length === 0 && !loading && (
            <Col>
              <Card className="text-center">
                <Card.Body>
                  <h5 className="text-muted">Nenhuma notícia encontrada</h5>
                  <p>Use os filtros acima para explorar notícias</p>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      )}
    </div>
  );
};

export default ApiExplorer;