import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../services/api';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadPatients();
  }, []);

  useEffect(() => {
    filterPatients();
  }, [searchTerm, patients]);

  const loadPatients = async () => {
    try {
      const response = await patientAPI.getAll();
      setPatients(response.data);
    } catch (error) {
      console.error('Erro ao carregar pacientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterPatients = () => {
    if (!searchTerm) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter(patient =>
      patient.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.documento.includes(searchTerm) ||
      patient.codigo_usuario?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(filtered);
  };

  const handlePatientClick = (patientId) => {
    navigate(`/patient/${patientId}`);
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
        <p>Carregando pacientes...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="hero-section">
        <h1>Pacientes Cadastrados</h1>
        <p className="hero-description">
          Visualize e gerencie todos os pacientes do sistema
        </p>
      </div>

      <div className="search-container">
        <label htmlFor="search">Buscar Paciente</label>
        <input
          type="text"
          id="search"
          placeholder="Digite o nome, documento ou código do usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <small className="help-text">
          Busque por nome, documento (CPF/RG) ou código do usuário
        </small>
      </div>

      {filteredPatients.length > 0 ? (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Idade</th>
                <th>Documento</th>
                <th>Código</th>
                <th>Profissão</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr 
                  key={patient.id}
                  onClick={() => handlePatientClick(patient.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{patient.nome}</td>
                  <td>{patient.idade}</td>
                  <td>{patient.documento}</td>
                  <td>{patient.codigo_usuario || 'N/A'}</td>
                  <td>{patient.profissao || 'N/A'}</td>
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
        <div className="no-results">
          {searchTerm ? (
            <p>Nenhum paciente encontrado para "{searchTerm}"</p>
          ) : (
            <p>Nenhum paciente cadastrado ainda.</p>
          )}
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
        <button 
          className="btn-primary"
          onClick={() => navigate('/register')}
        >
          Cadastrar Novo Paciente
        </button>
      </div>
    </div>
  );
};

export default Patients;