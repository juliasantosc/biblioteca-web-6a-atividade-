# Biblioteca Web

Sistema web para gerenciamento de uma biblioteca, com cadastro de **Autores** e **Livros**. Cada autor pode ter vários livros e cada livro pertence a um único autor (relação 1:N).

## Tecnologias

| Camada   | Tecnologia                                                                 |
|----------|----------------------------------------------------------------------------|
| Backend  | Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA, Validation, Lombok  |
| Docs API | springdoc-openapi 2.5.0 (Swagger UI em `/swagger-ui.html`)                 |
| Frontend | React 18, react-router-dom 6, axios, react-scripts 5, Node 20              |
| Banco    | PostgreSQL 15 (H2 em memória nos testes)                                   |
| Infra    | Docker, Docker Compose, GitHub Actions                                     |

## Estrutura de pastas

```
biblioteca-web/
├── backend/
│   ├── pom.xml
│   ├── Dockerfile
│   └── src/
│       ├── main/java/com/biblioteca/
│       │   ├── BibliotecaApplication.java
│       │   ├── model/
│       │   ├── repository/
│       │   └── controller/
│       ├── main/resources/application.properties
│       ├── test/java/com/biblioteca/controller/
│       └── test/resources/application-test.properties
├── frontend/
│   ├── package.json
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── public/index.html
│   └── src/
│       ├── index.js
│       ├── App.js
│       ├── App.css
│       ├── components/
│       └── services/api.js
├── docker-compose.yml
├── .github/workflows/ci-cd.yml
├── .gitignore
└── README.md
```

## Modelo de dados

```
autores 1 ────── N livros
```

- **autores**: id, nome, ...
- **livros**: id, titulo, ..., autor_id (FK para autores)

## Endpoints REST

| Método | Endpoint                      | Descrição                  |
|--------|-------------------------------|----------------------------|
| POST   | `/api/autores`                | Criar autor                |
| GET    | `/api/autores`                | Listar autores             |
| GET    | `/api/autores/{id}`           | Buscar autor por id        |
| PUT    | `/api/autores/{id}`           | Atualizar autor            |
| DELETE | `/api/autores/{id}`           | Remover autor              |
| POST   | `/api/livros`                 | Criar livro                |
| GET    | `/api/livros`                 | Listar livros              |
| GET    | `/api/livros/{id}`            | Buscar livro por id        |
| PUT    | `/api/livros/{id}`            | Atualizar livro            |
| DELETE | `/api/livros/{id}`            | Remover livro              |
| GET    | `/api/livros/autor/{autorId}` | Listar livros de um autor  |

## Como executar

### Com Docker

```bash
docker-compose up -d --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8080
- PostgreSQL: localhost:5432

### Sem Docker

Pré-requisitos: Java 17, Maven 3.9, Node 20 e um PostgreSQL 15 com o banco `biblioteca_db` (usuário e senha `postgres`).

```bash
# backend
cd backend
mvn spring-boot:run

# frontend (em outro terminal)
cd frontend
npm install
npm start
```

A conexão com o banco pode ser alterada pelas variáveis `SPRING_DATASOURCE_URL`, `SPRING_DATASOURCE_USERNAME` e `SPRING_DATASOURCE_PASSWORD`. A URL da API usada pelo frontend pode ser alterada em `REACT_APP_API_URL`.

## Como rodar os testes

```bash
cd backend && mvn test
```

Os testes usam o perfil `test` (H2 em memória).

## Divisão de trabalho

| Responsável | Tarefa              | Branch             |
|-------------|---------------------|--------------------|
| Aluno 1     | CRUD de Autores     | `feature/autores`  |
| Aluno 2     | CRUD de Livros      | `feature/livros`   |
