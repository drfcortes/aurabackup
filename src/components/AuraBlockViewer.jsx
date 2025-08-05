import React, { useState } from "react";

export default function AuraBlockViewer() {
    const [uid, setUid] = useState("");
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchBlock = async () => {
        if (!uid.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/getAuraBlockByUID/${uid}`);
            const data = await res.json();
            setBlock(data);
        } catch (error) {
            console.error("Error fetching block:", error);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-4 text-aura-deep dark:text-aura-cream">
            {/* Campo de entrada */}
            <input
                type="text"
                value={uid}
                onChange={(e) => setUid(e.target.value)}
                placeholder="Enter AURA Block UID"
                className="w-full px-4 py-2 border border-aura-olive dark:border-aura-gray rounded bg-white dark:bg-aura-deep text-aura-deep dark:text-aura-cream focus:outline-none"
            />

            {/* Botón */}
            <button
                onClick={fetchBlock}
                className="px-4 py-2 bg-aura-green dark:bg-aura-leather text-white rounded hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
            >
                Search
            </button>

            {/* Loading */}
            {loading && <p className="text-aura-gray dark:text-aura-cream">Loading...</p>}

            {/* Resultados */}
            {block && (
                <pre className="p-4 rounded bg-aura-soft dark:bg-aura-deep border border-aura-beige dark:border-aura-gray overflow-x-auto">
                    {JSON.stringify(block, null, 2)}
                </pre>
            )}
        </div>
    );
}
