type WhatsAppIconProps = {
  size?: number;
  className?: string;
};

export function WhatsAppIcon({ size = 22, className }: WhatsAppIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.4 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.4-4.4a8.4 8.4 0 1 1 15.5-4.5Z" />
      <path d="M8.8 8.1c-.4-.2-.8-.1-1 .2-.5.7-.7 1.5-.3 2.5 1.3 3.1 3.6 5.1 6.9 5.9.8.2 1.7-.1 2.2-.7.3-.4.3-.8-.1-1.1l-1.7-1.1c-.3-.2-.6-.1-.8.2l-.6.7c-1.7-.7-2.9-1.9-3.7-3.6l.7-.6c.2-.2.3-.5.1-.8l-1.1-1.6c-.1-.2-.3-.3-.6-.3Z" strokeWidth="1.25" />
    </svg>
  );
}
