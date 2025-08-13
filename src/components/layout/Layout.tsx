import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-50 inset-y-0 left-0 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-200 ease-in-out
        w-64 bg-slate-800 p-4 flex flex-col`}
        aria-label="Menu lateral"
      >
        <h1 className="text-2xl font-bold mb-6">HeroPet</h1>
        <nav className="flex flex-col gap-2">
          <Link to="/" className="hover:bg-slate-700 p-2 rounded transition">
            Clientes
          </Link>
          <Link
            to="/clientes/novo"
            className="hover:bg-slate-700 p-2 rounded transition"
          >
            Novo Cliente
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-slate-800 p-4 shadow-md flex items-center justify-between">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <button
            className="md:hidden px-3 py-2 bg-slate-700 rounded"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Abrir/fechar menu lateral"
          >
            ☰
          </button>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-slate-900">{children}</main>
      </div>
    </div>
  );
};
