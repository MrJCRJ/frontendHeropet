import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./routes/index.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider>
      <AppRoutes />
    </ModalProvider>
  </StrictMode>
);
