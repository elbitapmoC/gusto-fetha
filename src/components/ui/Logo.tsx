// src/components/ui/Logo.tsx

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
  <img
    src="/assets/sojo.svg" // Updated to reference the public directory path
    alt="Sojourner logo"
    className={`w-6 ${className}`}
    role="img"
  />
);

export default Logo;
