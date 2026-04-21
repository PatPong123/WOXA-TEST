
## Quick Start (Docker) ##
- ** git clone https://github.com/PatPong123/WOXA-TEST.git
- ** cd broker-management
- ** docker-compose up --build
- ** Accessing the App
 -- **Frontend: http://localhost:3000
 -- **Backend API: http://localhost:5000

## Tech Stack ##
### Frontend
Framework: Next.js (App Router)

State Management: TanStack Query v5

Form Handling: React Hook Form

Validation: Zod

Styling: Tailwind CSS

Icons: Lucide React

Notifications: Sonner
- ** State Management: React Hook Form
### Backend
- ** Runtime: Node.js (Express)
- ** ORM: Prisma (SQLite/PostgreSQL)
- ** Integrations: LINE Messaging API, MQTT (IoT Connectivity)

### Database
- **MySQL**  - Relational database
- **Pisma ORM** - Type-safe SQL query builder


### Development Tools
- **TypeScript** - Static type checking
- **Vitest** - Fast unit testing framework
- **Prettier** - Code formatter
- **ESBuild** - Fast JavaScript bundler
- **tsx** - TypeScript execution for Node.js

## 📋 Project Structure

```
├── app/
│   ├── layout.tsx       # Root layout และ QueryClientProvider
│   ├── page.tsx         # หน้าหลัก (Broker List)
│   ├── create/          # หน้าสำหรับสร้างโบรกเกอร์
│   └── providers.tsx    # TanStack Query & Toast Providers
├── components/          # UI Components ต่างๆ
├── hooks/               # Custom React Hooks
└── types/               # Type Definitions (Zod Schemas)
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (recommended: 20+)
- **pnpm** 10+ (or npm/yarn)
- **MySQL** 8.0+ or **TiDB** instance

### Installation

1. **Clone the repository**
  
   git clone <repository-url>
   cd broker-management

2. **Install dependencies**

    npm install

3. **Set up environment variables**
   
   Create a `.env.local` file in the project root:
   ```env
   # Database
   DATABASE_URL=mysql://user:password@localhost:3306/broker_management?sslaccept=strict
   
   # Session
   JWT_SECRET=your-secret-key-change-in-production
   
   # Server
   NODE_ENV=development
   PORT=3000
   ```

4. **Set up the database**
   
   Ensure your MySQL/TiDB database is running, then push the schema:
   ```bash
   cd BACK-END
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

   The application will be available at `http://localhost:3000`

## 📖 Available Commands

```bash
# Development
pnpm dev              # Start dev server with hot reload

# Build & Production
pnpm build            # Build for production
pnpm start            # Start production server

# Database
pnpm db:push          # Generate and apply migrations

# Code Quality
pnpm check            # TypeScript type checking
pnpm format           # Format code with Prettier
pnpm test             # Run tests with Vitest
```

## 🗄️ Database Setup

### Local MySQL

1. **Install MySQL** (if not already installed)
   ```bash
   # macOS
   brew install mysql
   
   # Ubuntu/Debian
   sudo apt-get install mysql-server
   
   # Windows - download from https://dev.mysql.com/downloads/mysql/
   ```

2. **Start MySQL service**
   ```bash
   # macOS
   brew services start mysql
   
   # Ubuntu/Debian
   sudo systemctl start mysql
   
   # Windows - MySQL runs as a service
   ```

3. **Create database and user**
   ```bash
   mysql -u root -p
   ```
   
   ```sql
   CREATE DATABASE broker_management;
   CREATE USER 'broker_user'@'localhost' IDENTIFIED BY 'secure_password';
   GRANT ALL PRIVILEGES ON broker_management.* TO 'broker_user'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

4. **Update `.env.local`**
   ```env
   DATABASE_URL=mysql://broker_user:secure_password@localhost:3306/broker_management?sslaccept=strict
   ```

### Docker

1. **Run MySQL in Docker**
   ```bash
   docker run --name broker-mysql \
     -e MYSQL_ROOT_PASSWORD=root_password \
     -e MYSQL_DATABASE=broker_management \
     -e MYSQL_USER=broker_user \
     -e MYSQL_PASSWORD=secure_password \
     -p 3306:3306 \
     -d mysql:8.0
   ```

2. **Update `.env.local`**
   ```env
   DATABASE_URL=mysql://broker_user:secure_password@localhost:3306/broker_management?sslaccept=strict
   ```

### TiDB Cloud

1. **Create a TiDB cluster** at https://tidbcloud.com

2. **Get your connection string** from the cluster details

3. **Update `.env.local`**
   ```env
   DATABASE_URL=mysql://user:password@gateway01.us-west-2.prod.aws.tidbcloud.com:4000/broker_management?sslaccept=strict
   ```

## 🔐 Authentication

The application uses simple session-based authentication with JWT tokens. By default, users can log in with any email address. For production, implement proper authentication:

- Add password hashing (bcrypt)
- Implement email verification
- Add OAuth integration (Google, GitHub, etc.)
- Implement role-based access control

See `/server/_core/session.ts` for session token management.

## 📊 API Endpoints

### Brokers

**Create Broker**
```
POST /api/trpc/brokers.create
```

**List Brokers**
```
GET /api/trpc/brokers.list?search=name&broker_type=cfd
```

**Get Broker by Slug**
```
GET /api/trpc/brokers.getBySlug?slug=broker-name
```

## 🧪 Testing

Run all tests:
```bash
pnpm test
```

Run tests in watch mode:
```bash
pnpm test -- --watch
```

The project includes tests for:
- Broker creation with validation
- Broker listing with search and filter
- Slug uniqueness enforcement
- URL validation for logo and website fields

## 🎨 Styling

The application uses Tailwind CSS 4 with a custom editorial design system. Key style files:

- `client/src/index.css` - Global styles, typography, and color palette
- `tailwind.config.ts` - Tailwind configuration

### Color Palette

- **Background**: Cream (#FBF9F4)
- **Foreground**: Dark charcoal (#1A1A1A)
- **Accent**: Warm gold (#D4A574)
- **Border**: Light gray (#E8E6E1)

### Typography

- **Headlines**: Bodoni Moda (Didone serif)
- **Body**: Lora (serif)
- **UI**: System sans-serif

## 🚢 Deployment

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

### Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create app
heroku create broker-directory

# Set environment variables
heroku config:set DATABASE_URL=mysql://...
heroku config:set JWT_SECRET=your-secret-key

# Deploy
git push heroku main
```

### Self-Hosted

1. **Build the application**
   ```bash
   pnpm build
   ```

2. **Start the server**
   ```bash
   pnpm start
   ```

3. **Use a process manager** (PM2, systemd, etc.) to keep the server running

## 🐛 Troubleshooting

### Database Connection Issues

If you get a database connection error:

1. Verify MySQL/TiDB is running
2. Check the `DATABASE_URL` format
3. Ensure the database exists
4. Verify user credentials and permissions

```bash
# Test connection
mysql -u user -p -h host -D broker_management
```

### Port Already in Use

If port 3000 is already in use:

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 pnpm dev
```


