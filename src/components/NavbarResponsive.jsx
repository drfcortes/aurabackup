import React, { useState, useEffect } from "react";

export default function NavbarResponsive() {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState("light");

    // Cargar preferencia de tema al iniciar
    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        if (storedTheme === "dark") {
            document.documentElement.classList.add("dark");
        }
    }, []);

    // Cambiar tema
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header className="w-full border-b border-aura-soft bg-aura-cream dark:bg-aura-deep px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Logo */}
                <a href="/" className="flex items-center space-x-3">
                    {/* Logo versión clara */}
                    <img
                        src="/Lightlogo.webp"
                        alt="AURA Logo Light"
                        className="block dark:hidden h-12 md:h-16"
                        loading="eager"
                        decoding="sync"
                    />
                    {/* Logo versión oscura */}
                    <img
                        src="/Darklogo.webp"
                        alt="AURA Logo Dark"
                        className="hidden dark:block h-12 md:h-16"
                        loading="eager"
                        decoding="sync"
                    />
                </a>

                {/* Botón cambio de tema */}
                <button
                    onClick={toggleTheme}
                    className="px-3 py-1 bg-aura-leather text-white rounded hover:bg-aura-sepia transition"
                >
                    {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                </button>

                {/* Botón hamburguesa */}
                <button
                    className="md:hidden text-aura-deep dark:text-white focus:outline-none ml-4"
                    aria-label="Open Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>

                {/* Menú escritorio */}
                <nav className="hidden md:flex space-x-6 text-lg font-semibold text-aura-deep dark:text-white">
                    <a href="/" className="hover:text-aura-leather transition-colors duration-300">Home</a>
                    <a href="/generate" className="hover:text-aura-leather transition-colors duration-300">Generate</a>
                    <a href="/search" className="hover:text-aura-leather transition-colors duration-300">Lookup</a>
                    <a href="/vision" className="hover:text-aura-leather transition-colors duration-300">Vision</a>
                    <a href="/collaborators" className="hover:text-aura-leather transition-colors duration-300">Collaborators</a>
                </nav>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <nav className="md:hidden mt-4 space-y-2 text-lg font-semibold text-aura-deep dark:text-white">
                    <a href="/" className="block hover:text-aura-leather transition-colors duration-300">Home</a>
                    <a href="/generate" className="block hover:text-aura-leather transition-colors duration-300">Generate</a>
                    <a href="/search" className="block hover:text-aura-leather transition-colors duration-300">Lookup</a>
                    <a href="/vision" className="block hover:text-aura-leather transition-colors duration-300">Vision</a>
                    <a href="/collaborators" className="block hover:text-aura-leather transition-colors duration-300">Collaborators</a>
                </nav>
            )}
        </header>
    );
}
