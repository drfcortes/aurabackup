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
        <span>
      <ReactTyped
          strings={[
              `ChatGPT, please use this Aura <a href="/generate" class="typed-block-link">block</a> to generate the content response based on the prompt field.`
          ]}
          typeSpeed={45}
          backSpeed={25}
          loop
          contentType="html" // ← Permite usar HTML dentro del texto
      />

      <style jsx>{`
        .typed-block-link {
          color: #b17036; /* aura-leather */
          text-decoration: none;
          font-weight: bold;
          cursor: pointer;
        }
        .typed-block-link:hover {
          color: #d4a369; /* aura-sepia */
        }
      `}</style>
    </span>
    );
}
