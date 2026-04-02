import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer>
      <div class="footer-inner">
        <p>Fayaz Shaik &mdash; Full Stack .NET Developer</p>
        <div class="links">
          <a href="https://github.com/ShaikFayaz6/" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/fayaz-shaik64" target="_blank" rel="noopener">LinkedIn</a>
          <a href="mailto:shaikfayaz0064@gmail.com">Email</a>
        </div>
        <p class="copy">&copy; {{ year }} Fayaz Shaik. Built with Angular &amp; .NET Core.</p>
      </div>
    </footer>
  `,
  styles: [`
    footer { border-top: 1px solid var(--border); padding: 3rem 2rem; margin-top: 4rem; }
    .footer-inner { max-width: 1100px; margin: 0 auto; text-align: center; }
    p { color: var(--ink-muted); font-size: 0.875rem; margin: 0 0 1rem; }
    .links { display: flex; gap: 2rem; justify-content: center; margin-bottom: 1.5rem; }
    a { color: var(--ink-muted); text-decoration: none; font-size: 0.875rem;
        text-transform: uppercase; letter-spacing: 0.06em; font-weight: 500;
        transition: color 0.2s; }
    a:hover { color: var(--ink); }
    .copy { font-size: 0.75rem; color: var(--ink-subtle); margin-bottom: 0; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
