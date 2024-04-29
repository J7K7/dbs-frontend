// "use client";
// import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
// import { useRouter } from "next/navigation";

// export default function Modal({ children }: { children: React.ReactNode }) {
//   const overlay = useRef(null);
//   const wrapper = useRef(null);
//   const router = useRouter();

//   const onDismiss = useCallback(() => {
//     router.back();
//   }, [router]);

//   const onClick: MouseEventHandler = useCallback(
//     (e) => {
//       if (e.target === overlay.current || e.target === wrapper.current) {
//         if (onDismiss) onDismiss();
//       }
//     },
//     [onDismiss, overlay, wrapper]
//   );

//   const onKeyDown = useCallback(
//     (e: KeyboardEvent) => {
//       if (e.key === "Escape") onDismiss();
//     },
//     [onDismiss]
//   );

//   useEffect(() => {
//     document.addEventListener("keydown", onKeyDown);
//     return () => document.removeEventListener("keydown", onKeyDown);
//   }, [onKeyDown]);

//   return (
//     <div
//       ref={overlay}
//       className="fixed z-10 left-0 right-0 top-0 bottom-0 mx-auto bg-black/60 p-10"
//       onClick={onClick}
//     >
//       <div
//         ref={wrapper}
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:w-10/12 md:w-8/12 lg:w-2/5 p-6"
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
import { ReactNode } from "react";
import { useEffect, useState } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(isOpen);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);



  const handleClose = () => {
    setIsModalOpen(false);
    onClose();
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-auto overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 transition-opacity" onClick={handleClose}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
          <div className="relative z-50 bg-white rounded-lg shadow-lg sm:w-full md:w-9/12 mx-auto p-6">{children}</div>
        </div>
      )}
    </>
  );
};

export default Modal;
