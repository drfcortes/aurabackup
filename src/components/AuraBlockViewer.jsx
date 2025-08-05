import React, { useState, useEffect } from "react";

export default function AuraBlockViewer({ uidFromPage }) {
    const [uid, setUid] = useState(uidFromPage || "");
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchBlock = async (targetUid) => {
        if (!targetUid.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/getAuraBlockByUID/${targetUid}`
            );
            if (!res.ok) {
                throw new Error("Block not found or server error");
            }
            const data = await res.json();
            setBlock(data);
        } catch (err) {
            console.error("Error fetching block:", err);
            setError("⚠️ No AURA block found with that UID.");
            setBlock(null);
        }
        setLoading(false);
    };

    // 🔹 Si viene uidFromPage, buscar automáticamente
    useEffect(() => {
        if (uidFromPage) {
            fetchBlock(uidFromPage);
        }
    }, [uidFromPage]);

    return (
        <div className="space-y-6 p-6 bg-aura-soft dark:bg-aura-deep rounded-xl shadow-lg border border-aura-beige dark:border-aura-gray">
            <h2 className="text-2xl font-bold text-aura-green dark:text-aura-yellow">
                AURA Block Viewer
            </h2>
            <p className="text-aura-deep dark:text-aura-cream text-sm leading-relaxed">
                Search and view the complete metadata of any{" "}
                <strong className="text-aura-leather dark:text-aura-yellow">AURA block</strong>.
                These blocks provide transparency on AI-assisted content generation,
                including model details, prompts, timestamps, and more.
            </p>

            {/* Campo de entrada */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Enter AURA Block UID (e.g., AURA-2025-000001)"
                    className="flex-1 px-4 py-2 border border-aura-olive dark:border-aura-gray rounded-md bg-white dark:bg-aura-deep text-aura-deep dark:text-aura-cream focus:outline-none"
                />
                <button
                    onClick={() => fetchBlock(uid)}
                    className="px-6 py-2 bg-aura-green dark:bg-aura-leather text-white rounded-md hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                >
                    Search
                </button>
            </div>

            {/* Loading */}
            {loading && (
                <p className="text-aura-gray dark:text-aura-cream italic">Loading...</p>
            )}

            {/* Error */}
            {error && (
                <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            )}

            {/* Resultados */}
            {block && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-aura-green dark:text-aura-yellow mb-2">
                        Block Metadata
                    </h3>
                    <pre className="bg-white dark:bg-aura-deep text-sm text-aura-black dark:text-aura-cream p-4 rounded-md border border-aura-beige dark:border-aura-gray max-h-[500px] overflow-auto">
                        {JSON.stringify(block, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
