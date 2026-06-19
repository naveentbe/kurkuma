interface FacebookIconProps {
  size?: number;
  className?: string;
}

export default function FacebookIcon({
  size = 24,
  className = "",
}: FacebookIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={`shrink-0 text-kurkuma-yellow ${className}`}
    >
      <path
        d="M14 8.5h2.5l-.5 3H14v9h-3.5v-9H9v-3h1.5V7.5C10.5 5 12 3.5 14.75 3.5H17v3h-1.75c-1 0-1.25.5-1.25 1.25V8.5z"
        fill="currentColor"
      />
    </svg>
  );
}
