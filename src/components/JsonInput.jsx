import React, { useState } from "react";

const JsonInput = ({ onVisualize }) => {
    const [jsonText, setJsonText] = useState("");
    const [error, setError] = useState("");

    const handleVisualize = () => {
        try {
            const parsed = JSON.parse(jsonText);
            setError("");
            onVisualize(parsed);
        } catch (err) {
            setError("Invalid JSON. Please fix and try again.");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                JSON Input
            </h2>
            <textarea
                className="w-full h-48 p-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-gray-100"
                placeholder='Paste your JSON here...'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
            ></textarea>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
                onClick={handleVisualize}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                Visualize
            </button>
        </div>
    );
};

export default JsonInput;
