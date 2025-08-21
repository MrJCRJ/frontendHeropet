// src/context/ModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { ConfirmDialog, ActionModal } from "../components/ui";

type ModalType = "success" | "error" | "confirm" | "custom";

type ModalOptions = {
  title?: string;
  message?: string;
  content?: React.ReactNode;
  onConfirm?: () => void;
};

interface ModalContextProps {
  showModal: (type: ModalType, options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ModalType>("success");
  const [options, setOptions] = useState<ModalOptions>({
    title: "",
    message: "",
  });

  const showModal = (modalType: ModalType, modalOptions: ModalOptions) => {
    setType(modalType);
    setOptions(modalOptions);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {open && type === "confirm" && (
        <ConfirmDialog
          open={open}
          title={options.title ?? ""}
          description={options.message ?? ""}
          onConfirm={() => {
            options.onConfirm?.();
            closeModal();
          }}
          onCancel={closeModal}
        />
      )}
      {open && type === "success" && (
        <ActionModal
          open={open}
          title={options.title ?? ""}
          description={options.message ?? ""}
          onClose={closeModal}
        />
      )}
      {open && type === "error" && (
        <ActionModal
          open={open}
          title={options.title ?? ""}
          description={options.message ?? ""}
          onClose={closeModal}
        />
      )}
      {open && type === "custom" && options.content && (
        <ActionModal
          open={open}
          title={options.title ?? ""}
          description=""
          onClose={closeModal}
        >
          {options.content}
        </ActionModal>
      )}
    </ModalContext.Provider>
  );
};
