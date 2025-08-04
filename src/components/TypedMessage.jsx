import React from "react";
import { ReactTyped } from "react-typed";

/**
 * ⚠️ Este componente SIEMPRE debe usarse con `client:load` en Astro:
 *
 *   <TypedMessage client:load />
 *
 * porque depende del navegador para funcionar.
 */
export default function TypedMessage() {
    return (
        <ReactTyped
            strings={[
                `ChatGPT, please use this Aura <a href="/generate" style="color:#b17036;">block</a> to generate the content response based on the prompt field.`
            ]}
            typeSpeed={45}
            backSpeed={25}
            loop
            contentType="html"  // ✅ Permite que el enlace sea HTML real y clickeable
        />
    );
}
