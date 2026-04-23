## Quick Start (Docker) ##
- ** git clone https://github.com/PatPong123/WOXA-TEST.git
- ** cd WOXA-TEST
- ** docker-compose up --build
- ** Accessing the App
 -- **Frontend: http://localhost:3000
 -- **Backend API: http://localhost:5000

## Tech Stack
This project consists of a frontend application built with Next.js and a backend API built with Node.js, Express, and utilizing Prisma for database interactions. The project is containerized using Docker.

### Frontend
- ** Framework : Next.js         
- ** UI Components : React           
- ** Styling : Tailwind CSS    
- ** State Management React Query     
- ** Icons : Lucide React    
- ** Form Validation : React Hook Form 
- ** Schema Validation : Zod             
- ** Notifications : Sonner          
- ** Type Checking : TypeScript      

### Backend
- ** Runtime :  Node.js         
- ** Framework : Express         
- ** ORM : Prisma          
- ** Database : SQLite          
- ** Type Checking : TypeScript      
## Database Setup

The backend uses SQLite as its database, managed by Prisma. The database file `dev.db` is located in `BACK-END/prisma/dev.db`.

### 1. Initialize Prisma and Generate Client

Navigate to the `BACK-END` directory and run the following commands to install Prisma dependencies, generate the Prisma client, and apply migrations:

```bash
cd BACK-END
npm install
npx prisma generate
npx prisma migrate dev --name init
```

### 2. Seed the Database (Optional)

To populate the database with initial data, run the seed script:

```bash
npx prisma db seed
```

## Installation and Running the Project (Without Docker)

### Prerequisites

- Node.js 
- npm

### Backend

1.  Navigate to the `BACK-END` directory:
    ```bash
    cd BACK-END
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the backend server:
    ```bash
    npm run dev
    ```
    The backend API will be available at `http://localhost:5000`.

### Frontend

1.  Navigate to the `FRONT-END` directory:
    ```bash
    cd FRONT-END
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the frontend development server:
    ```bash
    npm run dev
    ```
    The frontend application will be available at `http://localhost:3000`.

## Docker Usage

The project includes `Dockerfile.frontend`, `Dockerfile.backend`, and `docker-compose.yml` 

### 1. Build and Run with Docker Compose

1.  Ensure Docker and Docker Compose are installed on your system.
2.  Navigate to the root directory of the project (where `docker-compose.yml` is located):
    ```bash
    cd /path/to/WOXA-TEST
    ```
3.  Build the Docker images and start the services:
    ```bash
    docker-compose up --build
    ```
    - The frontend will be accessible at `http://localhost:3000`.
    - The backend API will be accessible at `http://localhost:5000`.

### 2. Stop Docker Services

To stop the running Docker containers:

```bash
docker-compose down
```

