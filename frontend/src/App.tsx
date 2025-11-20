// frontend/src/App.tsx
import { useState, useEffect } from 'react';
import api from './services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface HealthResponse {
  message: string;
  status: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      setLoading(true);
      const response = await api.get<HealthResponse>('/health');
      setHealth(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao conectar com o backend');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body text-center">
              <h1 className="card-title">🌍 Meu Projeto</h1>

              {loading && (
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Carregando...</span>
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                  <button
                    className="btn btn-sm btn-outline-danger ms-2"
                    onClick={checkHealth}
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}

              {health && (
                <div className="alert alert-success" role="alert">
                  <h4 className="alert-heading">✅ Conectado!</h4>
                  <p className="mb-0">{health.message}</p>
                </div>
              )}

              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  onClick={checkHealth}
                  disabled={loading}
                >
                  {loading ? 'Verificando...' : 'Testar Conexão'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;