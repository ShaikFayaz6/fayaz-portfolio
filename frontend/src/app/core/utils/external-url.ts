/**
 * Ensures browser navigates off-site. Values without a scheme are treated as
 * relative to the current origin (e.g. "github.com/foo" on Vercel).
 */
export function externalHref(raw: string | null | undefined): string | null {
  if (raw == null) return null;
  const t = raw.trim();
  if (!t) return null;
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith('//')) return `https:${t}`;
  return `https://${t}`;
}
