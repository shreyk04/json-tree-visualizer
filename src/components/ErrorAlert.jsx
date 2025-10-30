import React from "react";

export default function ErrorAlert({ message }) {
    return (
        <div className="mt-3 bg-red-50 border border-red-200 text-red-700 p-3 rounded text-sm">
            <strong>Error:</strong> {message}
        </div>
    );
}
