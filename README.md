# Fayaz Shaik — Portfolio Website

Full-stack personal portfolio built with **Angular 17**, **ASP.NET Core 8 Web API**, **Supabase (PostgreSQL)**, deployed via **Vercel**, source-controlled on **GitHub**.

---

## Tech Stack

| Layer      | Technology                                    |
|------------|-----------------------------------------------|
| Frontend   | Angular 17 (standalone components, signals)   |
| Backend    | ASP.NET Core 8 Web API + EF Core              |
| Database   | Supabase (PostgreSQL via Npgsql)              |
| Hosting    | Vercel (frontend) + Railway/Render (backend)  |
| CI/CD      | GitHub Actions                                |

---

## Project Structure

```
fayaz-portfolio/
├── frontend/                   # Angular 17 SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── models/     # TypeScript interfaces
│   │   │   │   └── services/   # PortfolioService (HTTP)
│   │   │   ├── features/       # Page components
│   │   │   │   ├── home/
│   │   │   │   ├── about/
│   │   │   │   ├── skills/
│   │   │   │   ├── projects/
│   │   │   │   ├── experience/
│   │   │   │   └── contact/
│   │   │   └── shared/
│   │   │       └── components/ # Nav, Footer
│   │   ├── environments/
│   │   └── styles.css
│   ├── angular.json
│   └── package.json
│
├── backend/
│   └── Portfolio.Api/
│       ├── Controllers/        # Skills, Projects, Experience, Contact
│       ├── Data/               # EF Core DbContext
│       ├── Models/             # C# model classes
│       ├── Program.cs
│       └── appsettings.json
│
├── supabase/
│   └── schema.sql              # Tables + RLS + seed data
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml           # Build → Test → Deploy
│
├── vercel.json                 # Vercel SPA routing config
└── README.md
```

---

## Quick Start

### 1. Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run `supabase/schema.sql`
3. Note your **Project Ref**, **DB Password**, and **Anon Key**

### 2. Backend (.NET 8)

```bash
cd backend/Portfolio.Api

# Update appsettings.json with your Supabase connection string:
# Host=db.<REF>.supabase.co;Port=5432;Database=postgres;
# Username=postgres;Password=<PASSWORD>;SSL Mode=Require;Trust Server Certificate=true

dotnet restore
dotnet run
# API runs at http://localhost:5000
# Swagger UI at http://localhost:5000/swagger
```

### 3. Frontend (Angular)

```bash
cd frontend
npm install
npm start
# App runs at http://localhost:4200
```

### 4. Environment Variables

**Backend** — `appsettings.json` or environment variables:
```
ConnectionStrings__Supabase = <your connection string>
AllowedOrigins              = http://localhost:4200,https://your-domain.vercel.app
```

**Frontend** — `src/environments/environment.prod.ts`:
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.railway.app'
};
```

---

## Deployment

### Frontend → Vercel

1. Push repo to GitHub
2. Import project at [vercel.com](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Build command: `npm run build`
5. Output directory: `dist/fayaz-portfolio/browser`

### Backend → Railway (recommended for .NET)

1. Go to [railway.app](https://railway.app) → New Project → GitHub repo
2. Select `backend/Portfolio.Api` as root
3. Add environment variable: `ConnectionStrings__Supabase`
4. Railway auto-detects .NET and deploys

### GitHub Actions Secrets

Add these in **GitHub → Settings → Secrets**:

| Secret               | Value                          |
|----------------------|--------------------------------|
| `VERCEL_TOKEN`       | From Vercel account settings   |
| `VERCEL_ORG_ID`      | From `.vercel/project.json`    |
| `VERCEL_PROJECT_ID`  | From `.vercel/project.json`    |

---

## API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/api/skills`             | All skills grouped       |
| GET    | `/api/projects`           | All projects             |
| GET    | `/api/projects/featured`  | Featured projects only   |
| GET    | `/api/experience`         | Work experience timeline |
| POST   | `/api/contact`            | Submit contact message   |

Swagger UI available at `/swagger` in development.

---

## Contact

**Fayaz Shaik**  
shaikfayaz0064@gmail.com | [LinkedIn](https://linkedin.com/in/fayaz-shaik64) | [GitHub](https://github.com/fayaz-shaik64)
