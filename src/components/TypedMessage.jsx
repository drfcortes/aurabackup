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
                `ChatGPT, please use this Aura <a href="/generate" style="color:#b17036; cursor:pointer;">block</a> to generate the content response based on the prompt field.`
            ]}
            typeSpeed={45}
            backSpeed={25}
            loop
            contentType="html"
            onStringTyped={() => {
                // Asegura que cualquier enlace dentro sea clickeable
                const links = document.querySelectorAll(".typed-cursor ~ a, .typed-cursor a, .typed-cursor ~ span a");
                links.forEach(link => {
                    link.addEventListener("click", (e) => {
                        e.stopPropagation(); // Evita que react-typed bloquee el click
                    });
                });
            }}
        />
    );
}
