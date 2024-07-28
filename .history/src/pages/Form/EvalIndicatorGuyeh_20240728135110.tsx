import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import PopUpInput from './EvalIndicatorFiles/PopUpInput';
import EvalModal from './EvalIndicatorFiles/EvalModal';
import ModalTopic from './EvalIndicatorFiles/ModalTopc';
import EvalDynamicForm from './EvalIndicatorFiles/EvalDynamicForm';
import PopupAddBtn from './EvalIndicatorFiles/PopupAddBtn';
import PopupCloseBtn from './EvalIndicatorFiles/PopupCloseBtn';
import EvalIndicatorList from '../../hooks/EvalIndicator/EvalIndicatorList';
import { GuyehModalLabel } from './EvalIndicatorFiles/EvalIndicatorStyles';
import EvalListTopics from './EvalIndicatorFiles/EvalListTopics';
import EvalIndicatorGuyehList from '../../hooks/EvalIndicatorGuyeh/EvalIndicatorGuyehList';
import { useLocation } from 'react-router-dom';

interface Field {
  text: string;
  number: string;
}

const EvalIndicatorGuyeh: React.FC = () => {
  //States :
  const { errorGuyeh, dataIndicatorGuyeh, getEvalIndicatorGuyehListData } = EvalIndicatorGuyehList();

  const [searchTerm, setSearchTerm] = useState('');
  const [addModal, setaddModal] = useState<boolean>(false);
  const [fields, setFields] = useState<Field[]>([{ text: '', number: '' }]);
  const [savedFields, setSavedFields] = useState<Field[]>([]);
  const { error, dataIndicator, getEvalIndicatorListData } =
    EvalIndicatorList();
  const [title, setTitle] = useState<string>('');


  //-------------------------------------------------------------------------
  //Functions :

  const handleTextChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].text = value;
    setFields(newFields);
  };

  const handleNumberChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].number = value;
    setFields(newFields);
  };

  const addField = () => {
    setFields([...fields, { text: '', number: '' }]);
  };

  const deleteField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  const handleAdd = () => {
    const filteredFields = fields
      .filter((field, index) => index !== 0)
      .filter(
        (field) => field.text.trim() !== '' && field.number.trim() !== '',
      );

    setSavedFields(filteredFields);
    setaddModal(false);
    console.log('Title:', title);
    console.log('Data from EvalDynamicForm:', filteredFields);
  };

  const location = useLocation();

  
  useEffect(() => {
    const fetchData = async () => {
      await getEvalIndicatorGuyehListData(location.state);
    };
    fetchData();
    console.log(dataIndicatorGuyeh)
    
  }, []);

  useEffect(() => {
    console.log(dataIndicatorGuyeh[0].title)

   
  }, [dataIndicatorGuyeh]);

  return (
    <>
      <PopUpInput
        myType="text"
        myPlaceHolder="جستجو کنید..."
        myVal={searchTerm}
        myOnChnage={(event) => {
          setSearchTerm(event.target.value);
        }}
      />
      <Breadcrumb />
      <EvalModal
        addModalText="افزودن گویه"
        myModalFuncClick={() => {
          setaddModal(true);
        }}
      />

      <p className="mb-6">{dataIndicatorGuyeh[?.title}</p>

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3 items-center justify-center">
              <div className=" border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <ModalTopic
                  modalTopicText="نمایش گویه"
                  modalTopicCloseBtn={() => setaddModal(false)}
                />

                <div className="flex flex-col w-full mt-4 mb-4">
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-1/3 mr-6 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    placeholder="عنوان"
                  />
                </div>

                <EvalDynamicForm
                  fields={fields}
                  onTextChange={handleTextChange}
                  onNumberChange={handleNumberChange}
                  onAddField={addField}
                  onDeleteField={deleteField}
                />

                <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                  <PopupCloseBtn
                    PopupCloseBtnText="بستن"
                    PopupCloseBtnFunc={() => setaddModal(false)}
                  />
                  <PopupAddBtn
                    PopupAddBtnText="افزودن گویه"
                    PopupAddBtnFunc={() => handleAdd()}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {error && <p>Error: {error}</p>}

      <div className="w-full max-w-full rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-col gap-9 rounded-xl">
          <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto ">
                  <div className="p-1.5 min-w-full inline-block align-middle ">
                    <div className="overflow-hidden ">
                      <table className="min-w-full divide-y divide-bg-zinc-200 dark:divide-bg-zinc-200 border-zinc-200">
                        <EvalListTopics
                          listTopicName="نام گویه"
                          listTopParameter="گزاره"
                          listTopicGoal="امتیاز"
                          listTopicOperation="عملیات"
                        />
                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 border-zinc-200">
                          {savedFields.length > 0 && (
                            <>
                              {savedFields.map((field, index) => (
                                <tr key={index} className="border-zinc-200">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {title}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {field.text}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {field.number}
                                  </td>

                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    <button
                                      className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                      type="button"
                                    >
                                      <img src="/src/components/Icon/add.svg" />
                                    </button>
                                    <button
                                      className="inline-flex items-center  justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                      type="button"
                                    >
                                      <img src="/src/components/Icon/update.svg" />
                                    </button>
                                    <button
                                      className="inline-flex items-center justify-center rounded-md bg-red-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                      type="button"
                                    >
                                      <img src="/src/components/Icon/delete.svg" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EvalIndicatorGuyeh;
