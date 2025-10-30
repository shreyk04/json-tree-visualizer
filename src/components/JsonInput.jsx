import React, { useState } from "react";

export default function JsonInput({ onJsonChange }) {
    const [text, setText] = useState(
        `{
  "user": { "name": "Shreya", "age": 25, "skills": ["React", "Tailwind"] },
  "address": { "city": "Pune", "country": "India" }
}`
    );
    const [error, setError] = useState("");

    const handleVisualize = () => {
        try {
            const parsed = JSON.parse(text);
            setError("");
            onJsonChange(parsed);
        } catch {
            setError("Invalid JSON. Please check your syntax.");
            onJsonChange(null);
        }
    };

    return (
        <div className="flex flex-col flex-1">
            <textarea
                className="border border-gray-300 rounded p-3 text-sm h-[520px] font-mono focus:outline-none focus:ring-1 focus:ring-blue-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleVisualize}
                className="mt-3 bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 rounded"
            >
                Visualize
            </button>
        </div>
    );
}
