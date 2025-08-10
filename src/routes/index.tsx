import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClienteList } from "../pages/ClienteList";
import { ClienteCreate } from "../pages/ClienteCreate";
import { ClienteEdit } from "../pages/ClienteEdit";
import { ClienteDetails } from "../pages/ClienteDetails";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ClienteList />} />
      <Route path="/clientes/novo" element={<ClienteCreate />} />
      <Route path="/clientes/:id/editar" element={<ClienteEdit />} />
      <Route path="/clientes/:id" element={<ClienteDetails />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
