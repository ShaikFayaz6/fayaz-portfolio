import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SkillGroup } from '../../core/models/models';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">Technical Skills</span>
        <h1>What I<br><em>Work With</em></h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        @if (loading()) {
          <div class="loading-text">Loading skills…</div>
        } @else if (error()) {
          <div class="error-text">Could not load skills. Please try again later.</div>
        } @else {
          <div class="skills-grid">
            @for (group of groups(); track group.category) {
              <div class="skill-group">
                <h3>{{ group.category }}</h3>
                <ul>
                  @for (item of group.items; track item) {
                    <li>
                      <span class="dot"></span>
                      {{ item }}
                    </li>
                  }
                </ul>
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

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.5px; background: var(--border);
    }
    .skill-group { background: var(--paper); padding: 2.5rem; }
    h3 { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--accent); font-weight: 600; margin: 0 0 1.5rem; }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }
    li { display: flex; align-items: center; gap: 0.75rem;
      font-size: 0.9375rem; color: var(--ink-muted); }
    .dot { width: 4px; height: 4px; border-radius: 50%;
      background: var(--border-dark); flex-shrink: 0; }
    .loading-text, .error-text { text-align: center; padding: 4rem;
      color: var(--ink-muted); font-size: 0.9rem; }
  `]
})
export class SkillsComponent implements OnInit {
  private svc = inject(PortfolioService);
  groups  = signal<SkillGroup[]>([]);
  loading = signal(true);
  error   = signal(false);

  ngOnInit() {
    this.svc.getSkills().subscribe({
      next:  g  => { this.groups.set(g); this.loading.set(false); },
      error: () => { this.error.set(true); this.loading.set(false); }
    });
  }
}
