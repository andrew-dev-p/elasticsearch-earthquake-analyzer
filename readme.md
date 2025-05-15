# Earthquake Watch 🌎

A **earthquake monitoring platform** built with **React**, **Vite**, **Express**, and **Elasticsearch**. Users can **search for earthquakes** worldwide using various criteria including **magnitude**, **location**, and **time period** — all powered by a robust **Elasticsearch backend** for fast and efficient querying.

## 🔍 Description

This app enables users to:
- **Search for earthquakes** by type, magnitude, and location
- **Filter results** by date range (7, 14, 21, or 30 days)
- **Sort earthquakes** by magnitude (ascending or descending)
- **View detailed information** about each earthquake event
- **Switch between grid and list views** for better data visualization

## 📁 Project Structure

```
.
├── client/   # React frontend (Vite, TypeScript, TailwindCSS, ShadCN)
└── server/   # Express backend with Elasticsearch integration
```

## 🚀 Features

- **Advanced search criteria** with multiple parameters
- **Actual earthquake data** from reliable sources
- **Responsive UI** with grid and list view options
- **Color-coded magnitude indicators** for quick risk assessment
- **Interactive filtering** for precise data retrieval
- **Detailed earthquake information** including coordinates, depth, and type

## 🛠️ Tech Stack

### Frontend

- **React 19**
- **TypeScript**
- **Vite 6**
- **TailwindCSS 4**
- **ShadCN UI Components**
- **Axios** for API requests
- **Lucide React** for iconography

### Backend

- **Express** server
- **Elasticsearch** for powerful search capabilities
- **Node.js** runtime
- **CORS** for cross-origin resource sharing

## ⚙️ Setup

### 1. Clone the Repo

```bash
git clone https://github.com/andrew-dev-p/elasticsearch-earthquake-analyzer
cd elasticsearch-earthquake-analyzer
```

### 2. Setup Client

```bash
cd client
npm install
npm run dev
```

### 3. Setup Server

```bash
cd server
npm install
```

### 4. Setup Elasticsearch

- Install Elasticsearch or use a cloud-based solution
- Configure the client connection in `server/lib/elasticsearch-client.js`
- Run the data ingestion script to populate the database

## 🧪 Running Locally

### Client

```bash
cd client
npm run dev
```

### Server

```bash
cd server
npm run dev
```
