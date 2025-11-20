import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Table, Form, Modal, Spinner, Alert, Badge } from 'react-bootstrap';
import { apiService } from '../services/api';
import type { Continent } from '../services/api';

const ContinentManager: React.FC = () => {
    const [continents, setContinents] = useState<Continent[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingContinent, setEditingContinent] = useState<Continent | null>(null);
    const [formData, setFormData] = useState({ name: '' });

    const loadContinents = async () => {
        try {
            setLoading(true);
            setError('');
            const response = await apiService.continents.getAll();
            setContinents(response.data);
        } catch (err: any) {
            setError('Erro ao carregar continentes: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingContinent) {
                await apiService.continents.update(editingContinent.id, formData);
            } else {
                await apiService.continents.create(formData);
            }
            setShowModal(false);
            setEditingContinent(null);
            setFormData({ name: '' });
            loadContinents();
        } catch (err: any) {
            setError('Erro ao salvar continente: ' + err.message);
        }
    };

    const handleEdit = (continent: Continent) => {
        setEditingContinent(continent);
        setFormData({ name: continent.name });
        setShowModal(true);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este continente?')) {
            try {
                await apiService.continents.delete(id);
                loadContinents();
            } catch (err: any) {
                setError('Erro ao excluir continente: ' + err.message);
            }
        }
    };

    const openCreateModal = () => {
        setEditingContinent(null);
        setFormData({ name: '' });
        setShowModal(true);
    };

    useEffect(() => {
        loadContinents();
    }, []);

    return (
        <div>
            {/* Cabeçalho */}
            <Card className="rosa-card mb-4">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col>
                            <h2 className="text-rosa mb-0">Gerenciar Continentes</h2>
                            <p className="text-muted mb-0">Adicione, edite ou remova continentes</p>
                        </Col>
                        <Col xs="auto">
                            <Button className="btn-rosa" onClick={openCreateModal}>
                                Novo Continente
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Lista de Continentes */}
            <Card className="rosa-card">
                <Card.Body>
                    {loading ? (
                        <div className="text-center">
                            <Spinner animation="border" className="loading-spinner" />
                            <p className="mt-2 text-rosa">Carregando continentes...</p>
                        </div>
                    ) : (
                        <Table responsive hover>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Países</th>
                                    <th>Criado em</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {continents.map((continent) => (
                                    <tr key={continent.id}>
                                        <td>
                                            <strong className="text-rosa">{continent.name}</strong>
                                        </td>
                                        <td>
                                            <Badge bg="secondary">
                                                {continent.countries?.length || 0} países
                                            </Badge>
                                        </td>
                                        <td>
                                            {new Date(continent.createdAt).toLocaleDateString('pt-BR')}
                                        </td>
                                        <td>
                                            <Button
                                                variant="outline-editar"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => handleEdit(continent)}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => handleDelete(continent.id)}
                                            >
                                                Excluir
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {continents.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center text-muted py-4">
                                            Nenhum continente cadastrado
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>

            {/* Modal de Criar/Editar */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton className="border-0">
                    <Modal.Title className="text-rosa">
                        {editingContinent ? 'Editar Continente' : ' Novo Continente'}
                    </Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome do Continente</Form.Label>
                            <Form.Control
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ name: e.target.value })}
                                placeholder="Ex: América, Europa, Ásia..."
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancelar
                        </Button>
                        <Button type="submit" className="btn-rosa">
                            {editingContinent ? 'Atualizar' : 'Criar'} Continente
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ContinentManager;