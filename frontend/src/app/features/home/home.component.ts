import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Hero -->
    <section class="hero">
      <div class="hero-inner">
        <span class="eyebrow">Full Stack .NET Developer</span>
        <h1>Fayaz<br><em>Shaik</em></h1>
        <p class="tagline">
          Building enterprise-grade web applications with C#, ASP.NET Core,
          Angular, and cloud infrastructure. MS CS candidate at UNT, May 2026.
        </p>
        <div class="hero-actions">
          <a routerLink="/projects" class="btn-primary">View Projects</a>
          <a routerLink="/contact" class="btn-ghost">Get in Touch</a>
        </div>
        <div class="hero-meta">
          <span>Denton, TX</span>
          <span class="sep">·</span>
          <span>Open to Relocation</span>
          <span class="sep">·</span>
          <a href="https://linkedin.com/in/fayaz-shaik64" target="_blank" rel="noopener">LinkedIn</a>
          <span class="sep">·</span>
          <a href="https://github.com/ShaikFayaz6/" target="_blank" rel="noopener">GitHub</a>
        </div>
      </div>
      <div class="hero-scroll-hint">scroll</div>
    </section>

    <!-- Featured Projects -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <h2>Featured Projects</h2>
          <a routerLink="/projects" class="see-all">All projects →</a>
        </div>

        @if (loading()) {
          <div class="skeleton-grid">
            <div class="skeleton-card" *ngFor="let i of [1,2]"></div>
          </div>
        } @else {
          <div class="projects-grid">
            @for (project of projects(); track project.id) {
              <article class="project-card">
                <div class="card-body">
                  <h3>{{ project.title }}</h3>
                  <p>{{ project.description }}</p>
                  <div class="tech-stack">
                    @for (tech of project.technologies.slice(0,5); track tech) {
                      <span class="tag">{{ tech }}</span>
                    }
                    @if (project.technologies.length > 5) {
                      <span class="tag muted">+{{ project.technologies.length - 5 }}</span>
                    }
                  </div>
                </div>
                <div class="card-footer">
                  @if (project.githubUrl) {
                    <a [href]="project.githubUrl" target="_blank" rel="noopener" class="card-link">GitHub →</a>
                  }
                  @if (project.liveUrl) {
                    <a [href]="project.liveUrl" target="_blank" rel="noopener" class="card-link">Live →</a>
                  }
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="stats-band">
      <div class="container">
        <div class="stats-grid">
          @for (stat of stats; track stat.label) {
            <div class="stat">
              <span class="stat-num">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section cta-section">
      <div class="container cta-inner">
        <h2>Available for internships &amp; junior roles</h2>
        <p>Looking for opportunities in full stack .NET development, cloud-native applications, and software engineering.</p>
        <a routerLink="/contact" class="btn-primary">Let's connect</a>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      justify-content: center; padding: 0 2rem;
      position: relative; overflow: hidden;
    }
    .hero::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,0,0,0.03) 0%, transparent 70%);
      pointer-events: none;
    }
    .hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; padding-top: 5rem; }
    .eyebrow {
      display: inline-block; font-size: 0.75rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent);
      font-weight: 600; margin-bottom: 1.5rem;
    }
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(4rem, 10vw, 8rem);
      line-height: 0.95; letter-spacing: -0.03em;
      color: var(--ink); margin: 0 0 2rem; font-weight: 700;
    }
    h1 em { color: var(--ink-muted); font-style: italic; }
    .tagline {
      max-width: 520px; font-size: 1.0625rem; line-height: 1.7;
      color: var(--ink-muted); margin-bottom: 2.5rem;
    }
    .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem; }
    .hero-meta {
      display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap;
      font-size: 0.8125rem; color: var(--ink-subtle);
    }
    .hero-meta a { color: var(--ink-muted); text-decoration: none; }
    .hero-meta a:hover { color: var(--ink); }
    .sep { opacity: 0.4; }
    .hero-scroll-hint {
      position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
      font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase;
      color: var(--ink-subtle); writing-mode: vertical-rl;
    }

    /* Buttons */
    .btn-primary {
      display: inline-block; padding: 0.75rem 1.75rem;
      background: var(--ink); color: #fff;
      text-decoration: none; font-size: 0.875rem;
      font-weight: 500; letter-spacing: 0.04em;
      transition: opacity 0.2s;
    }
    .btn-primary:hover { opacity: 0.8; }
    .btn-ghost {
      display: inline-block; padding: 0.75rem 1.75rem;
      border: 1px solid var(--border-dark); color: var(--ink);
      text-decoration: none; font-size: 0.875rem;
      font-weight: 500; letter-spacing: 0.04em;
      transition: background 0.2s;
    }
    .btn-ghost:hover { background: var(--ink); color: #fff; }

    /* Section */
    .section { padding: 6rem 2rem; }
    .container { max-width: 1100px; margin: 0 auto; }
    .section-header {
      display: flex; align-items: baseline;
      justify-content: space-between; margin-bottom: 3rem;
    }
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      letter-spacing: -0.02em; color: var(--ink); margin: 0;
    }
    .see-all {
      font-size: 0.8125rem; color: var(--ink-muted); text-decoration: none;
      letter-spacing: 0.04em; font-weight: 500;
    }
    .see-all:hover { color: var(--ink); }

    /* Projects grid */
    .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5px; background: var(--border); }
    .project-card {
      background: var(--paper); padding: 2.5rem;
      display: flex; flex-direction: column; justify-content: space-between;
      transition: background 0.2s;
    }
    .project-card:hover { background: #fafafa; }
    .card-body h3 { font-size: 1.125rem; font-weight: 600; margin: 0 0 0.75rem; color: var(--ink); }
    .card-body p { font-size: 0.9rem; line-height: 1.7; color: var(--ink-muted); margin: 0 0 1.5rem; }
    .tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag {
      font-size: 0.7rem; padding: 0.25rem 0.6rem;
      background: var(--surface); color: var(--ink-muted);
      letter-spacing: 0.04em; font-weight: 500;
    }
    .tag.muted { opacity: 0.6; }
    .card-footer { margin-top: 2rem; display: flex; gap: 1.25rem; }
    .card-link {
      font-size: 0.8125rem; color: var(--ink); text-decoration: none;
      font-weight: 500; letter-spacing: 0.04em;
    }
    .card-link:hover { opacity: 0.6; }

    /* Skeleton */
    .skeleton-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 1.5px; background: var(--border); }
    .skeleton-card { background: var(--paper); height: 260px; position: relative; overflow: hidden; }
    .skeleton-card::after {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.03) 50%, transparent 100%);
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }

    /* Stats */
    .stats-band { background: var(--ink); padding: 4rem 2rem; }
    .stats-grid { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 2rem; }
    .stat { text-align: center; }
    .stat-num { display: block; font-family: 'Playfair Display', serif; font-size: 3rem; color: #fff; font-weight: 700; letter-spacing: -0.03em; }
    .stat-label { font-size: 0.75rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; }

    /* CTA */
    .cta-section { background: var(--surface); }
    .cta-inner { text-align: center; }
    .cta-inner p { color: var(--ink-muted); max-width: 480px; margin: 1rem auto 2rem; line-height: 1.7; }
  `]
})
export class HomeComponent implements OnInit {
  private svc = inject(PortfolioService);
  projects = signal<Project[]>([]);
  loading = signal(true);

  stats = [
    { value: '3+',  label: 'Years Experience' },
    { value: '2',   label: 'Major Projects'   },
    { value: '8+',  label: 'Technologies'     },
    { value: 'May 2026', label: 'MS CS — UNT' }
  ];

  ngOnInit() {
    this.svc.getFeaturedProjects().subscribe({
      next: p  => { this.projects.set(p); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
