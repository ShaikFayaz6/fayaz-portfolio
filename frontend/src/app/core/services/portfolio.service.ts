import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SkillGroup, Project, Experience, ContactForm } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  getSkills(): Observable<SkillGroup[]> {
    return this.http.get<SkillGroup[]>(`${this.base}/api/skills`);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/api/projects`);
  }

  getFeaturedProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.base}/api/projects/featured`);
  }

  getExperience(): Observable<Experience[]> {
    return this.http.get<Experience[]>(`${this.base}/api/experience`);
  }

  /**
   * Uses responseType 'text' so Angular does not JSON.parse the body before you see it.
   * If the API ever returns plain text (e.g. a .NET error page), default json parsing throws
   * "Unexpected token 'M', Microsoft... is not valid JSON".
   */
  sendContact(form: ContactForm): Observable<{ message: string }> {
    return this.http
      .post(`${this.base}/api/contact`, form, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        map((res: HttpResponse<string>) => {
          const raw = res.body ?? '';
          let data: { message?: string };
          try {
            data = JSON.parse(raw) as { message?: string };
          } catch {
            throw new HttpErrorResponse({
              error: {
                message:
                  'The server returned a non-JSON response. Check that the API is running and contact is configured.'
              },
              status: res.status,
              statusText: res.statusText,
              url: res.url ?? undefined
            });
          }
          return data as { message: string };
        }),
        catchError((err: HttpErrorResponse) => {
          const raw = err.error;
          if (typeof raw === 'string') {
            const trimmed = raw.replace(/^\uFEFF/, '').trim();
            if (trimmed.length === 0) {
              return throwError(
                () =>
                  new HttpErrorResponse({
                    error: {
                      message: `HTTP ${err.status} with an empty response body. Stop Portfolio.Api (Ctrl+C), rebuild, run again, and check the API terminal when you submit.`
                    },
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url ?? undefined,
                    headers: err.headers
                  })
              );
            }
            try {
              const parsed = JSON.parse(trimmed) as { message?: string };
              return throwError(
                () =>
                  new HttpErrorResponse({
                    error: parsed,
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url ?? undefined,
                    headers: err.headers
                  })
              );
            } catch {
              return throwError(
                () =>
                  new HttpErrorResponse({
                    error: {
                      message: `HTTP ${err.status} — response was not JSON (often an old API build or a proxy). Restart the API after saving code, confirm POST http://localhost:5000/api/contact in Swagger, and run Scripts/supabase-schema.sql in Supabase if tables are missing.`
                    },
                    status: err.status,
                    statusText: err.statusText,
                    url: err.url ?? undefined,
                    headers: err.headers
                  })
              );
            }
          }
          return throwError(() => err);
        })
      );
  }
}
