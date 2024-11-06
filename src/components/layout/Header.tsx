// src/components/layout/Header.tsx
import Logo from "../ui/Logo";

export default function Header() {
  return (
    <>
      <header className="flex items-center justify-center py-6 border-b mb-8">
        <Logo />
      </header>
    </>
  );
}
