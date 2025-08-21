// src/components/ui/ActionModal.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";

interface ActionModalProps {
  open: boolean;
  title: string;
  description?: string; // opcional se você quiser mostrar apenas content
  onClose: () => void;
  children?: React.ReactNode; // <--- aqui
}

export const ActionModal: React.FC<ActionModalProps> = ({
  open,
  title,
  description,
  onClose,
  children,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-[#1a1d23] p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-xl font-bold mb-2">{title}</Dialog.Title>
        <Dialog.Description className="mb-4 text-gray-300">
          {description}
        </Dialog.Description>
        {children}
        <Button variant="primary" onClick={onClose}>
          Fechar
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};
