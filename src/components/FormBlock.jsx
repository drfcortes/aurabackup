import toast from 'react-hot-toast';
import React, { useState, useEffect } from "react";
import generateTimestamp from "../utils/generateTimestamp";
import computeContentHash from "../utils/computeContentHash";
import submitAuraBlock from "../utils/submitAuraBlock";

const AURA_VERSION = "0.1";
const UID_API_URL = "https://qyx30mhh90.execute-api.us-east-2.amazonaws.com/v1/generateNextUID";

// Lista ISO 639-1
const LANGUAGES = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ru", name: "Russian" },
    { code: "zh", name: "Chinese" },
    { code: "ja", name: "Japanese" },
    { code: "ar", name: "Arabic" },
    { code: "hi", name: "Hindi" },
    { code: "ko", name: "Korean" }
];

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

// Agrega metadata automática editable
async function enrichBlockData(block) {
    block.language = navigator.language || "";
    block.browser_info = navigator.userAgent || "";
    try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
            const data = await res.json();
            block.country = data.country_code || "";
        }
    } catch {
        console.warn("Could not fetch country");
    }
    if (!block.content_type) block.content_type = "text";
    if (!block.generation_context) block.generation_context = "general";
    if (!block.image_url) block.image_url = "";
    return block;
}

export default function FormBlock() {
    const [formData, setFormData] = useState({
        model: "",
        provider: "",
        prompt: "",
        prompt_language: (navigator.language || "en").split("-")[0],
        output_text: "",
        user_edit: false,
        notes: "",
        license: "CC-BY-4.0",
        email: "",
        content_type: "text",
        generation_context: "general",
        image_url: ""
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uid, setUid] = useState("Loading...");
    const [timestamp] = useState(generateTimestamp());
    const [generatedBlock, setGeneratedBlock] = useState(null);
    const [contentHash, setContentHash] = useState("");
    const [customModel, setCustomModel] = useState("");

    // Obtener UID al iniciar
    useEffect(() => {
        fetch(UID_API_URL)
            .then(res => res.json())
            .then(data => {
                if (data.next_uid) {
                    setUid(data.next_uid);
                } else {
                    setUid("Error generating UID");
                }
            })
            .catch(() => setUid("Error generating UID"));
    }, []);

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
            prompt_language: formData.prompt_language,
            output_text: formData.output_text || null,
            timestamp,
            user_edit: formData.user_edit,
            notes: formData.notes,
            license: formData.license,
            email: formData.email,
            content_type: formData.content_type,
            generation_context: formData.generation_context,
            image_url: formData.image_url,
            uid
        };

        block = await enrichBlockData(block);
        const hash = await computeContentHash(block);
        block.content_hash = hash;

        setGeneratedBlock(block);
        setContentHash(hash);
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
            localStorage.setItem("lastGeneratedBlock", JSON.stringify({ ...generatedBlock, uid: res.uid }));
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
                <label className="block font-medium mb-1">AI Model Used *</label>
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

            {/* Prompt */}
            <div>
                <label className="block font-medium mb-1">Prompt *</label>
                <textarea
                    className="w-full border rounded-lg p-2"
                    name="prompt"
                    value={formData.prompt}
                    onChange={handleChange}
                />
            </div>

            {/* Prompt Language */}
            <div>
                <label className="block font-medium mb-1">Prompt Language</label>
                <select
                    name="prompt_language"
                    className="w-full border rounded-lg p-2"
                    value={formData.prompt_language}
                    onChange={handleChange}
                >
                    {LANGUAGES.map((lang, idx) => (
                        <option key={idx} value={lang.code}>
                            {lang.name} ({lang.code})
                        </option>
                    ))}
                </select>
            </div>

            {/* Extra Metadata Editable */}
            <div>
                <label className="block font-medium mb-1">Content Type</label>
                <input
                    type="text"
                    name="content_type"
                    className="w-full border rounded-lg p-2"
                    value={formData.content_type}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Generation Context</label>
                <input
                    type="text"
                    name="generation_context"
                    className="w-full border rounded-lg p-2"
                    value={formData.generation_context}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block font-medium mb-1">Image URL</label>
                <input
                    type="url"
                    name="image_url"
                    className="w-full border rounded-lg p-2"
                    value={formData.image_url}
                    onChange={handleChange}
                />
            </div>

            {/* Email */}
            <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    name="email"
                    className="w-full border rounded-lg p-2"
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
            <div className="flex gap-4 pt-4 flex-wrap">
                <button onClick={generateBlock} className="bg-aura-leather hover:bg-aura-green text-white px-6 py-2 rounded-full shadow">
                    🔄 Generate Block
                </button>
                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`bg-aura-green hover:bg-aura-deep text-white px-6 py-2 rounded-full shadow flex items-center gap-2 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                ></circle>
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                ></path>
                            </svg>
                            Sending...
                        </>
                    ) : (
                        <>
                            🚀 Submit to AURA Registry
                        </>
                    )}
                </button>

            </div>

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
