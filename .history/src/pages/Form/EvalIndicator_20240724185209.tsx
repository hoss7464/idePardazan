import { useEffect, useState, useRef } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useReactToPrint } from 'react-to-print';
import EvalIndicatorList from '../../hooks/EvalIndicator/EvalIndicatorList';
import EvalIndicatorDelete from '../../hooks/EvalIndicator/EvalIndicatorDelete';
import EvalIndicatorUpdate from '../../hooks/EvalIndicator/EvalIndicatorUpdate';
import EvalIndicatorAdd from '../../hooks/EvalIndicator/EvalIndicatorAdd';
import EvalParamList from '../../hooks/EvalParam/EvalParamList';

const EvalIndicator: React.FC = () => {
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

  const handleDelete = async (id: string) => {
    await deleteEvalIndicator(id);
    setdeleteModal(false);
  };

  const handleAdd = async (title: string) => {
    await addEvalIndicator(title, evalParamId, goal);
    setaddModal(false);
    setselectedIndicator('');
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
        <svg
          className="mr-2 fill-white"
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21.5 10H18V5.635L13.281 1H6v9H2.5A1.5 1.5 0 0 0 1 11.5v8A1.5 1.5 0 0 0 2.5 21H6v2h12v-2h3.5a1.5 1.5 0 0 0 1.5-1.5v-8a1.5 1.5 0 0 0-1.5-1.5zM17 6h-4V2zM7 2h5v5h5v3H7zm10 20H7v-5h10zm5-2.5a.5.5 0 0 1-.5.5H18v-2h1v-2H5v2h1v2H2.5a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h19a.5.5 0 0 1 .5.5zm-7 .5v1H9v-1zm-6-1v-1h6v1zm10-7h1v1h-1z" />
          <path fill="none" d="M0 0h24v24H0z" />
        </svg>
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

  return (
    <>
      <input
        type="text"
        placeholder="جستجو کنید..."
        className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-4"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      {errorUpdateIndicator && (
        <div
          className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="font-medium ml-10">خطا! </span>
          </div>
          {errorUpdateIndicator}
        </div>
      )}

      <Breadcrumb pageName="شاخصهای ارزیابی" />
      <div className="flex justify-between w-full">
        <button
          className="inline-flex rounded-md items-center justify-center  bg-meta-3 py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 ml-2 mb-5 btnCustmColor"
          type="button"
          onClick={() => {
            setaddModal(true);
          }}
        >
          افزودن شاخص
        </button>
        <PrintTableButton tableRef={tableRef} />
      </div>

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                  <h3 className="text-xl font-semibold">نمایش شاخص</h3>

                  <button className="" onClick={() => setaddModal(false)}>
                  <img src='/src/components/Icon/close.svg'/>

                  </button>
                </div>

                <div className="relative  px-6 py-3  flex-auto text-right">
                  <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                    نام شاخص
                  </p>
                  <input
                    type="text"
                    placeholder="نام شاخص"
                    value={newIndicatorTitle}
                    onChange={(e) => setnewIndicatorTitle(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="relative  px-6 py-3 flex-auto text-right">
                  <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                    پارامتر ارزیابی
                  </p>
                  <select
                    value={evalParamId || ''}
                    onChange={(e) => {
                      setevalParamId(Number(e.target.value));
                    }}
                    className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                      isOptionSelected ? 'text-black dark:text-white' : ''
                    }`}
                  >
                    <option
                      value=""
                      disabled
                      className="text-body dark:text-bodydark"
                    >
                      پارامتر ارزیابی
                    </option>
                    {dataParam.map((item: any, index: number) => (
                      <option
                        value={item.id}
                        className="text-body dark:text-bodydark"
                      >
                        {item.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="relative  px-6 py-3  flex-auto text-right">
                  <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                    هدف شاخص
                  </p>
                  <input
                    type="text"
                    placeholder="هدف شاخص"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>

                <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setaddModal(false)}
                  >
                    بستن
                  </button>

                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                    type="button"
                    onClick={() => handleAdd(newIndicatorTitle)}
                  >
                    افزودن شاخص
                  </button>
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
                <div className="-m-1.5 overflow-x-auto">
                  <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden">
                      <table className="min-w-full divide-y divide-bg-zinc-200 dark:divide-bg-zinc-200 border-zinc-200">
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
                              پارامتر ارزیابی
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

                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedIndicator(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      stroke="#39DA8A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="miter"
                                    >
                                      <path d="M2,12S5,4,12,4s10,8,10,8-2,8-10,8S2,12,2,12Z"></path>
                                      <circle cx="12" cy="12" r="4"></circle>
                                    </svg>
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
                                               <img src='/src/components/Icon/close.svg'/>

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
                                              <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                  setshowListModal(false)
                                                }
                                              >
                                                بستن
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                  ) : null}

                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedIndicator(item);
                                      setupdateModal(true);
                                    }}
                                  >
                                    <svg
                                      width="20px"
                                      height="20px"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
                                        stroke="#85AAF2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                      <path
                                        d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
                                        stroke="#85AAF2"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      />
                                    </svg>
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
                                                <svg
                                                  width="20px"
                                                  height="20px"
                                                  viewBox="0 0 24 24"
                                                  fill="#737373"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
                                                    fill="#737373"
                                                  />
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                                                    fill="#737373"
                                                  />
                                                </svg>
                                              </button>
                                            </div>
                                            <div className="relative  px-6 py-3  flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed mb-0.5">
                                                نام شاخص
                                              </p>
                                              <input
                                                type="text"
                                                placeholder="نام جدید"
                                                value={newIndicatorTitle}
                                                onChange={(e) =>
                                                  setnewIndicatorTitle(
                                                    e.target.value,
                                                  )
                                                }
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                                                className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                                                  isOptionSelected
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
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                                                هدف شاخص
                                              </p>
                                              <input
                                                type="text"
                                                placeholder="هدف شاخص"
                                                value={newIndicatorGoal}
                                                onChange={(e) =>
                                                  setnewIndicatorGoal(
                                                    e.target.value,
                                                  )
                                                }
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                                              <button
                                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                  setupdateModal(false)
                                                }
                                              >
                                                بستن
                                              </button>
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
                                    <svg
                                      width="20px"
                                      strokeWidth="2"
                                      height="20px"
                                      viewBox="0 0 1024 1024"
                                      className="icon"
                                      version="1.1"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z"
                                        fill="#FF5C5D"
                                      />
                                      <path
                                        d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z"
                                        fill="#FF5C5D"
                                      />
                                    </svg>
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
                                                <svg
                                                  width="20px"
                                                  height="20px"
                                                  viewBox="0 0 24 24"
                                                  fill="#737373"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                >
                                                  <path
                                                    d="M8.00191 9.41621C7.61138 9.02569 7.61138 8.39252 8.00191 8.002C8.39243 7.61147 9.0256 7.61147 9.41612 8.002L12.0057 10.5916L14.5896 8.00771C14.9801 7.61719 15.6133 7.61719 16.0038 8.00771C16.3943 8.39824 16.3943 9.0314 16.0038 9.42193L13.4199 12.0058L16.0039 14.5897C16.3944 14.9803 16.3944 15.6134 16.0039 16.004C15.6133 16.3945 14.9802 16.3945 14.5896 16.004L12.0057 13.42L9.42192 16.0038C9.03139 16.3943 8.39823 16.3943 8.00771 16.0038C7.61718 15.6133 7.61718 14.9801 8.00771 14.5896L10.5915 12.0058L8.00191 9.41621Z"
                                                    fill="#737373"
                                                  />
                                                  <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                                                    fill="#737373"
                                                  />
                                                </svg>
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
                                              <button
                                                className="text-black background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                  setdeleteModal(false)
                                                }
                                              >
                                                بستن
                                              </button>
                                              <button
                                                className="bg-red-500	 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                                                type="button"
                                                onClick={() =>
                                                  handleDelete(
                                                    '' + selectedIndicator.id,
                                                  )
                                                }
                                              >
                                                حذف شاخص
                                              </button>
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
                      {errordelete && (
                        <div className="mt-4 text-red-500">{errordelete}</div>
                      )}
                      {error && (
                        <div className="mt-4 text-red-500">{error}</div>
                      )}
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
