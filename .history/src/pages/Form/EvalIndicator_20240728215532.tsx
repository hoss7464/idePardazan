import { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useReactToPrint } from 'react-to-print';
import EvalIndicatorList from '../../hooks/EvalIndicator/EvalIndicatorList';
import EvalIndicatorDelete from '../../hooks/EvalIndicator/EvalIndicatorDelete';
import EvalIndicatorUpdate from '../../hooks/EvalIndicator/EvalIndicatorUpdate';
import EvalIndicatorAdd from '../../hooks/EvalIndicator/EvalIndicatorAdd';
import EvalParamList from '../../hooks/EvalParam/EvalParamList';
import PopUpInput from './EvalIndicatorFiles/PopUpInput';
import EvalError from './EvalIndicatorFiles/EvalError';
import EvalModal from './EvalIndicatorFiles/EvalModal';
import ModalTopic from './EvalIndicatorFiles/ModalTopc';
import ModalInput from './EvalIndicatorFiles/ModalInput';
import PopupCloseBtn from './EvalIndicatorFiles/PopupCloseBtn';
import PopupAddBtn from './EvalIndicatorFiles/PopupAddBtn';
import EvalListTopics from './EvalIndicatorFiles/EvalListTopics';
import { GuyehIcon } from './EvalIndicatorFiles/EvalIndicatorStyles';
import Error from '../../components/Error/Error';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomeBtn/CustomBtn';
import PrintIcon from '/src/components/Icon/print.svg'
import closeIcon from '/src/components/Icon/close.svg'
import deleteIcon from '/src/components/Icon/delete.svg'
import addIcon from '/src/components/Icon/add.svg'
import updateIcon from '/src/components/Icon/update.svg'

const EvalIndicator: React.FC = () => {
  const navigate = useNavigate();
  //-----------------------------------------------------------------------------------
  //States :
  const { error, dataIndicator, getEvalIndicatorListData } =
    EvalIndicatorList();

  const { errorParam, dataParam, getEvalParamListData } = EvalParamList();
  const { deleteEvalIndicator, errordelete } = EvalIndicatorDelete();
  const { updateEvalIndicator, errorUpdateIndicator } = EvalIndicatorUpdate();
  const { addEvalIndicator, errorCreateIndicator } = EvalIndicatorAdd();

  const [addModal, setaddModal] = useState(false);
  const [showListModal, setshowListModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);
  const [selectedIndicator, setselectedIndicator] = useState<any>(null);
  const [newIndicatorTitle, setnewIndicatorTitle] = useState('');
  const [newIndicatorEvalParamId, setnewIndicatorEvalParamId] =
    useState<any>(null);
  const [newIndicatorGoal, setnewIndicatorGoal] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [goal, setGoal] = useState('');

  const [evalParamId, setevalParamId] = useState<number | null>(null);
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState(false);

  //-----------------------------------------------------------------------------------
  //Functions :
  const handleDelete = async (id: string) => {
    await deleteEvalIndicator(id);
    setdeleteModal(false);
  };

  const handleAdd = async (title: string) => {

    if (title !== "" && evalParamId && goal !== "") {
      await addEvalIndicator(title, evalParamId, goal);
      setaddModal(false);
      setselectedIndicator('');
    } else {
      setEmptyError(true);
      setTimeout(() => {
        setEmptyError(false);
      }, 4000);
    }

  };

  const handleupdate = async (
    title: string,
    id: string,
    evalParamId: number,
    goal: string,
  ) => {
    await updateEvalIndicator(title, id, evalParamId, goal);
    setupdateModal(false);
  };

  const PrintTableButton = ({ tableRef }) => {
    const handlePrint = useReactToPrint({
      content: () => tableRef.current,
    });

    return (
      <button
        className="flex items-center justify-center rounded-md  p-4 text-center bg-emerald-400 font-medium text-white hover:bg-opacity-90 mb-4"
        onClick={handlePrint}
      >
        {' '}
        پرینت
        <img src={PrintIcon} />
      </button>
    );
  };

  const tableRef = useRef();

  const filteredData = dataIndicator.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );

  useEffect(() => {
    const fetchData = async () => {
      await getEvalIndicatorListData();
      await getEvalParamListData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedIndicator) {
      setnewIndicatorTitle(selectedIndicator.title);
      setnewIndicatorEvalParamId(selectedIndicator.evaluation_parameter.title);
      setevalParamId(selectedIndicator.evaluation_parameter.id);
      setnewIndicatorGoal(selectedIndicator.goal);
    }
  }, [selectedIndicator]);



  //------------------------------------------------------------------------------------

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
      {(errorUpdateIndicator || errordelete || errorCreateIndicator) && <EvalError myError={"عملیات موفقیت آمیز نبود!"} />}

      {errorParam && <EvalError myError={" در دریافت لیست!"} />}

      <Breadcrumb />

      <div className="flex justify-between w-full">
        <EvalModal
          addModalText="افزودن شاخص"
          myModalFuncClick={() => {
            setaddModal(true);
          }}
        />
        <PrintTableButton tableRef={tableRef} />
      </div>

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {emptyError && <Error myError={" لطفا همه فیلد ها را پر کنید! "} />}


                <ModalTopic
                  modalTopicText="نمایش شاخص"
                  modalTopicCloseBtn={() => setaddModal(false)}
                />
                <CustomInput
                  label="نام شاخص"
                  value={newIndicatorTitle}
                  onChange={setnewIndicatorTitle}
                  placeholder="نام شاخص را وارد کنید"
                />
                <div className="relative  px-6 py-3 flex-auto text-right">
                  <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                    پارامتر ارزیابی
                  </p>
                  <select
                    value={evalParamId || ''}
                    onChange={(e) => {
                      setevalParamId(Number(e.target.value));
                    }}
                    className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                      }`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      پارامتر ارزیابی
                    </option>

                    {dataParam.map((item: any) => (
                      <option
                        value={item.id}
                        className="text-body dark:text-bodydark"
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>
                <CustomInput
                  label="هدف شاخص"
                  value={goal}
                  onChange={setGoal}
                  placeholder="هدف شاخص را وارد کنید"
                />
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

      <div
        ref={tableRef}
        className="w-full max-w-full rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <div className="flex flex-col gap-9 rounded-xl">
          <div className="rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <div className="flex flex-col">
                <div className="-m-1.5 overflow-x-auto ">
                  <div className="p-1.5 min-w-full inline-block align-middle ">
                    <div className="overflow-hidden ">
                      <table className="min-w-full divide-y divide-bg-zinc-200 dark:divide-bg-zinc-200 border-zinc-200">
                        {/*Topics for add to list*/}
                        
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              نام شاخص
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              پارامتر شاخص
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                               هدف
                            </th>

                            <th
                              scope="col"
                              className="px-6 py-3 text-center text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-1/6"
                            >
                              عملیات
                            </th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 border-zinc-200">
                          {(filteredData ? filteredData : dataIndicator).map(
                            (item: any, index: number) => (
                              <tr key={index} className="border-zinc-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.evaluation_parameter.title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.goal}
                                </td>

                                <td className=" py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">

                                  <Link
                                    to={`/evalIndicator/evalIndicatorGuyeh/${item.id}`}
                                    state={item.id}
                                    className="inline-flex items-center justify-center rounded-md bg-violet-200 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                  >
                                    <GuyehIcon />
                                  </Link>

                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedIndicator(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <img src={addIcon} />
                                  </button>

                                  {showListModal &&
                                    selectedIndicator?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto w-1/3	">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                نمایش شاخص
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setshowListModal(false)
                                                }
                                              >
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative  px-6 py-3  flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام شاخص:{' '}
                                                {selectedIndicator.title}
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                پارامتر ارزیابی:{' '}
                                                {
                                                  item.evaluation_parameter
                                                    .title
                                                }
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                هدف شاخص :{' '}
                                                {selectedIndicator.goal}
                                              </p>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">

                                              <CustomButton
                                                onClick={() => setshowListModal(false)}
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                  ) : null}

                                  <button
                                    className="inline-flex items-center  justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedIndicator(item);
                                      setupdateModal(true);
                                    }}
                                  >
                                    <img src={updateIcon} />
                                  </button>
                                  {updateModal &&
                                    selectedIndicator?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                ویرایش اطلاعات شاخص
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setupdateModal(false)
                                                }
                                              >
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative  px-6 py-3  flex-auto text-right">
                                              <CustomInput
                                                label="نام شاخص"
                                                value={newIndicatorTitle}
                                                onChange={setnewIndicatorTitle}
                                                placeholder="نام شاخص را وارد کنید"
                                              />
                                            </div>
                                            <div className="relative  px-6 py-3  flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                                                پارامتر ارزیابی
                                              </p>
                                              <select
                                                value={evalParamId || ''}
                                                onChange={(e) => {
                                                  setevalParamId(
                                                    Number(e.target.value),
                                                  );
                                                }}
                                                className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected
                                                  ? 'text-black dark:text-white'
                                                  : ''
                                                  }`}
                                              >
                                                <option
                                                  value=""
                                                  disabled
                                                  className="text-body dark:text-bodydark"
                                                >
                                                  پارامتر ارزیابی
                                                </option>
                                                {dataParam.map(
                                                  (
                                                    item: any,
                                                    index: number,
                                                  ) => (
                                                    <option
                                                      value={item.id}
                                                      className="text-body dark:text-bodydark"
                                                    >
                                                      {item.title}
                                                    </option>
                                                  ),
                                                )}
                                              </select>
                                            </div>

                                            <div className="relative  px-6 py-3  flex-auto text-right">
                                              <CustomInput
                                                label="هدف شاخص"
                                                value={goal}
                                                onChange={setGoal}
                                                placeholder="هدف شاخص را وارد کنید"
                                              />
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">

                                              <CustomButton
                                                onClick={() => setupdateModal(false)}
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>
                                              <button
                                                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                                                type="button"
                                                onClick={() =>
                                                  handleupdate(
                                                    newIndicatorTitle,
                                                    item.id,
                                                    evalParamId,
                                                    newIndicatorGoal,
                                                  )
                                                }
                                              >
                                                ذخیره تغییرات
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                  ) : null}

                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-red-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedIndicator(item);
                                      setdeleteModal(true);
                                    }}
                                  >
                                    <img src={deleteIcon} />
                                  </button>

                                  {deleteModal &&
                                    selectedIndicator?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                حذف شاخص
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setdeleteModal(false)
                                                }
                                              >
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative p-6 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام شاخص:{' '}
                                                {selectedIndicator.title}
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                پارامتر ارزیابی:{' '}
                                                {
                                                  selectedIndicator
                                                    .evaluation_parameter.title
                                                }
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                هدف شاخص :{' '}
                                                {selectedIndicator.goal}
                                              </p>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">

                                              <CustomButton
                                                onClick={() => setdeleteModal(false)}
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>


                                              <CustomButton
                                                onClick={() => handleDelete('' + selectedIndicator.id,)}
                                                className="bg-red-500	text-white font-bold"
                                              >
                                                حذف شاخص
                                              </CustomButton>

                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                  ) : null}
                                </td>
                              </tr>
                            ),
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

export default EvalIndicator;
