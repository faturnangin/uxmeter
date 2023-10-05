import { ReactNode } from 'react';
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
  }
  
const Modal = ({ isOpen, onClose, children } : ModalProps) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-[999]">
        <div className="absolute w-full h-full bg-gray-800 opacity-50"></div>
        <div className="bg-white w-10/12 mx-auto rounded-xl shadow-lg z-50 flex flex-col justify-center overflow-auto">
        {children}
        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-3xl mb-6 mx-6">Tutup</button>
        </div>
      </div>
    );
  };
  
  export default Modal;