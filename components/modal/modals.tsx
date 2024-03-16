import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { theme } from '../../tailwind.config';

interface ModalProps {
    onClose: () => void;    
    isOpen: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children, isOpen }) => {

    const CloseButton = () => {
        return <IoMdClose onClick={onClose} color='hsl(var(--primary-background-2))' className="absolute top-2 right-2 w-6 h-6 cursor-pointer" />
    }

    return ( <> {isOpen && (
        <div id="modal-overlay" className="fixed inset-0 bg-gray-600 bg-opacity-70 overflow-y-auto h-full w-full flex items-center justify-center">
            <div id="modal-content" className="p-8 relative min-h-[50%] w-[50%] min-w-[300px] max-w-[720px] max-h-[640px] shadow-lg rounded-lg bg-primary-300">
                {children}
                <CloseButton/>
            </div>
        </div>
    )} </> );
};

export default Modal;