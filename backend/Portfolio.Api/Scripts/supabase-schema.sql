-- Run once in Supabase: SQL Editor → New query → Run
-- Full schema for Portfolio.Api (EF Core + Npgsql, quoted PascalCase columns).

-- ── contact_messages ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_messages (
    "Id" SERIAL NOT NULL,
    "Name" text NOT NULL,
    "Email" text NOT NULL,
    "Message" text NOT NULL,
    "CreatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "PK_contact_messages" PRIMARY KEY ("Id")
);

-- ── skills ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
    "Id" SERIAL NOT NULL,
    "Category" text NOT NULL,
    "Name" text NOT NULL,
    "SortOrder" integer NOT NULL,
    CONSTRAINT "PK_skills" PRIMARY KEY ("Id")
);

-- ── projects ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
    "Id" SERIAL NOT NULL,
    "Title" text NOT NULL,
    "Description" text NOT NULL,
    "Technologies" text[] NOT NULL DEFAULT '{}',
    "GithubUrl" text,
    "LiveUrl" text,
    "Featured" boolean NOT NULL DEFAULT false,
    "SortOrder" integer NOT NULL,
    CONSTRAINT "PK_projects" PRIMARY KEY ("Id")
);

-- ── experience ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experience (
    "Id" SERIAL NOT NULL,
    "Company" text NOT NULL,
    "Role" text NOT NULL,
    "Location" text NOT NULL,
    "StartDate" text NOT NULL,
    "EndDate" text,
    "Description" text[] NOT NULL DEFAULT '{}',
    "SortOrder" integer NOT NULL,
    CONSTRAINT "PK_experience" PRIMARY KEY ("Id")
);

-- Optional: sample rows (safe to run once; comment out if you already have data)
INSERT INTO skills ("Category", "Name", "SortOrder")
SELECT 'Backend', 'C#', 1
WHERE NOT EXISTS (SELECT 1 FROM skills LIMIT 1);

INSERT INTO skills ("Category", "Name", "SortOrder")
SELECT 'Backend', 'ASP.NET Core', 2
WHERE NOT EXISTS (SELECT 1 FROM skills WHERE "Name" = 'ASP.NET Core');

INSERT INTO projects ("Title", "Description", "Technologies", "GithubUrl", "LiveUrl", "Featured", "SortOrder")
SELECT
    'Portfolio Website',
    'Personal portfolio with Angular and ASP.NET Core.',
    ARRAY['C#', 'Angular', 'PostgreSQL']::text[],
    'https://github.com/fayaz-shaik64',
    NULL,
    true,
    1
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO experience ("Company", "Role", "Location", "StartDate", "EndDate", "Description", "SortOrder")
SELECT
    'HCLTech',
    'Software Engineer',
    'India',
    '2021',
    '2024',
    ARRAY['Full-stack development on enterprise web applications.']::text[],
    1
WHERE NOT EXISTS (SELECT 1 FROM experience LIMIT 1);
