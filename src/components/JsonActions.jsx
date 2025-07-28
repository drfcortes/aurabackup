import React from "react";

export default function JsonActions({ jsonData }) {
    const handleCopy = () => {
        const text = JSON.stringify(jsonData, null, 2);
        navigator.clipboard.writeText(text).then(() => {
            alert("Copied to clipboard!");
        });
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const fileName = `${jsonData.uid || "aura_block"}.json`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mt-4 space-x-4">
            <button
                onClick={handleCopy}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Copy
            </button>

            <button
                onClick={handleDownload}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
                Download JSON
            </button>
        </div>
    );
}
