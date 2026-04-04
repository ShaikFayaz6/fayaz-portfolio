import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../core/models/models';
import { externalHref } from '../../core/utils/external-url';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">Projects</span>
        <h1>Things I've<br><em>Built</em></h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading()) {
          <div class="loading-text">Loading projects…</div>
        } @else if (error()) {
          <div class="error-text">Could not load projects.</div>
        } @else {
          <div class="projects-list">
            @for (project of projects(); track project.id; let i = $index) {
              <article class="project-row">
                <div class="project-num">{{ (i + 1).toString().padStart(2, '0') }}</div>
                <div class="project-body">
                  <div class="project-header">
                    <h2>{{ project.title }}</h2>
                    <div class="project-links">
                      @if (externalHref(project.githubUrl); as gh) {
                        <a [href]="gh" target="_blank" rel="noopener">GitHub →</a>
                      }
                      @if (externalHref(project.liveUrl); as live) {
                        <a [href]="live" target="_blank" rel="noopener">Live →</a>
                      }
                    </div>
                  </div>
                  <p>{{ project.description }}</p>
                  <div class="tech-stack">
                    @for (tech of project.technologies; track tech) {
                      <span class="tag">{{ tech }}</span>
                    }
                  </div>
                </div>
              </article>
            }
          </div>
        }
      </div>
    </section>
  `,
  styles: [`
    .page-hero { padding: 10rem 2rem 4rem; background: var(--surface); }
    .container { max-width: 1100px; margin: 0 auto; }
    .eyebrow { display: inline-block; font-size: 0.75rem; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--accent); font-weight: 600; margin-bottom: 1rem; }
    h1 { font-family: 'Playfair Display', serif;
      font-size: clamp(3rem, 8vw, 5.5rem); line-height: 1;
      letter-spacing: -0.03em; color: var(--ink); margin: 0; }
    h1 em { color: var(--ink-muted); font-style: italic; }
    .section { padding: 5rem 2rem; }

    .projects-list { display: flex; flex-direction: column; }
    .project-row {
      display: grid; grid-template-columns: 64px 1fr;
      gap: 2.5rem; padding: 3rem 0;
      border-bottom: 1px solid var(--border);
      align-items: start;
    }
    .project-row:first-child { border-top: 1px solid var(--border); }
    .project-num {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem; color: var(--border-dark);
      font-weight: 700; line-height: 1; padding-top: 0.25rem;
    }
    .project-header {
      display: flex; justify-content: space-between;
      align-items: flex-start; gap: 1rem; margin-bottom: 1rem;
    }
    h2 { font-size: 1.25rem; font-weight: 600; color: var(--ink);
      margin: 0; letter-spacing: -0.01em; }
    .project-links { display: flex; gap: 1.25rem; flex-shrink: 0; }
    .project-links a { font-size: 0.8125rem; color: var(--ink-muted);
      text-decoration: none; font-weight: 500; white-space: nowrap; }
    .project-links a:hover { color: var(--ink); }
    p { font-size: 0.9375rem; line-height: 1.75; color: var(--ink-muted); margin: 0 0 1.5rem; }
    .tech-stack { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .tag { font-size: 0.7rem; padding: 0.25rem 0.6rem;
      background: var(--surface); color: var(--ink-muted);
      letter-spacing: 0.04em; font-weight: 500; }
    .loading-text, .error-text { text-align: center; padding: 4rem;
      color: var(--ink-muted); font-size: 0.9rem; }

    @media (max-width: 640px) {
      .project-row { grid-template-columns: 1fr; gap: 0.5rem; }
      .project-num { font-size: 1.5rem; }
      .project-header { flex-direction: column; }
    }
  `]
})
export class ProjectsComponent implements OnInit {
  private svc = inject(PortfolioService);
  protected externalHref = externalHref;
  projects = signal<Project[]>([]);
  loading  = signal(true);
  error    = signal(false);

  ngOnInit() {
    this.svc.getProjects().subscribe({
      next:  p  => { this.projects.set(p); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); }
    });
  }
}
