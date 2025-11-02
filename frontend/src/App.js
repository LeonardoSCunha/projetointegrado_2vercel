import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import './styles/index.css';

// Componente para proteger rotas
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" />;
};

// Componente temporário para páginas não implementadas
const ComingSoon = ({ title }) => (
  <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
    <h1>{title}</h1>
    <p style={{ color: 'var(--gray-600)', marginTop: 'var(--space-4)' }}>
      Esta página está em desenvolvimento.
    </p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/patients" element={
          <ProtectedRoute>
            <Layout>
              <Patients />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/register" element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="Cadastro de Pacientes" />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/activities" element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="Registro de Atividades" />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="/patient/:id" element={
          <ProtectedRoute>
            <Layout>
              <ComingSoon title="Perfil do Paciente" />
            </Layout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;