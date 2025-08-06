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
              `ChatGPT, please use this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a> to generate a response based on the prompt field.`,
              `Midjourney, apply the settings from this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a> to recreate the visual output.`,
              `AudioGen, process according to the parameters stored in this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a> for accurate sound reproduction.`,
              `Video synthesis engine, replicate the scene using the metadata from this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a>.`,
              `Dataset curator, ensure compliance and attribution by referencing this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a>.`,
              `Research assistant, reference this <span class="font-bold text-aura-leather dark:text-aura-yellow">AURA</span> <a href="/generate" class="typed-block-link">block</a> for reproducible analysis and verification.`
          ]}
          typeSpeed={18}
          backSpeed={8}
          loop
          contentType="html"
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
