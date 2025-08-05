import React, { useState, useEffect } from "react";

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
                <a href="/" className="flex items-center space-x-2">
                    <img
                        src={darkMode ? "/Darklogo.webp" : "/Lightlogo.webp"}
                        alt="AURA Logo"
                        className="w-8 h-8"
                    />
                    <span className="font-bold text-aura-deep dark:text-aura-cream">AURA</span>
                </a>

                {/* Botones y toggle */}
                <div className="flex items-center space-x-4">

                    {/* Links */}
                    <div className="hidden md:flex space-x-4">
                        <a href="/generate" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Generate
                        </a>
                        <a href="/vision" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Vision
                        </a>
                        <a href="/collaborators" className="text-aura-deep dark:text-aura-cream hover:text-aura-leather">
                            Collaborators
                        </a>
                    </div>

                    {/* Toggle Switch */}
                    <div
                        onClick={toggleDarkMode}
                        className="relative w-14 h-7 bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300"
                    >
                        <div
                            className={`bg-white dark:bg-aura-leather w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${
                                darkMode ? "translate-x-7" : ""
                            }`}
                        ></div>
                    </div>

                    {/* Menú móvil */}
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
                    <a href="/generate" className="block text-aura-deep dark:text-aura-cream">
                        Generate
                    </a>
                    <a href="/vision" className="block text-aura-deep dark:text-aura-cream">
                        Vision
                    </a>
                    <a href="/collaborators" className="block text-aura-deep dark:text-aura-cream">
                        Collaborators
                    </a>
                </div>
            )}
        </nav>
    );
}
