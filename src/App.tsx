// src/App.tsx
import Title from "./components/Title";
import Search from "./components/Search/Search";

function App() {
  return (
    <div className="max-w-2xl mx-auto">
      <aside className="mb-12">
        <Title title="City List" />
        <Search /> {/* Search handles loading and errors */}
      </aside>
    </div>
  );
}

export default App;
