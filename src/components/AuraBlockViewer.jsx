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

    const copyOutput = () => {
        if (!block?.output_text) return;
        navigator.clipboard.writeText(block.output_text).then(() => {
            alert("Output copied to clipboard!");
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

            {/* Input para buscar por UID */}
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
                <>
                    {/* Tabla de metadatos */}
                    <table className="min-w-full border border-aura-olive dark:border-aura-gray rounded-lg overflow-hidden">
                        <tbody>
                        {Object.entries({
                            UID: block.uid,
                            Model: block.model,
                            Provider: block.provider,
                            Prompt: block.prompt,
                            "Output Text": block.output_text ? "(Click to expand below)" : null,
                            Timestamp: block.timestamp,
                            License: block.license,
                            Email: block.email,
                            Notes: block.notes,
                            "Content Hash": block.content_hash,
                            Language: block.language,
                            Country: block.country,
                            "Browser Info": block.browser_info,
                            "Content Type": block.content_type,
                            "Generation Context": block.generation_context
                        }).map(([key, value], idx) => (
                            value && (
                                <tr key={idx} className="border-t border-aura-olive dark:border-aura-gray">
                                    <td className="px-4 py-2 font-semibold bg-aura-beige dark:bg-aura-olive w-1/3">{key}</td>
                                    <td className="px-4 py-2">{value}</td>
                                </tr>
                            )
                        ))}
                        </tbody>
                    </table>

                    {/* Output expandible con botón de copiar */}
                    {block.output_text && (
                        <details className="mt-3 rounded-lg border border-aura-olive dark:border-aura-gray">
                            <summary className="cursor-pointer text-aura-green dark:text-aura-yellow px-4 py-2">
                                Show Output
                            </summary>
                            <div className="bg-aura-beige dark:bg-aura-gray p-4 rounded-b-lg">
                                <pre className="whitespace-pre-wrap text-sm">{block.output_text}</pre>
                                <button
                                    onClick={copyOutput}
                                    className="mt-3 bg-aura-green dark:bg-aura-leather text-white px-4 py-2 rounded hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                                >
                                    📋 Copy Output
                                </button>
                            </div>
                        </details>
                    )}

                    {/* Imagen si existe */}
                    {block.image_url && (
                        <div className="mt-3">
                            <img src={block.image_url} alt="AURA content" className="rounded max-w-full" />
                        </div>
                    )}

                    {/* Sección de referencia AURA */}
                    <div className="mt-6 p-4 bg-aura-beige dark:bg-aura-olive rounded-lg border border-aura-olive dark:border-aura-gray">
                        <h4 className="text-lg font-semibold text-aura-green dark:text-aura-yellow mb-2">
                            📄 AURA Reference
                        </h4>
                        <p className="text-sm mb-3">
                            This is the recommended way to cite this AURA block in your documents.
                        </p>
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

                    {/* AURA Raw+ expandible */}
                    <details className="mt-6 rounded-lg border border-aura-olive dark:border-aura-gray">
                        <summary className="cursor-pointer text-aura-green dark:text-aura-yellow px-4 py-2">
                            Show AURA Raw+
                        </summary>
                        <div className="bg-white dark:bg-aura-deep p-4 rounded-b-lg border-t border-aura-olive dark:border-aura-gray">
                            <pre className="text-sm text-aura-black dark:text-aura-cream max-h-[400px] overflow-auto">
                                {JSON.stringify(block, null, 2)}
                            </pre>
                            <button
                                onClick={copyRaw}
                                className="mt-3 bg-aura-green dark:bg-aura-leather text-white px-4 py-2 rounded hover:bg-aura-deep dark:hover:bg-aura-yellow transition"
                            >
                                📋 Copy AURA Raw+
                            </button>
                        </div>
                    </details>
                </>
            )}
        </div>
    );
}
