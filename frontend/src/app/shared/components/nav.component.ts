import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <nav [class.scrolled]="scrolled()">
      <div class="nav-inner">
        <a routerLink="/" class="logo">FS<span class="dot">.</span></a>

        <button class="hamburger" (click)="menuOpen.set(!menuOpen())" [attr.aria-expanded]="menuOpen()">
          <span></span><span></span><span></span>
        </button>

        <ul [class.open]="menuOpen()">
          @for (link of links; track link.path) {
            <li>
              <a [routerLink]="link.path" routerLinkActive="active"
                 [routerLinkActiveOptions]="{exact: link.path === '/'}"
                 (click)="menuOpen.set(false)">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>
      </div>
    </nav>
  `,
  styles: [`
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      padding: 1.25rem 0;
      transition: all 0.3s ease;
    }
    nav.scrolled {
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(12px);
      box-shadow: 0 1px 0 rgba(0,0,0,0.08);
      padding: 0.875rem 0;
    }
    .nav-inner {
      max-width: 1100px; margin: 0 auto;
      padding: 0 2rem;
      display: flex; align-items: center; justify-content: space-between;
    }
    .logo {
      font-family: 'Playfair Display', serif;
      font-size: 1.5rem; font-weight: 700;
      color: var(--ink); text-decoration: none; letter-spacing: -0.02em;
    }
    .dot { color: var(--accent); }
    ul {
      display: flex; gap: 2.5rem; list-style: none; margin: 0; padding: 0;
    }
    a { color: var(--ink-muted); text-decoration: none; font-size: 0.875rem;
        letter-spacing: 0.04em; text-transform: uppercase; font-weight: 500;
        transition: color 0.2s; }
    a:hover, a.active { color: var(--ink); }
    a.active { border-bottom: 1.5px solid var(--accent); padding-bottom: 2px; }
    .hamburger { display: none; flex-direction: column; gap: 5px;
      background: none; border: none; cursor: pointer; padding: 4px; }
    .hamburger span { display: block; width: 22px; height: 1.5px; background: var(--ink); }

    @media (max-width: 640px) {
      .hamburger { display: flex; }
      ul { display: none; position: absolute; top: 100%; left: 0; right: 0;
           background: #fff; flex-direction: column; gap: 0; padding: 1rem 0;
           box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
      ul.open { display: flex; }
      ul li a { display: block; padding: 0.75rem 2rem; }
    }
  `]
})
export class NavComponent {
  scrolled = signal(false);
  menuOpen = signal(false);

  links = [
    { path: '/',           label: 'Home'       },
    { path: '/about',      label: 'About'      },
    { path: '/skills',     label: 'Skills'     },
    { path: '/projects',   label: 'Projects'   },
    { path: '/experience', label: 'Experience' },
    { path: '/contact',    label: 'Contact'    }
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled.set(window.scrollY > 40); }
}
