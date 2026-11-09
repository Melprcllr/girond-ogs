# Girond'ogs – Frontend

## Overview

The frontend of Girond'ogs is a responsive web application built with React and TypeScript.

It provides an interactive interface to explore dog-friendly walking spots across Gironde, France.

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Leaflet / React Leaflet
- Sass
- Vitest
- React Testing Library

## Project structure

The frontend follows an atomic design approach to organize reusable UI components.

```text
src/
├── components/
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── pages/
├── data/
├── assets/
└── ...
```

## Getting started

### Requirements

- Node.js
- npm

### Installation

From the `frontend/` directory:

```bash
npm install
```

### Development server

```bash
npm run dev
```

The application is available at:

`http://localhost:5173`

### Tests

```bash
npm test
```

### Production build

```bash
npm run build
```

## Backend connection

The frontend communicates with the Girond'ogs REST API.

The API base URL can be configured using the `VITE_API_URL` environment variable.

If this variable is not defined, the application uses `http://localhost:3000` by default.

## Project status

In development.