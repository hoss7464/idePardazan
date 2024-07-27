import React, { useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PopUpInput from './EvalIndicatorFiles/PopUpInput';
import EvalModal from './EvalIndicatorFiles/EvalModal';
import ModalTopic from './EvalIndicatorFiles/ModalTopc';
import EvalDynamicForm from './EvalIndicatorFiles/EvalDynamicForm';
import PopupAddBtn from './EvalIndicatorFiles/PopupAddBtn';
import PopupCloseBtn from './EvalIndicatorFiles/PopupCloseBtn';

const EvalIndicatorGuyeh: React.FC = () => {
  //States :
  const [searchTerm, setSearchTerm] = useState('');
  const [addModal, setaddModal] = useState<boolean>(false);
  const [newIndicatorTitle, setnewIndicatorTitle] = useState('');
  //-------------------------------------------------------------------------
  //Functions :
  const handleAdd = async (title: string) => {};

  return (
    <>
      {/* search input */}
      <PopUpInput
        myType="text"
        myPlaceHolder="جستجو کنید..."
        myVal={searchTerm}
        myOnChnage={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      {/*breadcrumb */}
      <Breadcrumb />
      {/*Modal click btn on page */}
      <EvalModal
        addModalText="افزودن گویه"
        myModalFuncClick={() => {
          setaddModal(true);
        }}
      />

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3 items-center justify-center">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*Modal topic */}
                <ModalTopic
                  modalTopicText="نمایش گویه"
                  modalTopicCloseBtn={() => setaddModal(false)}
                />
                {/*Modal Dynamic Form */}
                <EvalDynamicForm />
                
                <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                  <PopupCloseBtn
                    PopupCloseBtnText="بستن"
                    PopupCloseBtnFunc={() => setaddModal(false)}
                  />
                  <PopupAddBtn
                    PopupAddBtnText="افزودن شاخص"
                    PopupAddBtnFunc={() => handleAdd(newIndicatorTitle)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};

export default EvalIndicatorGuyeh;
