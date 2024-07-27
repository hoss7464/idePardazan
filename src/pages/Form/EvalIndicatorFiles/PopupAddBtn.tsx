import React from 'react';

interface MyComponentProps {
    PopupAddBtnText: string;
    PopupAddBtnFunc: () => void; 
}

const PopupAddBtn: React.FC<MyComponentProps> = ({PopupAddBtnText, PopupAddBtnFunc}) => {
  return (
    <>
      <button
        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
        type="button"
        onClick={PopupAddBtnFunc}
      >
         {PopupAddBtnText}
      </button>
    </>
  );
};

export default PopupAddBtn;
