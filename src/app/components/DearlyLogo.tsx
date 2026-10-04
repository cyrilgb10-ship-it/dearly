type DearlyLogoProps = {
  showText?: boolean;
  size?: "sm" | "md" | "lg";
};

export default function DearlyLogo({
  showText = true,
  size = "md",
}: DearlyLogoProps) {
  const sizes = {
    sm: {
      icon: "h-7 w-7",
      text: "text-lg",
    },
    md: {
      icon: "h-9 w-9",
      text: "text-xl",
    },
    lg: {
      icon: "h-12 w-12",
      text: "text-2xl",
    },
  };

  const current = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`relative ${current.icon} flex shrink-0 items-center justify-center`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          aria-hidden="true"
        >
          <rect
            x="4.5"
            y="6.5"
            width="31"
            height="25"
            rx="9"
            stroke="#171717"
            strokeWidth="2"
          />

          <path
            d="M6.5 10L20 21L33.5 10"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d="M6.5 29L15 20.5"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <path
            d="M33.5 29L25 20.5"
            stroke="#171717"
            strokeWidth="2"
            strokeLinecap="round"
          />

          <circle
            cx="31.5"
            cy="7"
            r="4"
            fill="#E86B6B"
          />
        </svg>
      </div>

      {showText && (
        <span
          className={`font-serif font-medium tracking-[-0.045em] text-[#171717] ${current.text}`}
        >
          dearly<span className="text-[#e86b6b]">.</span>
        </span>
      )}
    </div>
  );
}