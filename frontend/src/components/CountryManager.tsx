import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import { apiService } from '../services/api';
import type { Country, Continent, ApiCountry } from '../services/api'; // ← Importação correta

const CountryManager: React.FC = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [continents, setContinents] = useState<Continent[]>([]);
    const [apiCountries, setApiCountries] = useState<ApiCountry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingCountry, setEditingCountry] = useState<Country | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        code: '',
        continentId: ''
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const [countriesRes, continentsRes] = await Promise.all([
                apiService.countries.getAll(),
                apiService.continents.getAll()
            ]);
            setCountries(countriesRes.data);
            setContinents(continentsRes.data);
        } catch (err: any) {
            setError('Erro ao carregar dados: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const loadApiCountries = async () => {
        try {
            const response = await apiService.external.getCountries();
            setApiCountries(response.data.countries);
            setShowImportModal(true);
        } catch (err: any) {
            setError('Erro ao carregar países da API: ' + err.message);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                continentId: parseInt(formData.continentId)
            };

            if (editingCountry) {
                await apiService.countries.update(editingCountry.id, data);
            } else {
                await apiService.countries.create(data);
            }
            setShowModal(false);
            setEditingCountry(null);
            setFormData({ name: '', code: '', continentId: '' });
            loadData();
        } catch (err: any) {
            setError('Erro ao salvar país: ' + err.message);
        }
    };

    const handleImport = async (apiCountry: ApiCountry) => {
        try {
            if (continents.length === 0) {
                setError('Crie um continente antes de importar países');
                return;
            }

            const continentId = continents[0].id;
            await apiService.external.importCountry({
                code: apiCountry.code,
                continentId
            });
            setShowImportModal(false);
            loadData();
        } catch (err: any) {
            setError('Erro ao importar país: ' + err.message);
        }
    };

    const handleEdit = (country: Country) => {
        setEditingCountry(country);
        setFormData({
            name: country.name,
            code: country.code,
            continentId: country.continentId.toString()
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este país?')) {
            try {
                await apiService.countries.delete(id);
                loadData();
            } catch (err: any) {
                setError('Erro ao excluir país: ' + err.message);
            }
        }
    };

    const openCreateModal = () => {
        setEditingCountry(null);
        setFormData({ name: '', code: '', continentId: '' });
        setShowModal(true);
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            {/* Cabeçalho */}
            <Card className="rosa-card mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="text-rosa mb-0">🇧🇷 Gerenciar Países</h2>
                            <p className="text-muted mb-0">Gerencie países manualmente ou importe da API</p>
                        </Col>
                        <Col xs="auto" className="d-flex gap-2">
                            <Button className="btn-rosa-outline" onClick={loadApiCountries}>
                                Importar da API
                            </Button>
                            <Button className="btn-rosa" onClick={openCreateModal}>
                                Novo País
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Lista de Países */}
            <Card className="rosa-card">
                <Card.Body>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" className="loading-spinner" />
                            <p className="mt-2 text-rosa">Carregando países...</p>
                        </div>
                    ) : (
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Bandeira</th>
                                    <th>Nome</th>
                                    <th>Código</th>
                                    <th>Continente</th>
                                    <th>Cidades</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {countries.map((country) => (
                                    <tr key={country.id}>
                                        <td>
                                            <img
                                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                                alt={country.name}
                                                className="country-flag"
                                            />
                                        </td>
                                        <td>
                                            <strong className="text-rosa">{country.name}</strong>
                                        </td>
                                        <td>
                                            <Badge bg="primary">{country.code}</Badge>
                                        </td>
                                        <td>
                                            {country.continent?.name || 'N/A'}
                                        </td>
                                        <td>
                                            <Badge bg="secondary">
                                                {country.cities?.length || 0} cidades
                                            </Badge>
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEdit(country)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(country.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {countries.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center text-muted py-4">
                                            Nenhum país cadastrado. Importe da API ou crie manualmente.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Modal Criar/Editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-rosa">
                        {editingCountry ? '✏️ Editar País' : '🇧🇷 Novo País'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do País</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: Brasil, Argentina..."
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Código (2 letras)</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.code}
                                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                                placeholder="Ex: BR, US..."
                                maxLength={2}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Continente</Form.Label>
                            <Form.Select
                                value={formData.continentId}
                                onChange={(e) => setFormData({ ...formData, continentId: e.target.value })}
                                required
                            >
                                <option value="">Selecione um continente</option>
                                {continents.map((continent) => (
                                    <option key={continent.id} value={continent.id}>
                                        {continent.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="btn-rosa">
                            {editingCountry ? 'Atualizar' : 'Criar'} País
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

            {/* Modal Importar da API */}
            <Modal show={showImportModal} onHide={() => setShowImportModal(false)} size="lg" centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-rosa">Importar da API</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <Row>
                        {apiCountries.slice(0, 20).map((country, index) => (
                            <Col md={6} key={index} className="mb-3">
                                <Card className="h-100">
                                    <Card.Body className="d-flex align-items-center">
                                        <img
                                            src={country.flag}
                                            alt={country.name}
                                            style={{ width: '40px', height: '25px', objectFit: 'cover', marginRight: '10px' }}
                                        />
                                        <div className="flex-grow-1">
                                            <h6 className="mb-0">{country.name}</h6>
                                            <small className="text-muted">
                                                {country.capital} • {country.population.toLocaleString()} hab
                                            </small>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="outline-success"
                                            onClick={() => handleImport(country)}
                                        >
                                            Importar
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CountryManager;