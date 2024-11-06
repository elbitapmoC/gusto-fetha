// src/presentation/components/ui/Logo.tsx

import sojournerLogo from "../../assets/sojo.svg";

const Logo = ({ className = "" }: { className?: string }) => (
  <img
    src={sojournerLogo}
    alt="Sojourner logo"
    className={`w-8 h-8 ${className}`}
    role="img"
  />
);

export default Logo;
