export function LogoMark() {
  return (
    <svg width="40" height="40" viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill="var(--black)" />
      <circle cx="32" cy="32" r="25" fill="var(--red)" />
      <path d="M18 22h28l-3 30a3 3 0 0 1-3 3H24a3 3 0 0 1-3-3z" fill="#fff" />
      <rect x="15" y="16" width="34" height="6" rx="2" fill="#fff" />
      <path d="M27 31c3 3 7 3 10 0M27 40c3 3 7 3 10 0" stroke="var(--red)" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}
