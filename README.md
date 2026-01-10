# Model Development Dashboard

## Description

Model Development Dashboard is a React- and TypeScript-based web application for tracking the lifecycle of data and machine learning projects. It provides a unified view of project metadata, governance status, operational events, and data lineage. Teams can use it to quickly understand the state of a project, inspect recent operations, and ensure governance and compliance requirements are met.

## Table of Contents

- [Model Development Dashboard](#model-development-dashboard)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation Instructions](#installation-instructions)
    - [Prerequisites](#prerequisites)
    - [Clone the repository](#clone-the-repository)
    - [Install dependencies](#install-dependencies)
    - [Run the development server](#run-the-development-server)
    - [Build for production](#build-for-production)
  - [Usage](#usage)
  - [Features](#features)
  - [Acknowledgments](#acknowledgments)

## Installation Instructions

### Prerequisites

- Node.js (v25.1.0 recommended)
- npm (comes with Node.js) or an alternative package manager such as pnpm or yarn

### Clone the repository

```bash
git clone https://github.com/gokhankaraoglu/model-development-dashboard
cd model-development-dashboard
```

### Install dependencies

Using yarn:

```bash
yarn
```

Or with npm:

```bash
npm install
```

### Run the development server

```bash
yarn dev
```

By default, Vite will start the app on a local port (commonly http://localhost:5173).

### Build for production

```bash
yarn build
```

This command compiles the TypeScript and bundles the application into the dist directory.

## Usage

Once the development server is running:

1. Open the app in your browser.
2. Select a project in the project header to view its details.
3. Explore the main dashboard sections:
   - Project overview: key metadata such as owner, governance manager, status, and objectives.
   - Data tables summary: a high-level view of project-related tables.
   - Governance status: approvals, compliance checklist, and stakeholders.
   - Operations timeline: recent operational events grouped by date.
   - Data lineage view: a visual representation of data flow between tables.

## Features

- **Project-centric overview**: See project metadata, ownership, governance contacts, and objectives in one place.
- **Operations timeline**: View recent operations, grouped by day, and open a modal to browse and filter all operations by title or date.
- **Governance status panel**: Track approvals, compliance items, and key stakeholders.
- **Data lineage visualization**: Inspect how data moves between source and derived tables in the project.
- **Responsive layout**: Card-based layout built with React and Tailwind CSS, optimized for modern browsers.
- **Type-safe store**: State management powered by Redux Toolkit and TypeScript.

## Acknowledgments

- Built with [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), and [Vite](https://vite.dev/).
- UI styling powered by [Tailwind CSS](https://tailwindcss.com/).
- State management using [Redux Toolkit](https://redux-toolkit.js.org/).
- Date handling powered by [dayjs](https://day.js.org/).

```

```
