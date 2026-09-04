import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4 py-24">
      <svg width="160" height="130" viewBox="0 0 160 130" aria-hidden="true">
        <polyline
          points="10,90 35,70 55,80 75,50 95,60 115,60 150,60"
          fill="none"
          stroke="#2d6a4f"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="10"
          y1="115"
          x2="150"
          y2="115"
          stroke="#e4e0d8"
          strokeWidth="2"
        />
        <circle cx="150" cy="60" r="4" fill="#c0392b" />
      </svg>

      <div>
        <p className="text-2xl font-bold text-primary">Page not found</p>
        <p className="text-sm text-muted-text mt-1">
          The page you're looking for doesn't exist.
        </p>
      </div>

      <Link
        to="/"
        className="text-sm font-medium text-accent hover:text-accent-dark no-underline"
      >
        Back to Overview
      </Link>
    </div>
  );
}
