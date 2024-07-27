import React from 'react';

interface MyComponentProps {
 
}

const ModalPopUpContainer: React.FC<MyComponentProps> = () => {
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
        <div className="relative my-6 mx-auto w-1/3">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"></div>
        </div>
      </div>
    </>
  );
};

export default ModalPopUpContainer;
