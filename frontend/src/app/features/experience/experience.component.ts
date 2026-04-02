import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Experience } from '../../core/models/models';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">Experience</span>
        <h1>Where I've<br><em>Worked</em></h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading()) {
          <div class="loading-text">Loading experience…</div>
        } @else if (error()) {
          <div class="error-text">Could not load experience.</div>
        } @else {
          <div class="timeline">
            @for (exp of experience(); track exp.id) {
              <div class="timeline-item">
                <div class="timeline-meta">
                  <span class="date-range">
                    {{ exp.startDate }} — {{ exp.endDate ?? 'Present' }}
                  </span>
                  <span class="location">{{ exp.location }}</span>
                </div>
                <div class="timeline-body">
                  <h2>{{ exp.role }}</h2>
                  <h3>{{ exp.company }}</h3>
                  <ul>
                    @for (bullet of exp.description; track bullet) {
                      <li>{{ bullet }}</li>
                    }
                  </ul>
                </div>
              </div>
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

    .timeline { display: flex; flex-direction: column; }
    .timeline-item {
      display: grid; grid-template-columns: 200px 1fr;
      gap: 3rem; padding: 3rem 0;
      border-bottom: 1px solid var(--border);
    }
    .timeline-item:first-child { border-top: 1px solid var(--border); }

    .timeline-meta { padding-top: 0.2rem; }
    .date-range { display: block; font-size: 0.8rem; color: var(--ink-muted);
      letter-spacing: 0.02em; margin-bottom: 0.4rem; font-weight: 500; }
    .location { font-size: 0.775rem; color: var(--ink-subtle); }

    h2 { font-size: 1.125rem; font-weight: 600; color: var(--ink);
      margin: 0 0 0.25rem; letter-spacing: -0.01em; }
    h3 { font-size: 0.9rem; color: var(--accent); font-weight: 500;
      margin: 0 0 1.5rem; text-transform: uppercase; letter-spacing: 0.04em; }

    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
    li { font-size: 0.9375rem; line-height: 1.7; color: var(--ink-muted);
      padding-left: 1.25rem; position: relative; }
    li::before { content: '—'; position: absolute; left: 0; color: var(--border-dark); }

    .loading-text, .error-text { text-align: center; padding: 4rem;
      color: var(--ink-muted); font-size: 0.9rem; }

    @media (max-width: 640px) {
      .timeline-item { grid-template-columns: 1fr; gap: 1rem; }
    }
  `]
})
export class ExperienceComponent implements OnInit {
  private svc = inject(PortfolioService);
  experience = signal<Experience[]>([]);
  loading    = signal(true);
  error      = signal(false);

  ngOnInit() {
    this.svc.getExperience().subscribe({
      next:  e  => { this.experience.set(e); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); }
    });
  }
}
