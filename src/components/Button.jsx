import React from "react";

export default function Button({ children, onClick, variant = "primary" }) {
    const base =
        "px-4 py-2 rounded-lg font-medium transition-colors text-sm focus:outline-none";
    const variants = {
        primary: `${base} bg-blue-600 text-white hover:bg-blue-700`,
        outline: `${base} border border-blue-600 text-blue-600 hover:bg-blue-50`,
    };
    return (
        <button onClick={onClick} className={variants[variant]}>
            {children}
        </button>
    );
}
