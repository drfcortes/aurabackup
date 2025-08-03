import React, { useState, useEffect } from "react";

export default function PreviewBox() {
    const [block, setBlock] = useState(null);

    useEffect(() => {
        const handle = (e) => {
            setBlock(e.detail);
        };
        window.addEventListener("auraBlockGenerated", handle);
        return () => window.removeEventListener("auraBlockGenerated", handle);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(block, null, 2));
        alert("Copied to clipboard!");
    };

    const handleUpload = async () => {
        const payload = { ...block };

        // Autogenerar content_hash
        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(payload));
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        payload.content_hash = hashHex;

        const res = await fetch("https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/storeAuraBlock", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            const uid = payload.uid;
            alert("✅ Block stored successfully.");
            window.location.href = `/block/${uid}`;
        } else {
            alert("❌ Failed to store block.");
        }
    };

    if (!block) return null;

    return (
        <div className="bg-gray-50 p-4 border rounded">
            <h2 className="text-lg font-semibold text-auraWine mb-2">Preview Block</h2>
            <pre className="bg-white p-3 border rounded text-sm overflow-auto max-h-64">
        {JSON.stringify(block, null, 2)}
      </pre>

            <div className="flex gap-4 mt-4">
                <button onClick={handleCopy} className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Copy
                </button>
                <button onClick={handleUpload} className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700">
                    Confirm & Upload
                </button>
            </div>
        </div>
    );
}
