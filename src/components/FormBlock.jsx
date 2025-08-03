import toast, { Toaster } from 'react-hot-toast';
import React, { useState } from "react";
import generateUID from "../utils/generateUID";
import generateTimestamp from "../utils/generateTimestamp";
import computeContentHash from "../utils/computeContentHash";
import submitAuraBlock from "../utils/submitAuraBlock";

const AURA_VERSION = "0.1";

const MODELS = [
    { name: "GPT-4o", provider: "OpenAI" },
    { name: "GPT-4 Turbo", provider: "OpenAI" },
    { name: "Gemini 1.5", provider: "Google" },
    { name: "Claude 3", provider: "Anthropic" },
    { name: "LLaMA 3", provider: "Meta" },
    { name: "Mistral 7B", provider: "Mistral AI" },
    { name: "Command R+", provider: "Cohere" },
    { name: "DeepSeek-VL", provider: "DeepSeek AI" },
    { name: "DeepSeek Coder", provider: "DeepSeek AI" },
    { name: "Suno", provider: "Suno AI" },
    { name: "Udio", provider: "Udio" },
    { name: "Runway Gen-2", provider: "Runway" },
    { name: "Pika", provider: "Pika Labs" },
    { name: "Sora", provider: "OpenAI" },
    { name: "Dream Machine", provider: "Luma AI" },
    { name: "Stable Diffusion XL", provider: "Stability AI" },
    { name: "Midjourney v6", provider: "Midjourney" },
    { name: "DALL·E 3", provider: "OpenAI" },
    { name: "Imagen 2", provider: "Google DeepMind" },
    { name: "Other", provider: "" }
];

export default function FormBlock() {
    const [formData, setFormData] = useState({
        model: "",
        provider: "",
        prompt: "",
        user_edit: false,
        notes: "",
        license: "CC-BY-4.0",
        email: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uid] = useState(generateUID());
    const [timestamp] = useState(generateTimestamp());
    const [generatedBlock, setGeneratedBlock] = useState(null);
    const [contentHash, setContentHash] = useState("");
    const [customModel, setCustomModel] = useState("");

    const handleModelChange = (e) => {
        const model = e.target.value;
        const selected = MODELS.find(m => m.name === model);
        setFormData({
            ...formData,
            model,
            provider: selected?.provider || ""
        });
        setCustomModel("");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const generateBlock = async () => {
        const block = {
            aura_version: AURA_VERSION,
            model: formData.model === "Other" ? customModel : formData.model,
            provider: formData.provider,
            prompt: formData.prompt,
            timestamp,
            user_edit: formData.user_edit,
            notes: formData.notes,
            license: formData.license,
            email: formData.email,
            uid
        };

        const hash = await computeContentHash(block);
        block.content_hash = hash;

        setGeneratedBlock(block);
        setContentHash(hash);

        window.dispatchEvent(new CustomEvent("auraBlockGenerated", { detail: block }));
    };

    const handleSubmit = async () => {
        if (!generatedBlock) {
            alert("⚠️ Please generate the block first.");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await submitAuraBlock(generatedBlock);

            toast.success("✅ Successfully submitted to the AURA Archive");

            // ⏳ Pequeña pausa para que el toast sea visible
            setTimeout(() => {
                window.location.href = `/block/${res.uid}`;
            }, 1500);
        } catch (err) {
            console.error(err);
            toast.error("❌ Submission failed. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="p-8 bg-white shadow-md rounded-2xl max-w-3xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold text-auraWine">Generate AURA Block</h1>

            {/* Modelo */}
            <div>
                <label className="block font-medium mb-1">AI Model Used</label>
                <select
                    className="w-full border p-2 rounded-md"
                    value={formData.model}
                    onChange={handleModelChange}
                >
                    <option value="">Select a model</option>
                    {MODELS.map((m, i) => (
                        <option key={i} value={m.name}>{m.name}</option>
                    ))}
                </select>
                {formData.model === "Other" && (
                    <input
                        type="text"
                        placeholder="Custom model name"
                        className="w-full border p-2 mt-2 rounded-md"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                    />
                )}
            </div>

            {/* Proveedor */}
            {formData.provider && (
                <div>
                    <label className="block font-medium mb-1">Provider</label>
                    <input
                        className="w-full border p-2 rounded-md bg-gray-100"
                        value={formData.provider}
                        disabled
                    />
                </div>
            )}

            {/* Prompt */}
            <div>
                <label className="block font-medium mb-1">Prompt</label>
                <textarea
                    className="w-full border p-2 rounded-md"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                    placeholder="Describe your prompt..."
                />
            </div>

            {/* Edición manual */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="user_edit"
                    checked={formData.user_edit}
                    onChange={handleChange}
                />
                <label>This content was manually edited</label>
            </div>

            {/* Notas */}
            <div>
                <label className="block font-medium mb-1">Notes (optional)</label>
                <textarea
                    className="w-full border p-2 rounded-md"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="Any observations about the output"
                />
            </div>

            {/* Email */}
            <div>
                <label className="block font-medium mb-1">Email (optional)</label>
                <input
                    className="w-full border p-2 rounded-md"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                />
                <p className="text-sm text-gray-500 mt-1">Used to send UID confirmation (optional).</p>
            </div>

            {/* UID / Timestamp / License / Hash */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">UID</label>
                    <input
                        className="w-full border p-2 rounded-md bg-gray-100"
                        disabled
                        value={uid}
                    />
                    <p className="text-sm text-gray-500 mt-1">Unique identifier for this AURA block.</p>
                </div>
                <div>
                    <label className="block font-medium mb-1">Timestamp</label>
                    <input
                        className="w-full border p-2 rounded-md bg-gray-100"
                        disabled
                        value={timestamp}
                    />
                    <p className="text-sm text-gray-500 mt-1">Time of creation (auto-generated).</p>
                </div>
                <div>
                    <label className="block font-medium mb-1">License</label>
                    <input
                        className="w-full border p-2 rounded-md"
                        name="license"
                        value={formData.license}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block font-medium mb-1">Content Hash</label>
                    <input
                        className="w-full border p-2 rounded-md bg-gray-100"
                        disabled
                        value={contentHash}
                    />
                </div>
            </div>

            {/* Botones principales */}
            <div className="flex flex-wrap gap-4 justify-between pt-4">
                <button
                    onClick={generateBlock}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-full shadow"
                >
                    🔄 Generate Block
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-full shadow transition-all ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12" cy="12" r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                />
                            </svg>
                            Uploading to Registry...
                        </>
                    ) : (
                        <>
                            🚀 Submit to AURA Registry
                        </>
                    )}
                </button>
            </div>

            {/* Preview */}
            {generatedBlock && (
                <div className="mt-8">
                    <h2 className="text-lg font-semibold text-aura-deep mb-2">Preview</h2>
                    <pre className="bg-gray-100 text-sm p-4 rounded-xl max-h-96 overflow-auto">
                        {JSON.stringify(generatedBlock, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}