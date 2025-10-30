import React, { useState } from "react";
import JsonInput from "./components/JsonInput";
import Button from "./components/Button";
import ErrorAlert from "./components/ErrorAlert";
import { validateJson } from "./utils/jsonValidator";

export default function App() {
  const [jsonText, setJsonText] = useState("");
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState("");

  const handleVisualize = () => {
    setError(null);
    setInfo("");
    const { ok, data, message } = validateJson(jsonText);
    if (!ok) return setError(message);
    setParsedJson(data);
    setInfo("✅ JSON parsed successfully. Ready for visualization.");
  };

  const handleClear = () => {
    setJsonText("");
    setParsedJson(null);
    setError(null);
    setInfo("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">
        JSON Tree Visualizer – Step 1
      </h1>
      <p className="text-gray-500 mb-6 text-sm">
        Paste JSON data below and click <b>Generate Tree</b>
      </p>

      <div className="w-full max-w-3xl bg-white rounded-xl shadow p-6">
        <JsonInput
          value={jsonText}
          onChange={setJsonText}
          placeholder={SAMPLE_JSON}
        />

        <div className="flex items-center gap-3 mt-4">
          <Button onClick={handleVisualize}>Generate Tree</Button>
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>

        {error && <ErrorAlert message={error} />}
        {info && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800 text-sm">
            {info}
          </div>
        )}

        {parsedJson && (
          <div className="mt-6">
            <h2 className="font-medium text-gray-700 mb-2">
              Parsed JSON Preview
            </h2>
            <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto max-h-80">
              {JSON.stringify(parsedJson, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

const SAMPLE_JSON = `{
  "user": {
    "id": 1,
    "name": "Arnav",
    "address": { "city": "Pune", "zip": "411001" },
    "roles": ["admin", "editor"],
    "active": true,
    "metadata": null
  },
  "items": [
    { "id": "p1", "name": "Item 1", "price": 99.99 },
    { "id": "p2", "name": "Item 2", "price": 149.49 }
  ]
}`;
