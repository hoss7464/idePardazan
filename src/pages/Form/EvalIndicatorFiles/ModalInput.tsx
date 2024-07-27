import React from 'react';

interface MyComponentProps {
  ModalInputLabel: string;
  ModalInputPlaceholder: string;
  ModalInputValue: string;
  ModalInputFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalInput: React.FC<MyComponentProps> = ({
  ModalInputLabel,
  ModalInputPlaceholder,
  ModalInputValue,
  ModalInputFunc,
}) => {
  return (
    <>
      <div className="relative  px-6 py-3  flex-auto text-right">
        <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
          {ModalInputLabel}
        </p>
        <input
          type="text"
          placeholder={ModalInputPlaceholder}
          value={ModalInputValue}
          onChange={ModalInputFunc}
          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
      </div>
    </>
  );
};

export default ModalInput;
