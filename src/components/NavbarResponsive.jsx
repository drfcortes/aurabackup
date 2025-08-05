import React, { useState, useEffect } from "react";
import { Link } from "astro/components";

export default function NavbarResponsive() {
    const [isOpen, setIsOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    // Cargar el modo desde localStorage
    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
            setDarkMode(true);
        }
    }, []);

    // Cambiar modo
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
        const newMode = document.documentElement.classList.contains("dark");
        setDarkMode(newMode);
        localStorage.setItem("theme", newMode ? "dark" : "light");
    };

    return (
        <nav className="bg-aura-soft dark:bg-aura-deep shadow-md">
            <div className="max-w-6xl mx-auto px-4 flex justify-between items-center h-16">

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <img
                        src={darkMode ? "/Darklogo.webp" : "/Lightlogo.webp"}
                        alt="AURA Logo"
                        className="w-8 h-8"
                    />
                    <span className="font-bold text-aura-deep dark:text-aura-cream">AURA</span>
                </Link>

                {/* Botones y toggle */}
                <div className="flex items-center space-x-4">

                    {/* Links en escritorio */}
                    <div className="hidden md:flex space-x-4">
                        <Link href="/generate" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Generate
                        </Link>
                        <Link href="/vision" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Vision
                        </Link>
                        <Link href="/collaborators" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Collaborators
                        </Link>
                    </div>

                    {/* Toggle Switch moderno */}
                    <div
                        onClick={toggleDarkMode}
                        className="relative w-14 h-7 flex items-center bg-aura-beige dark:bg-aura-gray rounded-full cursor-pointer transition-colors duration-300"
                    >
                        <span className="absolute left-1 text-xs font-semibold text-aura-deep dark:text-aura-cream">
                            ☀️
                        </span>
                        <span className="absolute right-1 text-xs font-semibold text-aura-deep dark:text-aura-cream">
                            🌙
                        </span>
                        <div
                            className={`bg-white dark:bg-aura-leather w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                                darkMode ? "translate-x-7" : ""
                            }`}
                        ></div>
                    </div>

                    {/* Menú móvil botón */}
                    <button
                        className="md:hidden text-aura-deep dark:text-aura-cream focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* Menú desplegable móvil */}
            {isOpen && (
                <div className="md:hidden bg-aura-soft dark:bg-aura-deep p-4 space-y-2">
                    <Link href="/generate" className="block text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                        Generate
                    </Link>
                    <Link href="/vision" className="block text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                        Vision
                    </Link>
                    <Link href="/collaborators" className="block text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                        Collaborators
                    </Link>
                </div>
            )}
        </nav>
    );
}
