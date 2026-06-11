interface BrandDividerProps {
  className?: string;
  light?: boolean;
}

export default function BrandDivider({
  className = "",
  light = false,
}: BrandDividerProps) {
  return (
    <div
      className={`brand-divider mx-auto ${light ? "opacity-80" : ""} ${className}`}
      aria-hidden="true"
    >
      <span className="brand-divider-diamond" />
    </div>
  );
}
