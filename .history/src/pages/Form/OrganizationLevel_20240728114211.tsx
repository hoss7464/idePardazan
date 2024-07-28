import { useEffect, useRef, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import OrganizationLevelList from '../../hooks/OrganizationLevel/OrganizationLevelList';
import OrganizationLevelDelete from '../../hooks/OrganizationLevel/OrganizationLevelDelete';
import OrganizationLevelUpdate from '../../hooks/OrganizationLevel/OrganizationLevelUpdate';
import OrganizationLevelAdd from '../../hooks/OrganizationLevel/OrganizationLevelAdd';
import { useReactToPrint } from 'react-to-print';
import Error from '../../components/Error/Error';
import SearchInput from '../../components/SearchInput/SearchInput';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomeBtn/CustomBtn';
//-----------------------------------------------------------------------------------

const OrganizationLevel: React.FC = () => {

  const { errorOL, dataOL, getOrganizationLevelList } = OrganizationLevelList();
  const { deleteOL, errordelete } = OrganizationLevelDelete();
  const { updateOL, errorupdate } = OrganizationLevelUpdate();
  const { addOL, errorAdd } = OrganizationLevelAdd();

  const [addModal, setaddModal] = useState(false);
  const [showListModal, setshowListModal] = useState(false);
  const [updateModal, setupdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const [selectedOL, setselectedOL] = useState<any>(null);
  const [newOLName, setnewOLName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [emptyError, setEmptyError] = useState(false);

  //-----------------------------------------------------------------------------------

  const handleDelete = async (id: string) => {
    await deleteOL(id);
    setdeleteModal(false);
  };

  const handleAdd = async (title: string) => {
    if (title !== "") {
      await addOL(title);
      setaddModal(false);
      setselectedOL('');
    } else {
      setEmptyError(true);
      setTimeout(() => {
        setEmptyError(false);
      }, 4000);
    }
  };

  const handleupdateCompany = async (title: string, id: string) => {
    await updateOL(title, id);
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
        <img src='/src/components/Icon/print.svg' />
      </button>
    );
  };

  const tableRef = useRef();

  const filteredData = dataOL.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase()),
    ),
  );
  //-----------------------------------------------------------------------------------

  useEffect(() => {
    const fetchData = async () => {
      await getOrganizationLevelList();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedOL) setnewOLName(selectedOL.title);
  }, [selectedOL]);
  //-----------------------------------------------------------------------------------

  return (
    <>

      {errorupdate || errorAdd || errordelete &&
        <Error myError={"عملیات موفقیت آمیز نبود!"} />
      }

      <SearchInput
        myType="text"
        myPlaceHolder="جستجو کنید..."
        myVal={searchTerm}
        myOnChnage={(event) => {
          setSearchTerm(event.target.value);
        }}
      />

      <Breadcrumb pageName="سطح سازمانی" />

      <div className="flex justify-between">
        <button
          className="inline-flex rounded-md items-center justify-center  bg-meta-3 py-3 px-3 text-center font-medium text-white hover:bg-opacity-90 ml-2 mb-5 btnCustmColor"
          type="button"
          onClick={() => {
            setaddModal(true);
          }}
        >
          افزودن سطح سازمانی
        </button>

        <PrintTableButton tableRef={tableRef} />
      </div>

      {addModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  text-sm">
            <div className="relative my-6 mx-auto w-1/3">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                  {emptyError && (
                    <Error myError={" لطفا همه فیلد ها را پر کنید! "} />
                  )}
                  <h3 className="text-xl font-semibold">افزودن سطح سازمانی</h3>

                  <button className="" onClick={() => setaddModal(false)}>
                    <img src='/src/components/Icon/close.svg' />

                  </button>
                </div>
                <div className="relative p-6 flex-auto text-right">
                  <CustomInput
                    label="نام سطح سازمانی"
                    value={newOLName}
                    onChange={setnewOLName}
                    placeholder="  نام سطح سازمانی  را وارد کنید"
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
                  <CustomButton
                                                onClick={() => setshowListModal(false)}
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                    type="button"
                    onClick={() => handleAdd(newOLName)}
                  >
                    افزودن سطح سازمانی
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
                              نام سطح سازمانی
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
                          {(filteredData ? filteredData : dataOL).map(
                            (item: any, index: number) => (
                              <tr key={index} className="border-zinc-200">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                  {item.title}
                                </td>

                                <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                  <button
                                    className="inline-flex items-center justify-center rounded-md bg-teal-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedOL(item);
                                      setshowListModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/add.svg' />

                                  </button>
                                  {showListModal &&
                                    selectedOL?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto w-1/3	">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                نمایش سطح سازمانی
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setshowListModal(false)
                                                }
                                              >
                                                <img src='/src/components/Icon/close.svg' />

                                              </button>
                                            </div>
                                            <div className="relative p-6 flex-auto text-right">
                                              <p className="my-4 text-blueGray-500 text-md leading-relaxed">
                                                نام سطح سازمانی:{' '}
                                                {selectedOL.title}
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
                                    className="inline-flex items-center justify-center rounded-md bg-cyan-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                    type="button"
                                    onClick={() => {
                                      setselectedOL(item);
                                      setupdateModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/update.svg' />

                                  </button>
                                  {updateModal && selectedOL?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                ویرایش اطلاعات سطح سازمانی
                                              </h3>

                                              <button
                                                className=""
                                                onClick={() =>
                                                  setupdateModal(false)
                                                }
                                              >
                                                <img src='/src/components/Icon/close.svg' />

                                              </button>
                                            </div>
                                            <div className="relative p-6 flex-auto text-right">
                                              <CustomInput
                                                label="نام سطح سازمانی"
                                                value={newOLName}
                                                onChange={setnewOLName}
                                                placeholder="  نام سطح سازمانی  را وارد کنید"
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
                                                  handleupdateCompany(
                                                    newOLName,
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
                                      setselectedOL(item);
                                      setdeleteModal(true);
                                    }}
                                  >
                                    <img src='/src/components/Icon/delete.svg' />

                                  </button>

                                  {deleteModal && selectedOL?.id === item.id ? (
                                    <>
                                      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                        <div className="relative my-6 mx-auto  w-1/3">
                                          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                            <div className="flex items-start justify-between p-5 border-b border-solid border-zinc-200 rounded-t">
                                              <h3 className="text-xl font-semibold">
                                                حذف سطح سازمانی
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
                                                نام سطح سازمانی:{' '}
                                                {selectedOL.title}
                                              </p>
                                            </div>
                                            <div className="flex items-center justify-end p-6 border-t border-solid border-zinc-200 rounded-b">
                                              <CustomButton
                                                onClick={() => setdeleteModal(false)}
                                                className="text-red-500 font-bold background-transparent"
                                              >
                                                بستن
                                              </CustomButton>

                                              <button
                                                className="bg-red-500	 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 btnCustmColor"
                                                type="button"
                                                onClick={() =>
                                                  handleDelete(
                                                    '' + selectedOL.id,
                                                  )
                                                }
                                              >
                                                حذف سطح سازمانی
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

export default OrganizationLevel;
