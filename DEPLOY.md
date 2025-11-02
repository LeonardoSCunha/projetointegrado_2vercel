# Deploy no Vercel - S.O.S. Sorocaba

## Configuração no Vercel

### 1. Configurações do Projeto
- **Framework Preset:** Other
- **Root Directory:** (deixe vazio)
- **Build Command:** `npm run build`
- **Output Directory:** `arquivos_html/V4/public`
- **Install Command:** `npm install`

### 2. Variáveis de Ambiente
Configure as seguintes variáveis no Vercel:

```
DATABASE_URL=mysql://usuario:senha@host:porta/database
JWT_SECRET=seu_jwt_secret_aqui
JWT_REFRESH_SECRET=seu_jwt_refresh_secret_aqui
```

### 3. Estrutura da API
As seguintes rotas estarão disponíveis:

- `POST /api/authenticate` - Login de usuários
- `GET /api/patient` - Listar pacientes
- `GET /api/patient?id=1` - Buscar paciente por ID
- `POST /api/patient` - Criar paciente
- `PUT /api/patient` - Atualizar paciente
- `DELETE /api/patient?id=1` - Deletar paciente
- `GET /api/fixed-activitie` - Listar atividades fixas
- `GET /api/history-activitie` - Listar histórico de atividades
- `POST /api/history-activitie` - Registrar nova atividade

### 4. Frontend
O frontend estará disponível na raiz do domínio:
- `/` - Página de login
- `/index.html` - Dashboard principal
- `/forms.html` - Formulário de cadastro
- `/atividades.html` - Registro de atividades
- `/userinfo.html` - Informações do usuário

### 5. Banco de Dados
Certifique-se de que o banco MySQL esteja acessível publicamente ou use um serviço como:
- PlanetScale
- Railway
- AWS RDS
- Google Cloud SQL

### 6. Deploy
1. Conecte seu repositório GitHub ao Vercel
2. Configure as variáveis de ambiente
3. Faça o deploy

O projeto estará disponível em: `https://seu-projeto.vercel.app`