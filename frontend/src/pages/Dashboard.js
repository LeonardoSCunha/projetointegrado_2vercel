import React, { useState, useEffect } from 'react';
import { patientAPI } from '../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activePatients: 0,
    blockedPatients: 0,
    recentActivities: 0
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await patientAPI.getAll();
      const patients = response.data;
      
      const activePatients = patients.filter(p => p.status === 'Ativo').length;
      const blockedPatients = patients.filter(p => p.status === 'Bloqueado').length;
      
      setStats({
        totalPatients: patients.length,
        activePatients,
        blockedPatients,
        recentActivities: 0 // Implementar quando tiver endpoint
      });
      
      setRecentPatients(patients.slice(0, 5));
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <p>Carregando dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-section">
        <h1>Dashboard - S.O.S. Sorocaba</h1>
        <p className="hero-description">
          Visão geral do sistema de atendimento de emergência
        </p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-number">{stats.totalPatients}</div>
          <div className="stat-label">Total de Pacientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activePatients}</div>
          <div className="stat-label">Pacientes Ativos</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.blockedPatients}</div>
          <div className="stat-label">Pacientes Bloqueados</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.recentActivities}</div>
          <div className="stat-label">Atividades Recentes</div>
        </div>
      </div>

      <div className="recent-patients">
        <h2>Pacientes Recentes</h2>
        {recentPatients.length > 0 ? (
          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Idade</th>
                  <th>Documento</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentPatients.map((patient) => (
                  <tr key={patient.id}>
                    <td>{patient.nome}</td>
                    <td>{patient.idade}</td>
                    <td>{patient.documento}</td>
                    <td>
                      <span className={`status-badge ${patient.status.toLowerCase()}`}>
                        {patient.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            <p>Nenhum paciente cadastrado ainda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;