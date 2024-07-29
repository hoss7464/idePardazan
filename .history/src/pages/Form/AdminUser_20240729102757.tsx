import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AdminUserList from '../../hooks/AdminUser/AdminUserList';
import AdminUserDelete from '../../hooks/AdminUser/AdminUserDelete';
import { useReactToPrint } from 'react-to-print';
import Error from '../../components/Error/Error';
import SearchInput from '../../components/SearchInput/SearchInput';
import CustomButton from '../../components/CustomeBtn/CustomBtn';
import PrintIcon from '/src/components/Icon/print.svg'
import closeIcon from '/src/components/Icon/close.svg'
import deleteIcon from '/src/components/Icon/delete.svg'
import addIcon from '/src/components/Icon/add.svg'
import updateIcon from '/src/components/Icon/update.svg'

//-----------------------------------------------------------------------------------

const AddUser: React.FC = () => {

  const { error, data, create } = AdminUserList();
  const { deleteUser, errordelete } = AdminUserDelete();

  const [showListModal, setshowListModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const [selectedAdminUser, setselectedAdminUser] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showErrorTimer, setShowErrorTimer] = useState(false);

  //-----------------------------------------------------------------------------------

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setdeleteModal(false);
  };

  const PrintTableButton = ({ tableRef }) => {
    const handlePrint = useReactToPrint({
      content: () => tableRef.current,
    });

    useEffect(() => {
      const fetchData = async () => {
        await create();
      };
      fetchData();
    }, []);

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
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    if (error || errordelete) {
      setShowErrorTimer(true);
      const timer = setTimeout(() => {
        setShowErrorTimer(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [error, errordelete]);

  //---------------------------------------------------------------------------------------

  return (
    <>
      {showErrorTimer && error && <Error myError={"در دریافت لیست!"} />}

      {showErrorTimer && errordelete && <Error myError={"عملیات حذف موفقیت آمیز نبود!"} />}

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
        <Link
          to="/Member/Add"
          className="inline-flex rounded-md items-center justify-center  bg-meta-3 py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 ml-2 mb-5 btnCustmColor"
          type="button"
        >
          افزودن کاربر
        </Link>

        <PrintTableButton tableRef={tableRef} />
      </div>

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
                              نام و نام خانوادگی
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              شماره همراه
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              کد پرسنلی
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              شرکت
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              عنوان شغلی
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              سطح سازمانی
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                            >
                              واحد سازمانی
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
                                  {item.full_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.phone_number}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.personnel_code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.corporation_name}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.job_title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.organization_unit_title}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.organization_level_title}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedAdminUser(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <img src={addIcon} />

                                  </button>
                                  {showListModal &&
                                    selectedAdminUser?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto w-1/3	">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                نمایش کاربر
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
                                            <div className="relative p-6 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام و نام خانوادگی :{' '}
                                                {selectedAdminUser.full_name}
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                شماره همراه:{' '}
                                                {selectedAdminUser.phone_number}
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                کد پرسنلی:{' '}
                                                {selectedAdminUser.personnel_code}
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                شرکت:{' '}
                                                {
                                                  selectedAdminUser.corporation_name
                                                }
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                واحد سازمانی:{' '}
                                                {
                                                  selectedAdminUser.organization_unit_title
                                                }
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                سطح سازمانی:{' '}
                                                {
                                                  selectedAdminUser.organization_level_title
                                                }
                                              </p>
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                عنوان شغلی:{' '}
                                                {selectedAdminUser.job_title}
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

                                  <Link
                                    to={`/update/${item.id}`}
                                    state={item.id}
                                    className="inline-flex items-center justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                  >
                                    <img src={updateIcon} />

                                  </Link>

                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-red-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedAdminUser(item);
                                      setdeleteModal(true);
                                    }}
                                  >
                                    <img src={deleteIcon} />

                                  </button>

                                  {deleteModal &&
                                    selectedAdminUser?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                حذف کاربر
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
                                                نام کاربر: {item.full_name}
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
                                                onClick={() => handleDelete('' + selectedAdminUser.id,)}
                                                className="bg-red-500	text-white font-bold btnCustmColor">
                                                حذف کاربر
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

export default AddUser;
