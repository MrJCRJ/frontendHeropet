// src/components/ui/ConfirmDialog.tsx
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onCancel}>
      <Dialog.Overlay className="fixed inset-0 bg-black/50" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-[#1a1d23] p-6 rounded-lg shadow-lg">
        <Dialog.Title className="text-xl font-bold mb-2">{title}</Dialog.Title>
        <Dialog.Description className="mb-4 text-gray-300">
          {description}
        </Dialog.Description>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirmar
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
