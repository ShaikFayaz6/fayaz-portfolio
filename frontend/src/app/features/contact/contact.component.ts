import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { PortfolioService } from '../../core/services/portfolio.service';

const fallbackContactError =
  'Something went wrong. Please try emailing me directly.';

/** HttpClient may surface JSON parse errors or plain-text bodies; keep UI messages safe. */
function extractContactErrorMessage(err: HttpErrorResponse): string {
  const e = err.error;
  if (e == null) {
    return fallbackContactError;
  }
  if (typeof e === 'string') {
    const t = e.trim();
    if (
      t.includes('Unexpected token') ||
      t.includes('is not valid JSON') ||
      t.startsWith('Microsoft.') ||
      t.startsWith('<!DOCTYPE') ||
      t.startsWith('<html')
    ) {
      return fallbackContactError;
    }
    return t.length > 400 ? t.slice(0, 400) + '…' : t;
  }
  if (typeof e === 'object' && e !== null) {
    const o = e as { message?: unknown; detail?: unknown };
    const parts: string[] = [];
    if (typeof o.message === 'string' && o.message.trim().length > 0) {
      parts.push(o.message.trim());
    }
    if (typeof o.detail === 'string' && o.detail.trim().length > 0) {
      parts.push(o.detail.trim());
    }
    if (parts.length > 0) {
      return parts.join(' ');
    }
  }
  return fallbackContactError;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div class="page-hero">
      <div class="container">
        <span class="eyebrow">Contact</span>
        <h1>Get In<br><em>Touch</em></h1>
      </div>
    </div>

    <section class="section">
      <div class="container contact-grid">

        <div class="contact-info">
          <h2>Let's talk</h2>
          <p>
            I'm actively seeking full stack .NET developer roles and software engineering
            internships. Whether you have an opportunity, a question, or just want to
            connect — I'd love to hear from you.
          </p>
          <div class="info-list">
            <div class="info-row">
              <span class="info-label">Email</span>
              <a href="mailto:shaikfayaz0064@gmail.com">shaikfayaz0064&#64;gmail.com</a>
            </div>
            <div class="info-row">
              <span class="info-label">Phone</span>
              <a href="tel:+19403649953">+1 940-364-9953</a>
            </div>
            <div class="info-row">
              <span class="info-label">LinkedIn</span>
              <a href="https://linkedin.com/in/fayaz-shaik64" target="_blank" rel="noopener">fayaz-shaik64</a>
            </div>
            <div class="info-row">
              <span class="info-label">GitHub</span>
              <a href="https://github.com/ShaikFayaz6/" target="_blank" rel="noopener">ShaikFayaz6</a>
            </div>
          </div>
        </div>

        <div class="form-wrap">
          @if (sent()) {
            <div class="success-msg">
              <span class="check">✓</span>
              <strong>Message sent!</strong>
              <p>Thanks for reaching out. I'll get back to you as soon as possible.</p>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()">
              <div class="field">
                <label for="name">Name</label>
                <input id="name" type="text" formControlName="name"
                       placeholder="Your name"
                       [class.invalid]="isInvalid('name')" />
                @if (isInvalid('name')) {
                  <span class="field-error">Name is required</span>
                }
              </div>

              <div class="field">
                <label for="email">Email</label>
                <input id="email" type="email" formControlName="email"
                       placeholder="your@email.com"
                       [class.invalid]="isInvalid('email')" />
                @if (isInvalid('email')) {
                  <span class="field-error">A valid email is required</span>
                }
              </div>

              <div class="field">
                <label for="message">Message</label>
                <textarea id="message" formControlName="message"
                          placeholder="What's on your mind?"
                          rows="6"
                          [class.invalid]="isInvalid('message')"></textarea>
                @if (isInvalid('message')) {
                  <span class="field-error">Message must be at least 10 characters</span>
                }
              </div>

              @if (apiError()) {
                <div class="api-error">{{ apiError() }}</div>
              }

              <button type="submit" class="btn-primary" [disabled]="submitting()">
                {{ submitting() ? 'Sending…' : 'Send Message' }}
              </button>
            </form>
          }
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

    .contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: start; }
    h2 { font-family: 'Playfair Display', serif; font-size: 1.75rem;
      letter-spacing: -0.02em; color: var(--ink); margin: 0 0 1rem; }
    p { font-size: 0.9375rem; line-height: 1.8; color: var(--ink-muted); margin: 0 0 2rem; }

    .info-list { display: flex; flex-direction: column; gap: 1rem; }
    .info-row { display: flex; gap: 1.5rem; align-items: baseline; }
    .info-label { min-width: 70px; font-size: 0.7rem; text-transform: uppercase;
      letter-spacing: 0.08em; color: var(--ink-subtle); font-weight: 600; }
    .info-row a { font-size: 0.9rem; color: var(--ink-muted); text-decoration: none; }
    .info-row a:hover { color: var(--ink); }

    /* Form */
    .field { margin-bottom: 1.5rem; }
    label { display: block; font-size: 0.7rem; text-transform: uppercase;
      letter-spacing: 0.1em; color: var(--ink-subtle); font-weight: 600; margin-bottom: 0.5rem; }
    input, textarea {
      width: 100%; box-sizing: border-box;
      border: 1px solid var(--border); background: var(--paper);
      padding: 0.75rem 1rem; font-size: 0.9375rem; color: var(--ink);
      font-family: inherit; outline: none; transition: border-color 0.2s;
      resize: vertical;
    }
    input:focus, textarea:focus { border-color: var(--ink); }
    input.invalid, textarea.invalid { border-color: #c0392b; }
    .field-error { font-size: 0.75rem; color: #c0392b; margin-top: 0.4rem; display: block; }
    .api-error { font-size: 0.85rem; color: #c0392b; margin-bottom: 1rem;
      padding: 0.75rem 1rem; border: 1px solid #c0392b; background: #fdf2f2; }

    .btn-primary { display: inline-block; padding: 0.875rem 2rem;
      background: var(--ink); color: #fff; border: none; cursor: pointer;
      font-size: 0.875rem; font-weight: 500; letter-spacing: 0.04em;
      font-family: inherit; transition: opacity 0.2s; }
    .btn-primary:hover:not(:disabled) { opacity: 0.8; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

    /* Success */
    .success-msg { text-align: center; padding: 4rem 2rem; border: 1px solid var(--border); }
    .check { display: block; font-size: 2.5rem; margin-bottom: 1rem; }
    .success-msg strong { display: block; font-size: 1.125rem; color: var(--ink); margin-bottom: 0.5rem; }
    .success-msg p { color: var(--ink-muted); font-size: 0.9rem; margin: 0; }

    @media (max-width: 768px) {
      .contact-grid { grid-template-columns: 1fr; gap: 3rem; }
    }
  `]
})
export class ContactComponent {
  private svc = inject(PortfolioService);
  private fb  = inject(FormBuilder);

  form = this.fb.group({
    name:    ['', [Validators.required]],
    email:   ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  sent       = signal(false);
  submitting = signal(false);
  apiError   = signal('');

  isInvalid(field: string) {
    const c = this.form.get(field);
    return c?.invalid && (c.dirty || c.touched);
  }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting.set(true);
    this.apiError.set('');

    this.svc.sendContact(this.form.value as any).subscribe({
      next:  () => { this.sent.set(true); this.submitting.set(false); },
      error: (err: HttpErrorResponse) => {
        this.apiError.set(extractContactErrorMessage(err));
        this.submitting.set(false);
      }
    });
  }
}
