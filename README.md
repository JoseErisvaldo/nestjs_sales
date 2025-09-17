# NestJS + TypeORM Project

Este projeto é um template completo usando NestJS, TypeORM e PostgreSQL. Contempla módulos de Users, Establishments, Products e Orders, com autenticação básica, Docker e estrutura pronta para desenvolvimento.

---

## Tecnologias Utilizadas

- Node.js 18+
- NestJS
- TypeORM
- PostgreSQL
- Docker / Docker Compose
- Class-validator / Class-transformer
- Jest para testes

---

## Estrutura do Projeto

```
src/
 ├─ app.module.ts
 ├─ database/
 │   └─ typeorm.config.ts
 ├─ users/
 ├─ establishment/
 ├─ product/
 └─ order/
```

---

## Configuração do Ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```dotenv
NODE_ENV=local
APP_PORT=3000
TYP_DB_SCHEMA=public
TYP_DB_USERNAME=shared
TYP_DB_PASSWORD=pg_password
TYP_DB_HOST=localhost
TYP_DB_PORT=5432
TYP_DB_NAME=nestjs_sales
```

---

## Docker Compose

Arquivo `docker-compose.yml` para banco e runner de migrations:

```yaml
version: '3.9'
services:
  postgres:
    container_name: postgres-nestjs_sales
    image: postgres:17-alpine
    ports:
      - '5432:5432'
    environment:
      POSTGRES_DB: nestjs_sales
      POSTGRES_USER: shared
      POSTGRES_PASSWORD: pg_password
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U shared -d nestjs_sales']
      interval: 5s
      timeout: 5s
      retries: 5
      start_period: 20s
    volumes:
      - postgres_data:/var/lib/postgresql/data

  migrations-runner:
    container_name: migrations-runner-praticando-typeorm
    build:
      dockerfile: ./Dockerfile
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: shared
      DB_PASSWORD: pg_password
      DB_DATABASE: nestjs_sales
      NODE_ENV: test
    volumes:
      - .:/usr/src/nestjs_sales

volumes:
  postgres_data:
    driver: local
```

Subir banco de dados:

```bash
docker compose up -d postgres
```

Rodar migrations:

```bash
docker compose run --rm migrations-runner
```

---

## Scripts NPM

```json
"scripts": {
  "build": "nest build",
  "start": "docker compose up -d && nest start --watch",
  "start:prod": "node dist/src/main",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
  "local:db:up": "docker compose up -d postgres",
  "local:db:down": "docker compose down postgres"
}
```

---

## Endpoints Principais

- **Users**: `/users` CRUD completo
- **Establishments**: `/establishment` CRUD completo
- **Products**: `/products` CRUD completo
- **Orders**: `/orders` CRUD completo

---

## Como Usar

1. Configurar `.env`
2. Subir banco com Docker
3. Rodar migrations
4. Iniciar servidor:

```bash
npm run start
```

5. Testar endpoints via Postman ou Insomnia.

---

## Observações

- Todas as entidades possuem DTOs de criação, atualização e response.
- Serviços usam `class-transformer` para mapear DTOs.
- Estrutura modular: cada módulo é isolado (Users, Establishment, Product, Order).
