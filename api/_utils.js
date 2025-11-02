const { container } = require('tsyringe');
const { PrismaClient } = require('@prisma/client');
require('reflect-metadata');

// Inicializar Prisma
const prisma = new PrismaClient();

// Registrar dependências no container
require('../src/shared/infra/http/container');

// Função para lidar com CORS
function corsHandler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return true;
  }
  return false;
}

// Função para lidar com erros
function errorHandler(error, res) {
  console.error('API Error:', error);
  
  if (error.message.includes('Invalid credentials')) {
    return res.status(400).json({ message: error.message });
  }
  if (error.message.includes('not found')) {
    return res.status(404).json({ message: error.message });
  }
  if (error.message.includes('permission')) {
    return res.status(403).json({ message: error.message });
  }
  
  return res.status(500).json({ message: 'Internal server error' });
}

module.exports = { container, prisma, corsHandler, errorHandler };