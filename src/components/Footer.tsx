import Logo from "./Logo";

const Footer = () => (
  <footer
    className="max-w-xl mx-auto mb-12"
    style={{ backgroundColor: "var(--footer-bg)", color: "var(--text-color)" }}
    role="contentinfo"
  >
    <hr
      className="my-6 sm:mx-auto"
      style={{ borderColor: "var(--border-color)" }}
    />

    <div className="w-full max-w-screen-xl mx-auto md:py-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-8 w-full">
        <a
          href="https://sojourn.llc/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
          aria-label="Visit Sojourner's website"
        >
          <Logo className="w-8 h-8" />
          <span className="text-2xl font-semibold whitespace-nowrap">
            Sojourner
          </span>
        </a>

        <aside className="flex flex-col items-center text-sm font-medium gap-1">
          <span className="block text-sm">
            © 2024{" "}
            <a href="https://sojourn.llc/" className="hover:underline">
              Sojourner™
            </a>
          </span>
          <p>All Rights Reserved.</p>
        </aside>
      </div>
    </div>
  </footer>
);

export default Footer;
