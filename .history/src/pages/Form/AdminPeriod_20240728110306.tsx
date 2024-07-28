import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminPeriodList from '../../hooks/AdminPeriod/AdminPeriodList';
import AdminPeriodAdd from '../../hooks/AdminPeriod/AdminPeriodAdd';
import { DatePicker } from '@react-shamsi/datepicker';
import AdminPeriodDelete from '../../hooks/AdminPeriod/AdminPeriodDelete';
import AdminPeriodUpdate from '../../hooks/AdminPeriod/AdminPeriodUpdate';
import { useReactToPrint } from 'react-to-print';
import Error from '../../components/Error/Error';
import SearchInput from '../../components/SearchInput/SearchInput';
import CustomInput from '../../components/CustomInput/CustomInput';

//-----------------------------------------------------------------------------------

const AdminPeriod: React.FC = () => {

  const { error, data, getAdminPeriodListData } = AdminPeriodList();
  const { deletePeriod, errordelete } = AdminPeriodDelete();
  const { updatePeriod, errorupdate } = AdminPeriodUpdate();
  const { addPeriod, errorAdd } = AdminPeriodAdd();

  const [addModal, setaddModal] = useState(false);
  const [showListModal, setshowListModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [newPeriodName, setnewPeriodName] = useState('');
  const [start_date, setStart_date] = useState('');
  const [start_date_persian, setstart_date_persian] = useState('');
  const [end_date, setend_date] = useState('');
  const [end_date_persian, setend_date_persian] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [emptyError, setEmptyError] = useState(false);

  //-----------------------------------------------------------------------------------

  const handleStartDateChange = (selectedDate: any) => {
    const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
    setStart_date(formattedDate);
    setstart_date_persian(selectedDate.toLocaleDateString('fa-IR'));
  };

  const handleEndDateChange = (selectedDate: any) => {
    const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
    setend_date(formattedDate);
    setend_date_persian(selectedDate.toLocaleDateString('fa-IR'));
  };

  const handleDelete = async (id: string) => {
    await deletePeriod(id);
    setdeleteModal(false);
  };

  const handleAdd = async (name: string, start_date: Date, end_date: Date) => {
    if (name !== "" && start_date && end_date) {
      await addPeriod(name, start_date, end_date);
      setaddModal(false);
      setSelectedCompany('');
    } else {
      setEmptyError(true);
      setTimeout(() => {
        setEmptyError(false);
      }, 4000);
    }
  };

  const handleupdate = async (
    name: string,
    id: string,
    start_date: Date,
    end_date: Date,
  ) => {
    await updatePeriod(name, id, start_date, end_date);
    setupdateModal(false);
  };

  const PrintTableButton = ({ tableRef }) => {
    const handlePrint = useReactToPrint({
      content: () => tableRef.current,
    });

    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    );

    //-----------------------------------------------------------------------------------

    useEffect(() => {
      const fetchData = async () => {
        await getAdminPeriodListData();
      };
      fetchData();
    }, []);

    useEffect(() => {
      if (selectedCompany) {
        setnewPeriodName(selectedCompany.name);
        const sd = new Date(selectedCompany.start_date);
        setstart_date_persian(sd.toLocaleDateString('fa-IR'));
        const ed = new Date(selectedCompany.end_date);
        setend_date_persian(ed.toLocaleDateString('fa-IR'));
      }
    }, [selectedCompany]);


    return (
      <button
        className="flex items-center justify-center rounded-md  p-4 text-center bg-emerald-400 font-medium text-white hover:bg-opacity-90 mb-4"
        onClick={handlePrint}
      >
        {' '}
        پرینت
        <img src='/src/components/Icon/print.svg' />
      </button>
    );
  };

  //-----------------------------------------------------------------------------------

  const tableRef = useRef();

  const filteredData = data.filter((item: any) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>

      {error && <Error myError={"در دریافت لیست دوره ها!"} />}

      {(errorAdd || errordelete || errorupdate) && <Error myError={"عملیات موفقیت آمیز نبود!"} />}


      <SearchInput
        myType="text"
        myPlaceHolder="جستجو کنید..."
        myVal={searchTerm}
        myOnChnage={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <Breadcrumb />

      <div className="flex justify-between">
        <button
          className="inline-flex rounded-md items-center justify-center  bg-meta-3 py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 ml-2 mb-5 btnCustmColor"
          type="button"
          onClick={() => {
            setaddModal(true);
          }}
        >
          افزودن دوره
        </button>

        <PrintTableButton tableRef={tableRef} />
      </div>

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">

                  {emptyError && <Error myError={"لطفا همه فیلد ها را پر کنید!"} />}

                  <h3 className="text-xl font-semibold">افزودن دوره</h3>



                  <button className="" onClick={() => setaddModal(false)}>
                    <img src='/src/components/Icon/close.svg' />

                  </button>
                </div>
                <div className="relative px-6 py-3 flex-auto text-right">
                  <p className="my-2 text-blueGray-500 text-md leading-relaxed  mb-0.5">
                    نام دوره
                  </p>
                  <input
                    type="text"
                    placeholder="نام دوره"
                    value={newPeriodName}
                    onChange={(e) => setnewPeriodName(e.target.value)}
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  <CustomInput
                    label="نام  دوره"
                    value={newOLName}
                    onChange={setnewOLName}
                    placeholder="  نام سطح سازمانی  را وارد کنید"
                  />
                </div>
                <div className="relative px-6 py-3 flex-auto text-right">
                  <label className="mb-0.5 block text-black dark:text-white">
                    تاریخ شروع دوره
                  </label>

                  <div className="flex relative z-50 flex-row-reverse text-center justify-center items-center setting-widthDP">
                    <DatePicker
                      value={start_date_persian}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleStartDateChange}
                    />
                  </div>
                </div>
                <div className="relative px-6 py-3 flex-auto text-right">
                  <label className="mb-0.5 block text-black dark:text-white">
                    تاریخ پایان دوره
                  </label>

                  <div className="flex relative z-50 flex-row-reverse text-center justify-center items-center setting-widthDP">
                    <DatePicker
                      value={end_date_persian}
                      dateFormat="yyyy-MM-dd"
                      onChange={handleEndDateChange}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setaddModal(false),
                        setStart_date(''),
                        setend_date(''),
                        setnewPeriodName('');
                    }}
                  >
                    بستن
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                    type="button"
                    onClick={() =>
                      handleAdd(newPeriodName, start_date, end_date)
                    }
                  >
                    افزودن دوره
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
                              نام دوره
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
                          {(filteredData ? filteredData : data).map(
                            (item: any, index: number) => (
                              <tr key={index} className="border-zinc-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.name}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setSelectedCompany(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/add.svg' />

                                  </button>
                                  {showListModal &&
                                    selectedCompany?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto w-1/3	">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                نمایش دوره
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setshowListModal(false)
                                                }
                                              >
                                                <img src="/src/components/Icon/close.svg" />
                                              </button>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام شرکت: {selectedCompany.name}
                                              </p>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                تاریخ شروع دوره:{' '}
                                                {start_date_persian}
                                              </p>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                تاریخ پایان دوره:{' '}
                                                {end_date_persian}
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
                                      setSelectedCompany(item);
                                      setupdateModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/update.svg' />

                                  </button>
                                  {updateModal &&
                                    selectedCompany?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                ویرایش اطلاعات دوره
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setupdateModal(false)
                                                }
                                              >
                                                <img src="/src/components/Icon/close.svg" />
                                              </button>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed mb-0.5">
                                                نام دوره
                                              </p>
                                              <input
                                                type="text"
                                                placeholder="نام جدید"
                                                value={newPeriodName}
                                                onChange={(e) =>
                                                  setnewPeriodName(
                                                    e.target.value,
                                                  )
                                                }
                                                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                              />
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <label className="mb-0.5 block text-black dark:text-white">
                                                تاریخ شروع دوره
                                              </label>

                                              <div className="flex relative z-50 flex-row-reverse text-center justify-center items-center setting-widthDP">
                                                <DatePicker
                                                  value={start_date_persian}
                                                  dateFormat="yyyy-MM-dd"
                                                  onChange={
                                                    handleStartDateChange
                                                  }
                                                />
                                              </div>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <label className="mb-0.5 block text-black dark:text-white">
                                                تاریخ پایان دوره
                                              </label>

                                              <div className="flex relative z-50 flex-row-reverse text-center justify-center items-center setting-widthDP">
                                                <DatePicker
                                                  value={end_date_persian}
                                                  dateFormat="yyyy-MM-dd"
                                                  onChange={handleEndDateChange}
                                                />
                                              </div>
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
                                                    newPeriodName,
                                                    item.id,
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
                                      setSelectedCompany(item);
                                      setdeleteModal(true);
                                    }}
                                  >
                                    <img src="/src/components/Icon/delete.svg" />
                                  </button>

                                  {deleteModal &&
                                    selectedCompany?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                حذف دوره
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setdeleteModal(false)
                                                }
                                              >
                                                <img src="/src/components/Icon/close.svg" />
                                              </button>
                                            </div>
                                            <div className="relative p-6 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام دوره: {selectedCompany.name}
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
                                                    '' + selectedCompany.id,
                                                  )
                                                }
                                              >
                                                حذف دوره
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

export default AdminPeriod;
