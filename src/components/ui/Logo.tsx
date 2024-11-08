// src/components/ui/Logo.tsx

import Image from "next/image";

interface LogoProps {
  className?: string;
}

const Logo = () => (
  <Image
    src="/assets/sojo.svg"
    alt="Sojourner logo"
    width={25}
    height={37}
    role="img"
  />
);

export default Logo;
