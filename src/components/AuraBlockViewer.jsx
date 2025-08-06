import React, { useState, useEffect } from "react";

export default function AuraBlockViewer({ uidFromPage }) {
    const [uid, setUid] = useState(uidFromPage || "");
    const [block, setBlock] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [auraReference, setAuraReference] = useState("");

    const fetchBlock = async (targetUid) => {
        if (!targetUid.trim()) return;
        setLoading(true);
        setError("");
        try {
            const res = await fetch(
                `https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/getAuraBlockByUID/${targetUid}`
            );
            if (!res.ok) throw new Error("Block not found or server error");

            const data = await res.json();
            const blockData = data.Item || data;
            setBlock(blockData);

            const year = blockData.timestamp ? new Date(blockData.timestamp).getFullYear() : "n.d.";
            const ref = `${blockData.model || "Unknown Model"} (${year}). ${blockData.uid || "undefined"}. Retrieved from https://aurablock.org/block/${blockData.uid || ""}`;
            setAuraReference(ref);

        } catch (err) {
            console.error("Error fetching block:", err);
            setError("⚠️ No AURA block found with that UID.");
            setBlock(null);
            setAuraReference("");
        }
        setLoading(false);
    };

    useEffect(() => {
        if (uidFromPage) {
            const savedBlock = localStorage.getItem("lastGeneratedBlock");
            if (savedBlock) {
                const parsed = JSON.parse(savedBlock);
                if (parsed.uid === uidFromPage) {
                    setBlock(parsed);
                    const year = parsed.timestamp ? new Date(parsed.timestamp).getFullYear() : "n.d.";
                    const ref = `${parsed.model || "Unknown Model"} (${year}). ${parsed.uid || "undefined"}. Retrieved from https://aurablock.org/block/${parsed.uid || ""}`;
                    setAuraReference(ref);
                    localStorage.removeItem("lastGeneratedBlock");
                    return;
                }
            }
            fetchBlock(uidFromPage);
        }
    }, [uidFromPage]);

    const copyReference = () => {
        if (!auraReference) return;
        navigator.clipboard.writeText(auraReference).then(() => {
            alert("AURA Reference copied to clipboard!");
        });
    };

    const copyRaw = () => {
        if (!block) return;
        navigator.clipboard.writeText(JSON.stringify(block, null, 2)).then(() => {
            alert("AURA Raw+ copied to clipboard!");
        });
    };

    return (
        <div className="space-y-6 p-6 bg-aura-soft dark:bg-aura-deep rounded-xl shadow-lg border border-aura-beige dark:border-aura-gray">
            <h2 className="text-2xl font-bold text-aura-green dark:text-aura-yellow">
                AURA Block Viewer
            </h2>

            {/* Input de búsqueda */}
            <div className="flex flex-col sm:flex-row gap-3">
                <input
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Enter AURA Block UID"
                    className="flex-1 px-4 py-2 border border-aura-olive dark:border-aura-gray rounded-md bg-white dark:bg-aura-deep text-aura-deep dark:text-aura-cream"
                />
                <button
                    onClick={() => fetchBlock(uid)}
                    className="px-6 py-2 bg-aura-green dark:bg-aura-leather text-white rounded-md hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                >
                    Search
                </button>
            </div>

            {loading && <p className="italic">Loading...</p>}
            {error && <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>}

            {block && (
                <div className="grid grid-cols-1 gap-4">

                    {/* 🟢 Campos principales */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: "UID", value: block.uid },
                            { label: "Model", value: block.model },
                            { label: "Provider", value: block.provider },
                            { label: "Timestamp", value: block.timestamp },
                            { label: "License", value: block.license },
                            { label: "Email", value: block.email }
                        ].map(
                            (field, idx) =>
                                field.value && (
                                    <div key={idx} className="p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                                        <h4 className="font-semibold text-aura-green dark:text-aura-yellow">{field.label}</h4>
                                        <p className="text-sm break-words">{field.value}</p>
                                    </div>
                                )
                        )}
                    </div>

                    {/* 🟡 Metadatos secundarios */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: "Language", value: block.language },
                            { label: "Country", value: block.country },
                            { label: "Browser Info", value: block.browser_info },
                            { label: "Content Type", value: block.content_type },
                            { label: "Generation Context", value: block.generation_context }
                        ].map(
                            (field, idx) =>
                                field.value && (
                                    <div key={idx} className="p-3 bg-aura-beige dark:bg-aura-olive rounded border border-aura-olive dark:border-aura-gray text-xs">
                                        <h4 className="font-semibold">{field.label}</h4>
                                        <p className="break-words">{field.value}</p>
                                    </div>
                                )
                        )}
                    </div>

                    {/* 🔵 Prompt */}
                    {block.prompt && (
                        <div className="p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                            <h4 className="font-semibold text-aura-green dark:text-aura-yellow">Prompt</h4>
                            <p className="text-sm whitespace-pre-wrap">{block.prompt}</p>
                        </div>
                    )}

                    {/* 🔵 Output expandible */}
                    {block.output_text && (
                        <div className="p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                            <details>
                                <summary className="cursor-pointer font-semibold text-aura-green dark:text-aura-yellow">
                                    Show Output
                                </summary>
                                <p className="mt-2 text-sm whitespace-pre-wrap">{block.output_text}</p>
                            </details>
                        </div>
                    )}

                    {/* 🖼 Imagen */}
                    {block.image_url && (
                        <div>
                            <img src={block.image_url} alt="AURA content" className="rounded max-w-full" />
                        </div>
                    )}

                    {/* 📄 Referencia AURA */}
                    <div className="p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                        <h4 className="text-lg font-semibold text-aura-green dark:text-aura-yellow mb-2">📄 AURA Reference</h4>
                        <pre className="bg-white dark:bg-aura-deep text-sm p-3 rounded-md overflow-x-auto border border-aura-olive dark:border-aura-gray">
                            {auraReference}
                        </pre>
                        <button
                            onClick={copyReference}
                            className="mt-3 bg-aura-green dark:bg-aura-leather text-white px-4 py-2 rounded hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                        >
                            📋 Copy AURA Reference
                        </button>
                    </div>

                    {/* 🗄 AURA Raw+ */}
                    <div className="p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                        <details>
                            <summary className="cursor-pointer font-semibold text-aura-green dark:text-aura-yellow">
                                Show AURA Raw+
                            </summary>
                            <pre className="mt-2 bg-white dark:bg-aura-deep text-sm p-3 rounded-md max-h-[400px] overflow-auto border border-aura-olive dark:border-aura-gray">
                                {JSON.stringify(block, null, 2)}
                            </pre>
                            <button
                                onClick={copyRaw}
                                className="mt-3 bg-aura-green dark:bg-aura-leather text-white px-4 py-2 rounded hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                            >
                                📋 Copy AURA Raw+
                            </button>
                        </details>
                    </div>
                </div>
            )}
        </div>
    );
}
