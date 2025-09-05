export interface ModalProps {
    title: string;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    children: React.ReactNode;
}