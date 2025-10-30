import React from "react";

export default function JsonInput({ value, onChange, placeholder }) {
    return (
        <div>
            <label
                htmlFor="jsonInput"
                className="block font-medium text-gray-700 mb-2"
            >
                Paste or type JSON data
            </label>
            <textarea
                id="jsonInput"
                rows={10}
                className="w-full border border-gray-300 rounded-lg p-3 font-mono text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={placeholder}
                spellCheck="false"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <p className="text-xs text-gray-500 mt-1">
                Tip: Invalid JSON will show an error below.
            </p>
        </div>
    );
}
