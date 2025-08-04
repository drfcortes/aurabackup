import React from "react";
import { ReactTyped } from "react-typed";

export default function TypedMessage() {
    return (
        <div className="bg-gray-900 text-green-400 font-mono text-2xl rounded-lg shadow-lg p-4 border border-gray-700 max-w-3xl mx-auto">
            <ReactTyped
                strings={[
                    "ChatGPT, please use this Aura block to generate the content response based on the prompt field."
                ]}
                typeSpeed={45}
                backSpeed={25}
                loop
            />
        </div>
    );
}
