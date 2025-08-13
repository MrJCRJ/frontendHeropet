import React from "react";
import { Link } from "react-router-dom";

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen flex bg-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1e293b] p-4 flex flex-col">
        <h1 className="text-2xl font-bold mb-6">HeroPet</h1>
        <nav className="flex flex-col gap-4">
          <Link to="/" className="hover:bg-[#334155] p-2 rounded">
            Clientes
          </Link>
          <Link to="/clientes/novo" className="hover:bg-[#334155] p-2 rounded">
            Novo Cliente
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1e293b] p-4 shadow-md">
          <h2 className="text-xl font-semibold">Dashboard</h2>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-[#0f172a]">{children}</main>
      </div>
    </div>
  );
};
