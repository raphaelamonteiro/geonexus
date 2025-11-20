// frontend/src/components/Footer.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../index.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="kirby-footer">
            <Container>



                {/* Copyright */}
                <Row className="footer-bottom">
                    <Col className="text-center">
                        <p className="copyright">
                            © {currentYear} GeoNexus - Raphaela Monteiro

                        </p>
                        <div className="footer-credits">
                            <small>
                                Dados: RestCountries API • NewsData API
                            </small>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Elementos decorativos */}
            <div className="footer-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>
        </footer>
    );
};

export default Footer;