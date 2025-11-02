import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className="headerContent">
        <header>
          <h1>Sistema S.O.S. Sorocaba</h1>
          <p>Serviço de Atendimento de Emergência</p>
          <nav>
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Dashboard
            </Link>
            <Link to="/patients" className={isActive('/patients') ? 'active' : ''}>
              Pacientes
            </Link>
            <Link to="/register" className={isActive('/register') ? 'active' : ''}>
              Cadastrar
            </Link>
            <Link to="/activities" className={isActive('/activities') ? 'active' : ''}>
              Atividades
            </Link>
            <button 
              onClick={handleLogout}
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: 'rgba(255, 255, 255, 0.9)',
                padding: 'var(--space-2) var(--space-4)',
                borderRadius: 'var(--radius)',
                cursor: 'pointer',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '500',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Sair
            </button>
          </nav>
        </header>
      </div>

      <div className="mainContent">
        <main>
          {children}
        </main>
      </div>

      <div className="footerContent">
        <footer>
          <h3>Sistema S.O.S. Sorocaba</h3>
          <h4>Projeto Integrador I - Engenharia da Computação - UNIVESP</h4>
        </footer>
      </div>
    </div>
  );
};

export default Layout;