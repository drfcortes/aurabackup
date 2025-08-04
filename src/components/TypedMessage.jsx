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
              `ChatGPT, please use this Aura <span class="typed-block-word">block</span> to generate the content response based on the prompt field.`
          ]}
          typeSpeed={45}
          backSpeed={25}
          loop
          contentType="html"
      />
            {/* Enlace invisible pero encima de la palabra "block" */}
            <a
                href="/generate"
                className="typed-block-link"
            >
        block
      </a>

      <style jsx>{`
        .typed-block-link {
          position: relative;
          left: -48px; /* ajusta según el ancho de la palabra */
          color: #b17036;
          text-decoration: none;
          cursor: pointer;
        }
        .typed-block-word {
          color: #b17036;
        }
      `}</style>
    </span>
    );
}
