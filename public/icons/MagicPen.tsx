import { cn } from "@/lib/utils";

const MagicPen = ({ isActive }: { isActive?: boolean }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 22 22"
      // className={`fill-${isActive ? "foreground" : "none"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.20833 18.7917C3.96917 19.5525 5.1975 19.5525 5.95833 18.7917L17.875 6.875C18.6358 6.11417 18.6358 4.88583 17.875 4.125C17.1142 3.36417 15.8858 3.36417 15.125 4.125L3.20833 16.0417C2.4475 16.8025 2.4475 18.0308 3.20833 18.7917Z"
        // stroke="#9CA3AF"
        className={cn(
          "stroke-foreground-secondary fill-none",
          isActive && "fill-foreground stroke-foreground",
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5092 8.24083L13.7592 5.49083"
        className={cn(
          "stroke-foreground-secondary fill-none",
          isActive && "stroke-background",
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.79167 2.23667L9.16667 1.83333L8.76334 3.20833L9.16667 4.58333L7.79167 4.18L6.41667 4.58333L6.82 3.20833L6.41667 1.83333L7.79167 2.23667Z"
        className={cn(
          "stroke-foreground-secondary fill-none",
          isActive && "stroke-foreground",
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.125 7.73667L5.5 7.33333L5.09667 8.70833L5.5 10.0833L4.125 9.68L2.75 10.0833L3.15333 8.70833L2.75 7.33333L4.125 7.73667Z"
        className={cn(
          "stroke-foreground-secondary fill-none",
          isActive && "stroke-foreground",
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.875 12.32L19.25 11.9167L18.8467 13.2917L19.25 14.6667L17.875 14.2633L16.5 14.6667L16.9033 13.2917L16.5 11.9167L17.875 12.32Z"
        className={cn(
          "stroke-foreground-secondary fill-none",
          isActive && "stroke-foreground",
        )}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MagicPen;
