import React from "react";
import LightLogo from "../assets/Lightlogo.webp";
import DarkLogo from "../assets/Darklogo.webp";

export default function Logo({ darkMode }) {
    return (
        <img
            src={darkMode ? DarkLogo : LightLogo}
            alt="AURA Logo"
            width={32}
            height={32}
            className="w-8 h-8"
            loading="eager" // equivalente a priority en React
        />
    );
}
