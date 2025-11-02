import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [credentials, setCredentials] = useState({ usuario: '', senha: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(credentials);
      const { access_token, refresh_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);
      
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      padding: 'var(--space-4)'
    }}>
      <div style={{
        backgroundColor: 'var(--white)',
        padding: 'var(--space-8)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-xl)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <h1 style={{ color: 'var(--gray-800)', marginBottom: 'var(--space-2)' }}>
            S.O.S. Sorocaba
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Faça login para acessar o sistema
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              value={credentials.usuario}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: 'var(--space-1)' }}
            />
          </div>

          <div style={{ marginBottom: 'var(--space-6)' }}>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={credentials.senha}
              onChange={handleChange}
              required
              style={{ width: '100%', marginTop: 'var(--space-1)' }}
            />
          </div>

          {error && (
            <div style={{
              backgroundColor: 'var(--error)',
              color: 'var(--white)',
              padding: 'var(--space-3)',
              borderRadius: 'var(--radius)',
              marginBottom: 'var(--space-4)',
              fontSize: 'var(--font-size-sm)'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: 'var(--space-3)',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-hover))',
              color: 'var(--white)',
              border: 'none',
              borderRadius: 'var(--radius)',
              fontSize: 'var(--font-size-base)',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1
            }}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          backgroundColor: 'var(--gray-50)',
          borderRadius: 'var(--radius)',
          fontSize: 'var(--font-size-sm)',
          color: 'var(--gray-600)'
        }}>
          <strong>Usuário padrão:</strong><br />
          Usuário: administrador<br />
          Senha: administrador
        </div>
      </div>
    </div>
  );
};

export default Login;