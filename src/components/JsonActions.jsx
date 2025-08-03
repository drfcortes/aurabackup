import React from "react";

export default function JsonActions({ jsonData }) {
    const handleCopy = async () => {
        try {
            const text = JSON.stringify(jsonData, null, 2);
            await navigator.clipboard.writeText(text);
            alert("✅ Copied to clipboard!");
        } catch (err) {
            alert("❌ Failed to copy AURA.");
            console.error("Clipboard error:", err);
        }
    };

    const handleDownload = () => {
        const jsonString = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const fileName = `${jsonData?.uid || "aura_block"}.aura`;
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="mt-4 flex flex-wrap gap-2">
            <button
                onClick={handleCopy}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                title="Copy AURA to clipboard"
            >
                📋 Copy
            </button>

            <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                title="Download .aura file"
            >
                ⬇️ Download .aura
            </button>
            <button
                onClick={() => window.location.href = "/generate"}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
                title="Generate new AURA block"
            >
                ✨ Generate New Block
            </button>

        </div>
    );
}
