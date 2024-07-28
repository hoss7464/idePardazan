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
import CustomButton from '../../components/CustomeBtn/CustomBtn';
import PrintIcon from '/src/components/Icon/print.svg'
import closeIcon from '/src/components/Icon/close.svg'
import ErrorIcon from '/src/components/Icon/delete.svg'
import ErrorIcon from '/src/components/Icon/add.svg'
import ErrorIcon from '/src/components/Icon/update'

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

  const [selectedPeriod, setselectedPeriod] = useState<any>(null);
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
      setselectedPeriod('');
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
      if (selectedPeriod) {
        setnewPeriodName(selectedPeriod.name);
        const sd = new Date(selectedPeriod.start_date);
        setstart_date_persian(sd.toLocaleDateString('fa-IR'));
        const ed = new Date(selectedPeriod.end_date);
        setend_date_persian(ed.toLocaleDateString('fa-IR'));
      }
    }, [selectedPeriod]);


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
                    <img src={closeIcon} />

                  </button>
                </div>
                <div className="relative px-6 py-3 flex-auto text-right">
                  <CustomInput
                    label="نام دوره"
                    value={newPeriodName}
                    onChange={setnewPeriodName}
                    placeholder="نام دوره را وارد کنید"
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

                  <CustomButton
                    onClick={() => {
                      setaddModal(false),
                        setStart_date(''),
                        setend_date(''),
                        setnewPeriodName('');
                    }} className="text-red-500 font-bold background-transparent"
                  >
                    بستن
                  </CustomButton>

                  <CustomButton
                    onClick={() =>
                      handleAdd(newPeriodName, start_date, end_date)
                    }
                    className="btnCustmColor"
                  >
                    افزودن دوره
                  </CustomButton>

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
                                      setselectedPeriod(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/add.svg' />

                                  </button>
                                  {showListModal &&
                                    selectedPeriod?.id === item.id ? (
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
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام شرکت: {selectedPeriod.name}
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

                                              <CustomButton
                                                onClick={() =>
                                                  setshowListModal(false)
                                                }
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
                                    className="inline-flex items-center justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedPeriod(item);
                                      setupdateModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/update.svg' />

                                  </button>
                                  {updateModal &&
                                    selectedPeriod?.id === item.id ? (
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
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative px-6 py-3 flex-auto text-right">
                                              <CustomInput
                                                label="نام دوره"
                                                value={newPeriodName}
                                                onChange={setnewPeriodName}
                                                placeholder="نام دوره را وارد کنید"
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

                                              <CustomButton
                                                onClick={() =>
                                                  setupdateModal(false)
                                                }
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>

                                              <CustomButton
                                                onClick={() =>
                                                  handleupdate(
                                                    newPeriodName,
                                                    item.id,
                                                    start_date,
                                                    end_date
                                                  )}
                                                className="btnCustmColor"
                                              >
                                                ذخیره تغییرات
                                              </CustomButton>
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
                                      setselectedPeriod(item);
                                      setdeleteModal(true);
                                    }}
                                  >
                                    <img src="/src/components/Icon/delete.svg" />
                                  </button>

                                  {deleteModal &&
                                    selectedPeriod?.id === item.id ? (
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
                                                <img src={closeIcon} />
                                              </button>
                                            </div>
                                            <div className="relative p-6 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام دوره: {selectedPeriod.name}
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
                                                onClick={() =>
                                                  handleDelete(
                                                    '' + selectedPeriod.id,
                                                  )
                                                }
                                                className="bg-red-500	text-white font-bold"
                                              >
                                                حذف دوره
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

export default AdminPeriod;
