import React from 'react';

interface CustomInputProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    value,
    onChange,
    placeholder = '',
    disabled = false,
}) => {
    return (
        <>
            <p className="my-1 text-blueGray-500 text-md leading-relaxed mb-0.5">
                {label}
            </p>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                className={`w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
            />
        </>
    );
};

export default CustomInput;
