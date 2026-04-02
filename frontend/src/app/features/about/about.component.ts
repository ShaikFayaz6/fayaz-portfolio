import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">About Me</span>
        <h1>Engineer.<br><em>Problem Solver.</em></h1>
      </div>
    </div>

    <section class="section">
      <div class="container about-grid">
        <div class="about-text">
          <h2>Background</h2>
          <p>
            I'm a Full Stack .NET Developer with 3+ years of hands-on experience designing and
            maintaining enterprise web applications. My core stack is C#, ASP.NET Core Web API,
            ASP.NET MVC, and MS SQL Server — with expanding work in Angular, Azure, and cloud-native
            patterns.
          </p>
          <p>
            I'm currently pursuing an MS in Computer Science at the University of North Texas
            (graduating May 2026), where I also serve as an Instructional Assistant supporting
            graduate-level algorithm design courses.
          </p>
          <p>
            Previously at <strong>HCLTech</strong>, I contributed to a full-stack pricing,
            transportation, and shipping management system for an Oil &amp; Gas client — working
            across the full SDLC from requirements analysis through production support.
          </p>
          <a routerLink="/contact" class="btn-primary">Let's connect</a>
        </div>

        <div class="about-sidebar">
          <div class="info-block">
            <h3>Education</h3>
            <div class="edu-item">
              <strong>MS — Computer Science</strong>
              <span>University of North Texas</span>
              <span class="date">Aug 2024 – May 2026</span>
            </div>
            <div class="edu-item">
              <strong>BTech — Electronics &amp; Electronics Engineering</strong>
              <span>JNTU, India</span>
              <span class="date">May 2022</span>
            </div>
          </div>

          <div class="info-block">
            <h3>Contact</h3>
            <div class="contact-item">
              <span class="label">Email</span>
              <a href="mailto:shaikfayaz0064&#64;gmail.com">shaikfayaz0064&#64;gmail.com</a>
            </div>
            <div class="contact-item">
              <span class="label">Phone</span>
              <a href="tel:+19403649953">+1 940-364-9953</a>
            </div>
            <div class="contact-item">
              <span class="label">Location</span>
              <span>Denton, TX · Open to Relocation</span>
            </div>
            <div class="contact-item">
              <span class="label">LinkedIn</span>
              <a href="https://linkedin.com/in/fayaz-shaik64" target="_blank" rel="noopener">fayaz-shaik64</a>
            </div>
            <div class="contact-item">
              <span class="label">GitHub</span>
              <a href="https://github.com/ShaikFayaz6/" target="_blank" rel="noopener">ShaikFayaz6</a>
            </div>
          </div>
        </div>
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
    .about-grid { display: grid; grid-template-columns: 1fr 380px; gap: 6rem; align-items: start; }
    h2 { font-family: 'Playfair Display', serif; font-size: 1.75rem;
      letter-spacing: -0.02em; color: var(--ink); margin: 0 0 1.5rem; }
    p { font-size: 1rem; line-height: 1.8; color: var(--ink-muted); margin: 0 0 1.25rem; }
    strong { color: var(--ink); font-weight: 600; }

    .btn-primary { display: inline-block; padding: 0.75rem 1.75rem;
      background: var(--ink); color: #fff; text-decoration: none;
      font-size: 0.875rem; font-weight: 500; letter-spacing: 0.04em;
      margin-top: 1rem; transition: opacity 0.2s; }
    .btn-primary:hover { opacity: 0.8; }

    .info-block { border-top: 1px solid var(--border); padding-top: 2rem; margin-bottom: 2.5rem; }
    h3 { font-size: 0.7rem; letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--ink-subtle); font-weight: 600; margin: 0 0 1.25rem; }
    .edu-item { margin-bottom: 1.25rem; }
    .edu-item strong { display: block; font-size: 0.9rem; color: var(--ink); }
    .edu-item span { display: block; font-size: 0.8125rem; color: var(--ink-muted); margin-top: 0.2rem; }
    .edu-item .date { color: var(--ink-subtle); font-size: 0.775rem; }

    .contact-item { display: flex; gap: 1rem; align-items: baseline; margin-bottom: 0.875rem; }
    .contact-item .label { min-width: 70px; font-size: 0.7rem; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--ink-subtle); }
    .contact-item a, .contact-item span:last-child { font-size: 0.875rem; color: var(--ink-muted);
      text-decoration: none; }
    .contact-item a:hover { color: var(--ink); }

    @media (max-width: 768px) {
      .about-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
  `]
})
export class AboutComponent {}
