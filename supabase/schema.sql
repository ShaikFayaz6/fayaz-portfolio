-- ============================================================
-- Fayaz Shaik Portfolio — Supabase Schema
-- Run this in Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- SKILLS
create table if not exists public.skills (
  id         serial primary key,
  category   text not null,
  name       text not null,
  sort_order int  default 0
);

-- PROJECTS
create table if not exists public.projects (
  id           serial primary key,
  title        text    not null,
  description  text    not null,
  technologies text[]  not null default '{}',
  github_url   text,
  live_url     text,
  featured     boolean default false,
  sort_order   int     default 0
);

-- EXPERIENCE
create table if not exists public.experience (
  id           serial primary key,
  company      text not null,
  role         text not null,
  location     text not null,
  start_date   text not null,
  end_date     text,           -- null = Present
  description  text[] not null default '{}',
  sort_order   int    default 0
);

-- CONTACT MESSAGES
create table if not exists public.contact_messages (
  id         serial primary key,
  name       text      not null,
  email      text      not null,
  message    text      not null,
  created_at timestamptz default now()
);

-- ────────────────────────────────────────────────────────────
-- Row Level Security
-- ────────────────────────────────────────────────────────────
alter table public.skills            enable row level security;
alter table public.projects          enable row level security;
alter table public.experience        enable row level security;
alter table public.contact_messages  enable row level security;

-- Public read for portfolio data
create policy "public_read_skills"      on public.skills      for select using (true);
create policy "public_read_projects"    on public.projects    for select using (true);
create policy "public_read_experience"  on public.experience  for select using (true);

-- Anyone can insert a contact message (no read-back)
create policy "public_insert_contact"   on public.contact_messages for insert with check (true);

-- ────────────────────────────────────────────────────────────
-- Seed Data
-- ────────────────────────────────────────────────────────────

-- Skills
insert into public.skills (category, name, sort_order) values
  ('Languages',        'C#',                      1),
  ('Languages',        'TypeScript',               2),
  ('Languages',        'Python',                   3),
  ('Languages',        'SQL (T-SQL)',               4),
  ('Languages',        'JavaScript',               5),
  ('Backend / API',    'ASP.NET Core Web API',     1),
  ('Backend / API',    'ASP.NET MVC',              2),
  ('Backend / API',    'Entity Framework Core',    3),
  ('Backend / API',    'RESTful API Design',       4),
  ('Backend / API',    'ADO.NET',                  5),
  ('Frontend',         'Angular',                  1),
  ('Frontend',         'HTML5 / CSS3',             2),
  ('Frontend',         'TypeScript',               3),
  ('Databases',        'MS SQL Server 2019',       1),
  ('Databases',        'MySQL',                    2),
  ('Databases',        'Supabase / PostgreSQL',    3),
  ('Cloud / DevOps',   'Azure DevOps',             1),
  ('Cloud / DevOps',   'Git / GitHub',             2),
  ('Cloud / DevOps',   'CI/CD Pipelines',          3),
  ('Cloud / DevOps',   'TFS',                      4),
  ('Architecture',     'Layered Architecture',     1),
  ('Architecture',     'SOLID Principles',         2),
  ('Architecture',     'OOP & Design Patterns',    3),
  ('Architecture',     'Dependency Injection',     4),
  ('Tools',            'Visual Studio / VS Code',  1),
  ('Tools',            'Postman / Swagger',        2),
  ('Tools',            'Jira / ServiceNow',        3),
  ('Tools',            'SSIS / SSRS',              4);

-- Projects
insert into public.projects (title, description, technologies, github_url, featured, sort_order) values
(
  'Financial Transaction Web Application',
  'Web-based financial transaction management system built with ASP.NET Core MVC. Implemented T-SQL stored procedures, EF Core code-first data models, unit/integration tests, and full Swagger documentation.',
  array['C#', 'ASP.NET Core MVC', '.NET 6', 'MS SQL Server', 'Entity Framework Core', 'ADO.NET', 'T-SQL', 'Swagger/OpenAPI', 'Git'],
  'https://github.com/fayaz-shaik64',
  true,
  1
),
(
  'Pricing, Transportation & Shipping Management',
  'Full-stack enterprise application for an Oil & Gas client at HCLTech. Handled complex T-SQL stored procedures, participated in design reviews, tracked defects via Jira/ServiceNow, and managed source control via TFS and Git.',
  array['C#', 'ASP.NET Core Web API', 'ASP.NET MVC', 'MS SQL Server 2019', 'EF Core', 'ADO.NET', 'SSIS', 'Azure DevOps', 'TFS', 'Git'],
  null,
  true,
  2
),
(
  'IoT Cloud Analytics Dashboard',
  'Proof-of-concept IoT solution publishing sensor telemetry to the cloud with a mobile-facing analytics dashboard. Built API integrations for data ingestion and real-time visualization.',
  array['C#', '.NET', 'IoT', 'Cloud APIs', 'REST', 'Analytics'],
  null,
  false,
  3
);

-- Experience
insert into public.experience (company, role, location, start_date, end_date, description, sort_order) values
(
  'University of North Texas',
  'Instructional Assistant — Computer Science',
  'Denton, TX',
  'May 2025',
  null,
  array[
    'Supported graduate-level instruction on algorithm design, complexity analysis, divide-and-conquer, greedy algorithms, and dynamic programming using Java/Python.',
    'Graded assignments and conducted office hours to help students debug implementations and improve problem-solving skills.'
  ],
  1
),
(
  'HCLTech',
  'Graduate Engineer Trainee — Full Stack Developer',
  'Noida, India',
  'Nov 2022',
  'Jul 2024',
  array[
    'Built enterprise web applications using C#, ASP.NET Core Web API (.NET 6/8), ASP.NET MVC, and Entity Framework Core across the full SDLC.',
    'Designed and optimized MS SQL Server 2019 schemas, stored procedures, CTEs, and indexes using EF Core and ADO.NET.',
    'Participated in code reviews, design reviews, and project planning with technical leads and business analysts.',
    'Analyzed application issues through defect reproduction, log analysis, and root cause analysis; tracked via Jira and ServiceNow.'
  ],
  2
),
(
  'Verzeo',
  '.NET Intern — IoT & Cloud Applications',
  'Bangalore, India',
  'Mar 2021',
  'May 2021',
  array[
    'Built IoT proof-of-concept solutions in C#/.NET with cloud data publishing, API integrations for sensor telemetry, and mobile-facing analytics dashboards.'
  ],
  3
),
(
  'MVARO — Mergers & Acquisitions',
  '.NET Intern — IoT Engineering',
  'Bangalore, India',
  'Jan 2021',
  'Feb 2021',
  array[
    'Built working IoT prototypes using C#/.NET fundamentals with sensor integration.',
    'Developed a water-level monitoring prototype with data processing logic and stakeholder documentation.'
  ],
  4
);
