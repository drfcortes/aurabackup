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

// 🔹 Función para enriquecer bloque con metadatos extra
async function enrichBlockData(block) {
    // Idioma
    block.language = navigator.language || null;

    // Info del navegador
    block.browser_info = navigator.userAgent || null;

    // País por IP
    try {
        const res = await fetch("https://ipapi.co/json/");
        if (res.ok) {
            const data = await res.json();
            block.country = data.country_code || null;
        }
    } catch (e) {
        console.warn("No se pudo obtener el país");
    }

    // Tipo de contenido (por ahora "text" fijo)
    block.content_type = "text";

    // Contexto de generación (puedes cambiarlo luego a selector)
    block.generation_context = "general";

    // Imagen (por ahora null hasta implementar subida)
    block.image_url = null;

    return block;
}

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
        let block = {
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

        // 🔹 Enriquecer con metadatos automáticos
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

            // Guardar el bloque en localStorage para acceso inmediato en la vista
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

    // 📌 Resto del JSX queda igual (UI original)...
    // Copia todo tu render JSX original aquí
}
