import { useEffect, type MouseEvent, type ReactNode } from "react";

export type ModalProps = {
  isOpen?: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidthClass?: string;
  className?: string;
};

export function Modal({
  isOpen = true,
  onClose,
  children,
  maxWidthClass = "max-w-lg",
  className = "",
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4"
      onClick={handleOverlayClick}
    >
      <div
        className={`w-full ${maxWidthClass} rounded-2xl bg-white shadow-2xl border border-gray-200 p-6 ${className}`}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </div>
  );
}

export default Modal;
