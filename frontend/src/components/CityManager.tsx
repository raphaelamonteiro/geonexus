// frontend/src/components/CityManager.tsx
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import { apiService, City, Country } from '../services/api';

const CityManager: React.FC = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCity, setEditingCity] = useState<City | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        countryId: ''
    });

    const loadData = async () => {
        try {
            setLoading(true);
            const [citiesRes, countriesRes] = await Promise.all([
                apiService.cities.getAll(),
                apiService.countries.getAll()
            ]);
            setCities(citiesRes.data);
            setCountries(countriesRes.data);
        } catch (err: any) {
            setError('Erro ao carregar dados: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const data = {
                ...formData,
                countryId: parseInt(formData.countryId)
            };

            if (editingCity) {
                await apiService.cities.update(editingCity.id, data);
            } else {
                await apiService.cities.create(data);
            }
            setShowModal(false);
            setEditingCity(null);
            setFormData({ name: '', countryId: '' });
            loadData();
        } catch (err: any) {
            setError('Erro ao salvar cidade: ' + err.message);
        }
    };

    const handleEdit = (city: City) => {
        setEditingCity(city);
        setFormData({
            name: city.name,
            countryId: city.countryId.toString()
        });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir esta cidade?')) {
            try {
                await apiService.cities.delete(id);
                loadData();
            } catch (err: any) {
                setError('Erro ao excluir cidade: ' + err.message);
            }
        }
    };

    const openCreateModal = () => {
        setEditingCity(null);
        setFormData({ name: '', countryId: '' });
        setShowModal(true);
    };

    const getCountryName = (countryId: number) => {
        const country = countries.find(c => c.id === countryId);
        return country?.name || 'N/A';
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
                            <h2 className="text-rosa mb-0">🏙️ Gerenciar Cidades</h2>
                            <p className="text-muted mb-0">Adicione, edite ou remova cidades</p>
                        </Col>
                        <Col xs="auto">
                            <Button className="btn-rosa" onClick={openCreateModal}>
                                ➕ Nova Cidade
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Lista de Cidades */}
            <Card className="rosa-card">
                <Card.Body>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" className="loading-spinner" />
                            <p className="mt-2 text-rosa">Carregando cidades...</p>
                        </div>
                    ) : (
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>País</th>
                                    <th>Criado em</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cities.map((city) => (
                                    <tr key={city.id}>
                                        <td>
                                            <strong className="text-rosa">{city.name}</strong>
                                        </td>
                                        <td>{getCountryName(city.countryId)}</td>
                                        <td>
                                            {new Date(city.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-primary"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEdit(city)}
                                            >
                                                ✏️ Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(city.id)}
                                            >
                                                🗑️ Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {cities.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center text-muted py-4">
                                            Nenhuma cidade cadastrada
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
                        {editingCity ? '✏️ Editar Cidade' : '🏙️ Nova Cidade'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome da Cidade</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Ex: São Paulo, Rio de Janeiro..."
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>País</Form.Label>
                            <Form.Select
                                value={formData.countryId}
                                onChange={(e) => setFormData({ ...formData, countryId: e.target.value })}
                                required
                            >
                                <option value="">Selecione um país</option>
                                {countries.map((country) => (
                                    <option key={country.id} value={country.id}>
                                        {country.name}
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
                            {editingCity ? 'Atualizar' : 'Criar'} Cidade
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default CityManager;