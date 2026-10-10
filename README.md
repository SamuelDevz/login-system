# Login system

REST API using Node.js, Fastify, Typescript, Prisma and Zod for learnig the concepts of rest api like controllers, services, repositorys and token autentification.

## ✨ Features

- ⚡ Fastify server with logging enabled
- 🍃 PosgreSQL integration using `prisma`
- 🔑 Password hashing using `bcrypt`
- ⚡ Rate Limiting
- ✅ Request & response validation using schemas
- 🔐 Authentication using `preHandler` hooks
- 📦 Modular route structure
- ♻️ Auto-reload during development
- 🚨 Standardized error responses (Error Handling)
- 📘 Interactive API documentation using Swagger (OpenAPI)

## 🧰 Tech Stack

| Technology            | Description                       |
| --------------------- | --------------------------------- |
| **Node.js**           | JavaScript runtime                |
| **Fastify**           | Fast & low-overhead web framework |
| **Prisma**            | ORM using PosgreSQL               |
| **Zod**               | Schema and types validation       |
| **@fastify/jwt**      | JWT autentification plugin        |
| **@fastify/cookie**   | Cookie plugin                     |
| **@fastify/helmet**   | Security headers                  |
| **Bcrypt**            | Password hashing library          |
| **Swagger (OpenAPI)** | API specification & documentation |
| **Scalar**            | Modern UI API reference           |

## 📂 Project Structure

```
login-system/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── config/
│   │   └── env.ts
│   │
│   ├── errors/
│   │   └── app-error.ts
│   │
│   ├── modules/
│   │
│   ├── plugins/
│   │   ├── cookie.ts
│   │   ├── cors.ts
│   │   ├── database.ts
│   │   ├── error-handler.ts
│   │   ├── graceful-shutdown.ts
│   │   ├── healthcheck.ts
│   │   ├── helmet.ts
│   │   ├── jwt.ts
│   │   ├── scalar.ts
│   │   └── swagger.ts
│   │
│   ├── types/
│   │   ├── fastify-typed-instance.ts
│   │   └── fastify.d.ts
│   │
│   └── index.ts
├── .gitignore
├── biome.json
├── LICENCE
├── package.json
├── prisma.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

## 📦 Pre-requisites

Before of start, check of installed:

- **Node.js** 24.x
- **pnpm** 10.30+ (or npm/yarn)
- **PostgreSQL** 16+ (or Docker to run through container)
- **Git** for clone the repository

## Instalação 🛠️

1. Clone the repository:
```bash
git clone https://github.com/SamuelDevz/system-login.git
```

2. Acess the folder of project:
```bash
cd system-login
```

3. Install the dependencies:
```bash
pnpm install
```

4. Compile the project (if you are using TypeScript):
```bash
pnpm build
```

5. Run the project:
```bash
pnpm start
```

or

```bash
pnpm dev
```

## 📘 Swagger API Documentation

Interactive API documentation is available via **Scalar Reference**.

```
http://localhost:3000/docs
```

You can:

- View all available endpoints
- Inspect request & response schemas
- Test APIs directly from the browser

## 📜 Avaiable Scripts

| Script             | Description                                           |
|--------------------|-------------------------------------------------------|
| `pnpm dev`         | Start the server in development mode with hot-reload  |
| `pnpm start`       | Start the server in production mode                   |
| `pnpm build`       | Transpilate the TypeScript to Javascript              |
| `pnpm lint`        | Format and lint the code                              |
| `pnpm db:generate` | Genereate the Prisma Client basead your schema        |
| `pnpm db:migrate`  | Create and apply migrations of database (development) |

## 🌍 Environment Variables

```env
# Application
PORT=3000
NODE_ENV=production

# Database
DATABASE_URL=mysql://user:pass@localhost:3306/gateway

# JWT
JWT_SECRET=your-super-secret-key
```

## 🔒 Security

- ✅ JWT token validation
- ✅ Rate limiting
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Input sanitization
- ✅ SQL injection protection
- ✅ XSS prevention
- ✅ HTTPS enforcement

## 🚨 Pattern of erro response

All exceptions treated by aplication return the standerted JSON:

```json
{
  "message": "Email already in use",
  "code": "EMAIL_ALREADY_EXISTS"
}
```

# License

This project is licenced under the MIT license. See the `LICENSE` file for more details.