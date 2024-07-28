import React from 'react';

interface CustomButtonProps {
    onClick: () => void;
    className?: string;
    children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick, className, children }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex w-full justify-center rounded p-3 font-medium text-gray hover:bg-opacity-90 ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;
