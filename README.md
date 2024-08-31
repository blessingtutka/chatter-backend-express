# chatter-backend Integration Documentation

## Overview

A simple chat application in express

## Folder Structure

```
|--- src
|    |--- config
     |--- helpers
|    |--- modules
|    |--- shared
|    |--- utils
|    |--- app.ts
|    |--- main.ts
|--- .env.local
|--- .gitignore
|--- API_SCHEMA.json
|--- package.json
|--- tsconfig.json
```

## Dependencies (Dev)

- Node.js
- TypeScript
- Express
- ts-node-dev
- Swagger UI

## LIVE DEMO

- [Chatter backend](https://chatter-backend.netlify.app/)

## API DOCUMENTATION

- [API DOC](https://chatter-backend.netlify.app/api/doc)

## Getting Started

Before you begin, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (Node Package Manager, included with Node.js)
- [Express](https://expressjs.com/) (Express Documentation)
- [Git](https://git-scm.com/)

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```sh
git clone https://github.com/your-username/[app-name].git
cd [app-name]
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies.

```sh
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add your environment-specific variables. You can use the provided `.env.example` file as a reference.

```sh
cp .env.example .env
```

Edit the `.env` file to match your environment configuration.

### 4. Compile TypeScript

Compile the TypeScript code to JavaScript.

```sh
npm run build
```

### 5. Run the Development Server

Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.

```sh
npm run dev
```

### 6. Run the Production Server

To run the application in a production environment, use the following command:

```sh
npm run start
```

### 7. Verify the Setup

Open your browser and navigate to `http://localhost:5100/api/v1/` to verify that the application is running correctly.
