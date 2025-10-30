import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import TreeVisualizer from "./components/TreeVisualizer";
import SearchBar from "./components/SearchBar";

function App() {
  const [jsonData, setJsonData] = useState(null);

  const handleVisualize = (parsedJson) => {
    setJsonData(parsedJson);
  };

  const handleSearch = (query) => {
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center mb-6">
        JSON Tree Visualizer 🌳
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        <JsonInput onVisualize={handleVisualize} />

        <div>
          <SearchBar onSearch={handleSearch} />
          <TreeVisualizer jsonData={jsonData} />
        </div>
      </div>
    </div>
  );
}

export default App;
