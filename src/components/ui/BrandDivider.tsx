interface BrandDividerProps {
  className?: string;
  light?: boolean;
  align?: "left" | "center";
}

export default function BrandDivider({
  className = "",
  light = false,
  align = "center",
}: BrandDividerProps) {
  return (
    <div
      className={`brand-divider ${align === "center" ? "mx-auto" : "mr-auto"} ${light ? "opacity-80" : ""} ${align === "left" ? "brand-divider-left" : ""} ${className}`}
      aria-hidden="true"
    >
      <span className="brand-divider-diamond" />
    </div>
  );
}
