// src/components/ui/Title.tsx

interface TitleProps {
  title: string;
}

const Title = ({ title }: TitleProps) => {
  return (
    <header className="flex items-start justify-center h-[30vh]">
      <div className="w-full max-w-screen-xl mx-auto sm:py-8 text-center h-[40vh]">
        <h1
          className="text-5xl font-extrabold text-[var(--text-color-primary)]"
          style={{ fontFamily: "Libre Baskerville, serif" }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
};

export default Title;
