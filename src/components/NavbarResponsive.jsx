import React, { useState } from "react";

export default function NavbarResponsive() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="w-full border-b border-aura-soft bg-aura-gray px-4 sm:px-6 py-4">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <a href="/" className="flex items-center space-x-3">
                    <img src="/logo1.png" alt="AURA Logo" className="h-12 md:h-16" />
                    <span className="text-2xl font-bold tracking-wide text-aura-soft">
            AURA
          </span>
                </a>

                {/* Botón hamburguesa solo en móvil */}
                <button
                    className="md:hidden text-aura-deep focus:outline-none"
                    aria-label="Open Menu"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    ☰
                </button>

                {/* Menú horizontal visible solo en escritorio */}
                <nav className="hidden md:flex space-x-6 text-sm font-medium text-aura-deep">
                    <a href="/" className="hover:text-aura-leather">Home</a>
                    <a href="/vision" className="hover:text-aura-leather">Vision</a>
                    <a href="/block" className="hover:text-aura-leather">Block</a>
                    <a href="/collaborators" className="hover:text-aura-leather">Collaborators</a>
                </nav>
            </div>

            {/* Menú móvil */}
            {isOpen && (
                <nav className="md:hidden mt-4 space-y-2 text-sm font-medium text-aura-deep">
                    <a href="/" className="block hover:text-aura-leather">Home</a>
                    <a href="/vision" className="block hover:text-aura-leather">Vision</a>
                    <a href="/block" className="block hover:text-aura-leather">Block</a>
                    <a href="/collaborators" className="block hover:text-aura-leather">Collaborators</a>
                </nav>
            )}
        </header>
    );
}
