type IconProps = { className?: string };

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden className={className}>
      <path
        d="M3.5 20.5l1.3-4.1A8.5 8.5 0 1 1 8 19.6l-4.5.9z"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .5-.1.6l-.5.6c-.1.2-.1.4 0 .5.6 1 1.4 1.8 2.4 2.4.2.1.4.1.5 0l.6-.6c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-2.9-.2a9.6 9.6 0 0 1-4.6-4.6c-.6-1.3-.5-2.3-.2-2.9z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} aria-hidden className={className}>
      <path d="M4 12h15M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
