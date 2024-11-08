// src/components/ui/Logo.tsx

interface LogoProps {
  className?: string;
}

const Logo = () => (
  <img
    src="/assets/sojo.svg" // Updated to reference the public directory path
    alt="Sojourner logo"
    className="w-6"
    role="img"
  />
);

export default Logo;
