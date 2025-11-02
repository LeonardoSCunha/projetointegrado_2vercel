# SOS Sorocaba V4 - Sistema React Integrado

## Visão Geral

A **V4** usa o estilo exato do `home.html` da pasta `paginas_html` mas no formato React do V3, com integração completa com a API real e banco de dados MySQL.

## Características

### Design
- Interface idêntica ao `paginas_html/home.html`
- Estilo React usando forms.css do V3
- Layout responsivo e moderno
- Componentes React com Babel Standalone

### Integração
- **API Real**: Conectada com `http://localhost:3001`
- **Banco MySQL**: Dados reais do banco `projeto`
- **Autenticação JWT**: Login seguro com tokens
- **Dados Dinâmicos**: Estatísticas e listas em tempo real

## Estrutura

```
V4/
├── public/
│   └── index.html         # Página principal (Home)
├── src/
│   └── styles/
│       └── forms.css      # Estilos do V3
├── login.html             # Página de login
└── README.md
```

## Como Usar

1. **Iniciar API**: `npm run dev` na pasta raiz
2. **Abrir Login**: `login.html` no navegador
3. **Credenciais**: usuário `administrador`, senha `administrador`
4. **Dashboard**: Será redirecionado para `public/index.html`

## Tecnologias

- **React 18**: Biblioteca principal
- **Babel Standalone**: Transpilação no navegador
- **CSS3**: Estilos modernos com variáveis CSS
- **Fetch API**: Requisições HTTP
- **JWT**: Autenticação segura

## Funcionalidades

### Dashboard (public/index.html)
- **Hero Section**: Título e descrição
- **Cards de Estatísticas**: Total, Ativos, Moradores de Rua
- **Tabela de Pacientes**: Últimos 3 pacientes cadastrados
- **Dados Dinâmicos**: Carregados da API em tempo real

### Login (login.html)
- **Formulário de Login**: Usuário e senha
- **Validação**: Mensagens de erro
- **Redirecionamento**: Para dashboard após login

## Diferenças das Versões

- **paginas_html/home.html**: Dados mockados, estilo base
- **V3**: React com dados mockados
- **V4**: React + API real + estilo exato do home.html original

## Estilo

Mantém exatamente o mesmo visual do `paginas_html/home.html`:
- Hero section com título centralizado
- Cards de estatísticas com gradiente
- Tabela de pacientes com hover effects
- Header e footer com gradientes
- Layout responsivo