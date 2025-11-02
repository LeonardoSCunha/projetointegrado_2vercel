# Frontend React - S.O.S. Sorocaba

Frontend em React para o Sistema S.O.S. Sorocaba.

## Tecnologias

- **React 18**
- **React Router DOM** - Roteamento
- **Axios** - Requisições HTTP
- **CSS Modules** - Estilização

## Estrutura

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── services/      # Serviços de API
└── styles/        # Estilos globais
```

## Páginas Implementadas

- ✅ **Login** - Autenticação de usuários
- ✅ **Dashboard** - Visão geral do sistema
- ✅ **Patients** - Lista de pacientes
- 🚧 **Register** - Cadastro de pacientes (em desenvolvimento)
- 🚧 **Activities** - Registro de atividades (em desenvolvimento)
- 🚧 **Patient Profile** - Perfil do paciente (em desenvolvimento)

## Desenvolvimento Local

```bash
cd frontend
npm install
npm start
```

## Build para Produção

```bash
cd frontend
npm run build
```

## Integração com API

O frontend se conecta automaticamente com:
- **Desenvolvimento:** `http://localhost:3001`
- **Produção:** `/api` (Vercel Functions)

## Autenticação

- Token JWT armazenado no localStorage
- Redirecionamento automático para login se não autenticado
- Interceptor Axios para adicionar token nas requisições