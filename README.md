# 🔑 System Login — REST API

A modern, robust, and scalable REST API built with **Node.js**, **Fastify**, **TypeScript**, **Prisma ORM** (with PostgreSQL driver adapter), and **Zod**. Designed following clean architecture principles (Controllers, Services, Repositories) and featuring JWT authentication, rate limiting, security headers, graceful shutdown, and interactive Swagger/Scalar documentation.

---

## ✨ Key Features

* ⚡ **Fastify v5 Framework**: Ultra-fast, low-overhead web framework with structured logging powered by `pino-pretty`.
* 🍃 **Prisma ORM 7 with PostgreSQL Adapter**: Type-safe database management using `@prisma/client` and `@prisma/adapter-pg` with native `pg` pool.
* 🔑 **Authentication & Security**: JWT-based authentication (`@fastify/jwt`), password hashing with `bcrypt` (10 rounds), and HTTP security headers via `@fastify/helmet`.
* 🛡️ **Graceful Shutdown**: Controlled connection cleanup (PostgreSQL, server connections) on process termination (`SIGINT`/`SIGTERM`) using `fastify-graceful-shutdown`.
* ⚡ **Rate Limiting**: Built-in protection against brute-force and DDoS attacks on endpoints (`@fastify/rate-limit`).
* ✅ **End-to-End Validation**: Strict request/response schema validation and type inference via **Zod** and `fastify-type-provider-zod`.
* 🎨 **Modern Tooling**: Code formatting and linting configured with **Biome** (`@biomejs/biome`).
* 🚨 **Global Error Handling**: Standardized JSON error responses via custom `AppError` class and global error handler.
* 📘 **Interactive API Docs**: OpenAPI 3.0 specification generated via `@fastify/swagger` and rendered through **Scalar API Reference** (`@scalar/fastify-api-reference`).

---

## 🧰 Tech Stack

| Technology | Category | Purpose / Description |
| :--- | :--- | :--- |
| **Node.js** (v20+) | Runtime | JavaScript server runtime environment |
| **Fastify** | Framework | High-performance, low-overhead web framework |
| **TypeScript** | Language | Static typing and modern JavaScript features |
| **Prisma ORM** | Database | Type-safe ORM with `@prisma/adapter-pg` driver adapter |
| **PostgreSQL** | Database | Relational database engine |
| **Zod** | Validation | Schema validation and automatic TypeScript inference |
| **@fastify/jwt** | Auth | JWT token signing and verification |
| **@fastify/rate-limit** | Security | Rate limiting plugin |
| **@fastify/cors** | Security | Cross-Origin Resource Sharing |
| **fastify-graceful-shutdown** | Lifecycle | Process signal handling (`SIGINT`/`SIGTERM`) and clean shutdown |
| **@fastify/helmet** | Security | HTTP security headers middleware |
| **Bcrypt** | Security | Password hashing with salt rounds |
| **Swagger / Scalar** | Docs | OpenAPI documentation and interactive UI reference |

---

## 📂 Project Structure

```text
login-system/
├── prisma/
│   └── schema.prisma          # Prisma schema & PostgreSQL connection
│
├── src/
│   ├── @types/                # Custom TypeScript definitions & type providers
│   │   ├── fastify-typed-instance.ts
│   │   └── fastify.d.ts
│   │
│   ├── config/                # Environment variables (Zod validated) & logger
│   │   ├── env.ts
│   │   └── logger.ts
│   │
│   ├── errors/                # AppError class and global error handler
│   │   ├── app-error.ts
│   │   └── error-handler.ts
│   │
│   ├── modules/               # Feature modules (Domain-driven structure)
│   │   └── users/
│   │       ├── users.controller.ts
│   │       ├── users.repository.ts
│   │       ├── users.routes.ts
│   │       ├── users.schema.ts
│   │       └── users.service.ts
│   │
│   ├── plugins/               # Fastify plugins (modular & decoupled)
│   │   ├── cookie.ts
│   │   ├── cors.ts
│   │   ├── database.ts         # Prisma Client & PostgreSQL pool setup
│   │   ├── graceful-shutdown.ts # Signal listener & DB disconnect
│   │   ├── helmet.ts           # Security headers
│   │   ├── jwt.ts              # Fastify JWT configuration
│   │   ├── rate-limit.ts       # Rate limiting setup
│   │   ├── scalar.ts           # Scalar API reference UI
│   │   └── swagger.ts          # OpenAPI specification
│   │
│   └── index.ts               # Application entry point & plugin registration
│
├── biome.json                 # Linter / Formatter configuration
├── LICENSE                    # Project license (MIT)
├── package.json               # Dependencies and npm/pnpm scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🚦 API Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/users/register` | Create a new user account | No |
| `POST` | `/api/users/login` | Authenticate user and receive JWT access token | No |
| `GET` | `/api/users/profile` | Retrieve authenticated user profile | Yes (`Bearer Token`) |
| `POST` | `/api/users/logout` | Client-side session termination | Yes (`Bearer Token`) |
| `GET` | `/docs` | Interactive Scalar OpenAPI Documentation | No |

---

## 📦 Prerequisites

Before running the application, ensure you have installed:

* **Node.js** v20.x or higher
* **pnpm** v10.x or higher (or `npm` / `yarn`)
* **PostgreSQL** v16+ (or running via Docker container)
* **Git** for cloning the repository

---

## 🛠️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SamuelDevz/system-login.git
   cd system-login
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory based on example `.env`:
   ```bash
   touch .env
   ```

4. **Run Database Migrations:**
   ```bash
   pnpm db:migrate
   ```

5. **Start the Development Server:**
   ```bash
   pnpm dev
   ```

---

## 📜 Available Scripts

| Script | Description |
| :--- | :--- |
| `pnpm dev` | Start development server with hot-reload |
| `pnpm start` | Start transpiled server in production mode |
| `pnpm build` | Transpile TypeScript code to JavaScript |
| `pnpm lint` | Run Biome linter and code format checks |
| `pnpm db:generate` | Generate Prisma Client based on `schema.prisma` |
| `pnpm db:migrate` | Apply database migrations in development |
| `pnpm db:studio` | Launch Prisma Studio GUI in browser |

---

## 🌍 Environment Variables

Example `.env` configuration:

```env
# Application Setup
PORT=3333
HOST=0.0.0.0
NODE_ENV=development

# Database Connection
DATABASE_URL="postgresql://postgres:password@localhost:5432/my_db?schema=public"

# JWT Configuration
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=1h
```

---

## 🔐 Security & Best Practices

* **User Enumeration Protection**: Authentication failures return identical `400 Bad Request` ("Invalid credentials") messages for both non-existent emails and incorrect passwords.
* **Password Hashing**: Passwords are hashed using `bcrypt` with 10 salt rounds before persistence.
* **Graceful Shutdown**: The application traps `SIGINT` (Ctrl+C) and `SIGTERM` signals via `fastify-graceful-shutdown`, stopping new incoming requests, allowing active requests to finish, and safely
* **Enumeration Protection**: Login endpoints return generic `400 Bad Request` ("Invalid credentials") errors to prevent user enumeration attacks.
* **Strict Type Sanitization**: Sensitive data (such as password hashes) are excluded from HTTP response payloads.
* **HTTP Security Headers**: `@fastify/helmet` enables HSTS, MIME-sniffing protection (`nosniff`), and hides `X-Powered-By`.
* **Rate Limiting**: Sensitive routes (e.g., `/login`) enforce rate limits to mitigate brute-force attempts.
* **Input Validation & Sanitization**: Zod schemas validate, trim, and format incoming request payloads before reaching controllers.

---

## 📘 Interactive API Documentation

Access the live OpenAPI documentation powered by **Swagger** and rendered via **Scalar**:

* **URL**: `http://localhost:3333/docs`

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
