import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [searchPath, setSearchPath] = useState("");
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white">
        <header className="flex justify-between items-center p-2">
          <h1 className="p-4 bg-blue-600 dark:bg-blue-700 text-white text-center text-xl font-semibold rounded-md">JSON Tree Visualizer</h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 bg-gray-800 dark:bg-gray-200 cursor-pointer dark:text-black text-white rounded text-sm transition"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </header>
        <main className="flex flex-1">
          <div className="w-1/3 p-4 border-r  dark:border-gray-700 bg-white dark:bg-gray-800">
            <JsonInput onJsonChange={setJsonData} />
          </div>
          <div className="flex-1 flex flex-col">
            <SearchBar onSearch={setSearchPath} />
            <div className="flex-1 p-4 dark:bg-gray-100">
              <ReactFlowProvider>
                <TreeVisualizer data={jsonData} searchPath={searchPath} darkMode={darkMode} />
              </ReactFlowProvider>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
