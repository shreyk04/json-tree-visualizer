import { useState } from "react";
import { ReactFlowProvider } from "reactflow";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";

function App() {
  const [jsonData, setJsonData] = useState(null);
  const [searchPath, setSearchPath] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <header className="p-4 bg-blue-600 text-white text-center text-xl font-semibold">
        JSON Tree Visualizer
      </header>
      <main className="flex flex-1">
        <div className="w-1/3 p-4 border-r bg-white">
          <JsonInput onJsonChange={setJsonData} />
        </div>
        <div className="flex-1 flex flex-col">
          <SearchBar onSearch={setSearchPath} />
          <div className="flex-1 p-4 bg-gray-100">
            <ReactFlowProvider>
              <TreeVisualizer data={jsonData} searchPath={searchPath} />
            </ReactFlowProvider>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
