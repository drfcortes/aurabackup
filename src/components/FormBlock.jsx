import toast from 'react-hot-toast';
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

// Extra metadata
async function enrichBlockData(block) {
    block.language = navigator.language || null;
    block.browser_info = navigator.userAgent || null;
    try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
            const data = await res.json();
            block.country = data.country_code || null;
        }
    } catch {
        console.warn("Could not fetch country");
    }
    block.content_type = "text";
    block.generation_context = "general";
    block.image_url = null;
    return block;
}

export default function FormBlock() {
    const [formData, setFormData] = useState({
        model: "",
        provider: "",
        prompt: "",
        output_text: "",
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
        let block = {
            aura_version: AURA_VERSION,
            model: formData.model === "Other" ? customModel : formData.model,
            provider: formData.provider,
            prompt: formData.prompt,
            output_text: formData.output_text || null,
            timestamp,
            user_edit: formData.user_edit,
            notes: formData.notes,
            license: formData.license,
            email: formData.email,
            uid
        };

        block = await enrichBlockData(block);
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
            localStorage.setItem("lastGeneratedBlock", JSON.stringify(generatedBlock));
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
        <div className="p-8 bg-aura-soft dark:bg-aura-deep shadow-md rounded-2xl max-w-3xl mx-auto space-y-6 text-aura-deep dark:text-aura-cream">
            <h1 className="text-3xl font-bold text-aura-green dark:text-aura-yellow">Generate AURA Block</h1>

            {/* Model */}
            <div>
                <label className="block font-medium mb-1">AI Model Used <span className="text-red-500">*</span></label>
                <p className="text-sm mb-2">Select the AI model you used to generate this content.</p>
                <select
                    className="w-full border rounded-lg p-2 bg-white dark:bg-aura-deep"
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
                        className="w-full border rounded-lg p-2 mt-2"
                        value={customModel}
                        onChange={(e) => setCustomModel(e.target.value)}
                    />
                )}
            </div>

            {/* Provider */}
            {formData.provider && (
                <div>
                    <label className="block font-medium mb-1">Provider</label>
                    <input
                        className="w-full border rounded-lg p-2 bg-gray-100 dark:bg-aura-gray"
                        value={formData.provider}
                        disabled
                    />
                </div>
            )}

            {/* Prompt */}
            <div>
                <label className="block font-medium mb-1">Prompt <span className="text-red-500">*</span></label>
                <p className="text-sm mb-2">Write the exact prompt used to generate the output.</p>
                <textarea
                    className="w-full border rounded-lg p-2"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                />
            </div>

            {/* Output */}
            <div>
                <label className="block font-medium mb-1">Output Text</label>
                <p className="text-sm mb-2">Describe or paste the generated output from the AI model.</p>
                <textarea
                    className="w-full border rounded-lg p-2"
                    name="output_text"
                    value={formData.output_text}
                    onChange={handleChange}
                />
            </div>

            {/* User edit */}
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="user_edit"
                    checked={formData.user_edit}
                    onChange={handleChange}
                />
                <label>This content was manually edited after generation</label>
            </div>

            {/* Notes */}
            <div>
                <label className="block font-medium mb-1">Notes (optional)</label>
                <p className="text-sm mb-2">Any additional observations or context.</p>
                <textarea
                    className="w-full border rounded-lg p-2"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div>
                <label className="block font-medium mb-1">Email (optional)</label>
                <p className="text-sm mb-2 text-aura-gray">Recommended if you want to track all your generated blocks in the future.</p>
                <input
                    className="w-full border rounded-lg p-2"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            {/* UID / Timestamp / License / Hash */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block font-medium mb-1">UID</label>
                    <input className="w-full border rounded-lg p-2 bg-gray-100" disabled value={uid} />
                </div>
                <div>
                    <label className="block font-medium mb-1">Timestamp</label>
                    <input className="w-full border rounded-lg p-2 bg-gray-100" disabled value={timestamp} />
                </div>
                <div>
                    <label className="block font-medium mb-1">License</label>
                    <input className="w-full border rounded-lg p-2 bg-gray-100" disabled value={formData.license} />
                </div>
                <div>
                    <label className="block font-medium mb-1">Content Hash</label>
                    <input className="w-full border rounded-lg p-2 bg-gray-100" disabled value={contentHash} />
                </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
                <button
                    onClick={generateBlock}
                    className="bg-aura-leather hover:bg-aura-green text-white px-6 py-2 rounded-full shadow"
                >
                    🔄 Generate Block
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-aura-green hover:bg-aura-deep text-white px-6 py-2 rounded-full shadow ${isSubmitting ? 'opacity-50' : ''}`}
                >
                    🚀 Submit to AURA Registry
                </button>
            </div>

            {/* Preview */}
            {generatedBlock && (
                <div className="mt-6">
                    <h2 className="text-lg font-semibold">Preview</h2>
                    <pre className="bg-aura-beige dark:bg-aura-gray text-sm p-4 rounded-xl max-h-96 overflow-auto">
                        {JSON.stringify(generatedBlock, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
