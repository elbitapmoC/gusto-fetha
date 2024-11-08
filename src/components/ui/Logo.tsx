// src/components/ui/Logo.tsx

import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo = () => (
  <Image
    src="/assets/sojo.svg" // Updated to reference the public directory path
    alt="Sojourner logo"
    className="w-6"
    width={100}
    height={100}
    role="img"
  />
);

export default Logo;
