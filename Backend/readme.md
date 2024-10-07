# Cogip Billing API

## Description
This project is a billing API that allows you to create, read, update, and delete invoices.

## Features
- **Invoices**: Create, read, update, and delete invoices.
- **Companies**: Create, read, update, and delete companies.
- **Contacts**: Create, read, update, and delete contacts.

## Prerequisites
- Node.js (version 16 or higher)
- npm (Node Package Manager)
- MySQL
- Docker

## Technologies Used

- **Node.js**: Executes JavaScript code on the server side
- **Express.js (v5)**: Framework for creating APIs
- **TypeScript**: Superset of JavaScript with static typing
- **Joi**: Data validation
- **MySQL & MySQL2**: Connectors for the MySQL database
- **Swagger**: API documentation (via swagger-jsdoc and swagger-ui-express)
- **dotenv**: Manages environment variables

### Development Tools
- **ts-node**: Directly executes TypeScript files without compiling them
- **@types/express, @types/node**: Types for Express and Node.js

## Installation

Follow these steps to install and configure the project locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/.../backend.git
   cd backend

2. **Install dependencies:** :

```bash
    	npm install
```
3. **Configure environment variable** : 
Create a .env file at the root of the project and add the necessary variables, such as the MySQL database configuration:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
```

4. **Compile the TypeScript project** :

```bash
npm run build
```
5. **Start the server:** :

- In production :
```bash
npm start
```

- In development mode :
```bash
npm run dev
```

- The server will be available at http://localhost:3000.

## Documentation API

The API documentation is available at the following address:

[http://localhost:3000/api-docs/](http://localhost:3000/api-docs/)

ou will find detailed information about the API endpoints, parameters, and example requests there.