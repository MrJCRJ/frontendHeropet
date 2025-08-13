import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClienteList } from "../pages/ClienteList";
import { ClienteCreate } from "../pages/ClienteCreate";
import { ClienteEdit } from "../pages/ClienteEdit";
import { ClienteDetails } from "../pages/ClienteDetails";
import { Layout } from "../components/layout/Layout";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <ClienteList />
          </Layout>
        }
      />
      <Route
        path="/clientes/novo"
        element={
          <Layout>
            <ClienteCreate />
          </Layout>
        }
      />
      <Route
        path="/clientes/:id/editar"
        element={
          <Layout>
            <ClienteEdit />
          </Layout>
        }
      />
      <Route
        path="/clientes/:id"
        element={
          <Layout>
            <ClienteDetails />
          </Layout>
        }
      />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
