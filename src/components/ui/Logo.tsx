// src/components/ui/Logo.tsx

import sojournerLogo from "../../assets/sojo.svg";

interface LogoProps {
  className?: string;
}

const Logo = ({ className = "" }: LogoProps) => (
  <img
    src={sojournerLogo}
    alt="Sojourner logo"
    className={`w-8 h-8 ${className}`}
    role="img"
  />
);

export default Logo;
