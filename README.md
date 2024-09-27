# Sobre o projeto
On-School é um projeto de gestão de conteúdo e acesso a recursos educacionais online, direcionados a professores da rede pública de educação.


## Tecnologias utilizadas
  - React
  - Next.Js
  - StyledComponents
  - Formik

##  Pré-requisitos 
Para rodar o projeto localmente, você precisará ter instalado em sua máquina:

- Docker
- Node.js (versão 14 ou superior)
- Npm
- O projeto de backend com as apis necessarias para executar o front

## Como instalar e executar o projeto Backend
1. Clone o repositório:
```sh
git clone https://github.com/melovivi/on-school.git
```

2. Para iniciar o banco de dados PostgreSQL usando Docker Compose, vá no diretório ```/docker``` e execute o comando:
```
docker-compose up -d
```

3. Instale as dependências do projeto:
```
npm install
```

4. Execute as migrações do banco de dados:
```
npm run typeorm migration:run
```

5. Inicie o servidor de desenvolvimento:
```
npm run start:dev
```

## Como instalar e executar o projeto Frontend
1. Clone o repositório:
```sh
git clone https://github.com/LuisCarvalh/on-school-react
```

2. Instale as dependências do projeto:
```
npm install
```

3. Inicie o servidor de desenvolvimento:
```
npm run dev
```

4. Acessar o front disponibilizado no localhost:
```
http://localhost:3001
```