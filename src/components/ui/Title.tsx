// src/components/ui/Title.tsx

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => {
  return (
    <header className="flex items-start justify-center h-screen-30-vh">
      <div className="w-full max-w-screen-xl mx-auto sm:py-8 text-center h-screen-40">
        <h1
          className="text-5xl font-extrabold text-[var(--primary-color)]"
          style={{ fontFamily: "Libre Baskerville, serif" }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Title;
