

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
-- Normalize a couple of earlier sample rows if they exist.
-- (If they exist, we move them to the correct categories for nicer UI grouping.)
UPDATE skills
SET "Category" = 'Languages', "SortOrder" = 1
WHERE "Name" = 'C#';

UPDATE skills
SET "Category" = 'Backend / API', "SortOrder" = 1
WHERE "Name" = 'ASP.NET Core';

-- Seed full skills list (by "Name" to avoid duplicates).
INSERT INTO skills ("Category", "Name", "SortOrder")
SELECT
    v."Category",
    v."Name",
    v."SortOrder"
FROM (
  VALUES
    -- Languages
    ('Languages', 'C#', 1),
    ('Languages', 'C', 2),
    ('Languages', 'Python', 3),
    ('Languages', 'SQL (T-SQL)', 4),
    ('Languages', 'TypeScript', 5),
    ('Languages', 'JavaScript', 6),

    -- Backend / API
    ('Backend / API', 'ASP.NET Core Web API (.NET 6/8 LTS)', 1),
    ('Backend / API', 'ASP.NET MVC', 2),
    ('Backend / API', 'REST APIs', 3),
    ('Backend / API', 'Web Application Development', 4),

    -- Frontend
    ('Frontend', 'HTML5', 1),
    ('Frontend', 'CSS3', 2),
    ('Frontend', 'JavaScript', 3),
    ('Frontend', 'TypeScript', 4),
    ('Frontend', '.NET Web Forms', 5),

    -- Architecture
    ('Architecture', 'Layered Architecture', 1),
    ('Architecture', 'SOLID', 2),
    ('Architecture', 'OOP', 3),
    ('Architecture', 'Design Patterns', 4),
    ('Architecture', 'Dependency Injection', 5),

    -- Databases & ORM
    ('Databases & ORM', 'MS SQL Server 2019 (T-SQL)', 1),
    ('Databases & ORM', 'MySQL', 2),
    ('Databases & ORM', 'Entity Framework Core', 3),
    ('Databases & ORM', 'ADO.NET', 4),
    ('Databases & ORM', 'LINQ', 5),
    ('Databases & ORM', 'Stored Procs', 6),
    ('Databases & ORM', 'CTEs', 7),
    ('Databases & ORM', 'Indexing', 8),

    -- Security & Reporting
    ('Security & Reporting', 'JWT', 1),
    ('Security & Reporting', 'Role-based Authorization', 2),
    ('Security & Reporting', 'SSIS (ETL)', 3),
    ('Security & Reporting', 'SSRS', 4),

    -- Cloud / DevOps
    ('Cloud / DevOps', 'Team Foundation Server (TFS)', 1),
    ('Cloud / DevOps', 'Git (branching, PRs, release tagging)', 2),
    ('Cloud / DevOps', 'Azure DevOps', 3),
    ('Cloud / DevOps', 'CI/CD Pipelines', 4),
    ('Cloud / DevOps', 'Source Control & Change Management', 5),

    -- Debugging & Diagnostics
    ('Debugging & Diagnostics', 'Software debugging', 1),
    ('Debugging & Diagnostics', 'Issue reproduction', 2),
    ('Debugging & Diagnostics', 'Log analysis', 3),
    ('Debugging & Diagnostics', 'Root cause analysis', 4),
    ('Debugging & Diagnostics', 'Defect triage', 5),
    ('Debugging & Diagnostics', 'Troubleshooting production issues', 6),

    -- SDLC & Process
    ('SDLC & Process', 'Agile/Scrum', 1),
    ('SDLC & Process', 'Requirements Analysis', 2),
    ('SDLC & Process', 'Defect Tracking', 3),
    ('SDLC & Process', 'Code Reviews', 4),
    ('SDLC & Process', 'Build & Test Automation', 5),
    ('SDLC & Process', 'Release Management', 6),

    -- Tools
    ('Tools', 'Visual Studio', 1),
    ('Tools', 'VS Code', 2),
    ('Tools', 'Postman', 3),
    ('Tools', 'Swagger/OpenAPI', 4),
    ('Tools', 'PowerShell', 5),
    ('Tools', 'Jira', 6),
    ('Tools', 'ServiceNow', 7)
) AS v ("Category", "Name", "SortOrder")
WHERE NOT EXISTS (
  SELECT 1
  FROM skills s
  WHERE s."Name" = v."Name"
);

INSERT INTO projects ("Title", "Description", "Technologies", "GithubUrl", "LiveUrl", "Featured", "SortOrder")
SELECT
    'Portfolio Website',
    'Personal portfolio with Angular and ASP.NET Core.',
    ARRAY['C#', 'Angular', 'PostgreSQL']::text[],
    'https://github.com/ShaikFayaz6/fayaz-portfolio',
    NULL,
    true,
    1
WHERE NOT EXISTS (SELECT 1 FROM projects LIMIT 1);

INSERT INTO experience ("Company", "Role", "Location", "StartDate", "EndDate", "Description", "SortOrder")
SELECT
    'HCLTech',
    'Graduate Engineer Trainee ',
    'Noida, India',
    'Nov 2022',
    'July 2024',
    ARRAY['Full-stack development on enterprise web applications.']::text[],
    1
WHERE NOT EXISTS (SELECT 1 FROM experience LIMIT 1);
