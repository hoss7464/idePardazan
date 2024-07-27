import React from 'react';

interface MyComponentProps {
    addModalText : string;
    myModalFuncClick: React.MouseEventHandler<HTMLButtonElement>;
}


const EvalModal: React.FC<MyComponentProps> = ({ myModalFuncClick , addModalText}) => {
  return (
    <>
       <button
          className="inline-flex rounded-md items-center justify-center  bg-meta-3 py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 ml-2 mb-5 btnCustmColor"
          type="button"
          onClick={myModalFuncClick}
        >
          {addModalText}
        </button>
    </>
  );
};

export default EvalModal;