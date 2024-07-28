import React from 'react';
import { useEffect, useState } from 'react';
import "./SelectFields/SelectedFields.css"

//---------------------------------------------------------------------------------------------------
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AssignmentSupervieorGetData from '../../hooks/AssignmentSupervisor/AssignmentSupervisorGetData';
import { MultiSelect } from 'react-multi-select-component';
import AssignmentSupervisorStore from '../../hooks/AssignmentSupervisor/AssignmentSupervisorStore';
import AssignmentSupervieorList from '../../hooks/AssignmentSupervisor/AssignmentSupervisorList';
import AssignmentSupervieorDelete from '../../hooks/AssignmentSupervisor/AssignmentSupervisorDelete';
import SearchableSelect from './SelectFields/SearchableSelect';
import CustomSelect from './SelectFields/CustomSelect';
import Error from '../../components/Error/Error';
import EvalIndicatorList from '../../hooks/EvalIndicator/EvalIndicatorList';

//----------------------------------------------------------------------------------------------------

const AssignmentSupervisorIndicator: React.FC = () => {
  const {
    errorPeriod,
    errorSupervisor,
    errorEmployee,
    dataPeriod,
    dataSupervisor,
    dataEmployee,
    getAdminPeriodListData,
    getSupervisorListData,
    getEmployeeListData,
  } = AssignmentSupervieorGetData();

  const { AssignmentStore, errorAdd, doneAssignmentStore } =
    AssignmentSupervisorStore();

  const {
    errorBasedPeriod,
    errorBasedSupervisor,
    dataBasedPeriod,
    dataBasedSupervisor,
    getAdminSAListbasedPeriod,
    getAdminSAListbasedPeriodSupervisor,
  } = AssignmentSupervieorList();

  const {
    errorDelete,
    getAdminSADeletebasedPeriod,
    getAdminSADeletebasedPeriodSupervisor,
    getAdminSADeletebasedPeriodSupervisorEmployee,
  } = AssignmentSupervieorDelete();

  const { error, dataIndicator, getEvalIndicatorListData } =
    EvalIndicatorList();
    
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [period, setPeriod] = useState<number | null>();
  const [supervisor, setSupervisor] = useState<number | null>();
  const [employementList, setEmployementList] = useState<number[]>([]);
  const [selected, setSelected] = useState([]);
  const [dataShow, setDataShow] = useState<object[] | null>([]);

  //----------------------------------------------------------------------------------------------------

  const handleAdd = async () => {
    await AssignmentStore(period, supervisor, employementList);
  };

  const handleShowList = async () => {
    if (period && employementList.length == 0 && !supervisor) {
      await getAdminSAListbasedPeriod(period);
    } else if (period && supervisor && employementList.length == 0) {
      await getAdminSAListbasedPeriodSupervisor(supervisor, period);
    }
  };

  const handleDeleteItem = async (id: number) => {
    await getAdminSADeletebasedPeriodSupervisorEmployee(supervisor, period, id);
  };

  const handleDeleteBasedSelected = async () => {
    if (period && employementList.length == 0 && !supervisor) {
      await getAdminSADeletebasedPeriod(period);
    } else if (period && supervisor && employementList.length == 0) {
      await getAdminSADeletebasedPeriodSupervisor(supervisor, period);
    }
  };

  //----------------------------------------------------------------------------------------------------

  useEffect(() => {
    setDataShow(dataBasedPeriod);
  }, [dataBasedPeriod]);

  useEffect(() => {
    setDataShow(dataBasedSupervisor);
  }, [dataBasedSupervisor]);

  useEffect(() => {
    const fetchData = async () => {
      await getAdminPeriodListData();
      await getEmployeeListData();
      await getSupervisorListData();
      await getEvalIndicatorListData()
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newEmployementList = selected.map((item) => parseInt(item.value));
    setEmployementList(newEmployementList);
  }, [selected]);

  //-------------------------------------------------------------------------------

  const [selectedOptions, setSelectedOptions] = useState<{
    select1: OptionType | null;
    select2: OptionType | null;
    select3: OptionType | null;
    select4: OptionType | null;

  }>({
    select1: null,
    select2: null,
    select3: null
    select4:  null;
  });

  const handleChange =
    (selectName: 'select1' | 'select2'| 'select3' | 'select4') => (option: OptionType | null) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [selectName]: option,
      }));
    };


  //--------------------------------------------------------------------------------

  return (
    <>
      {(errorSupervisor || errorPeriod || errorEmployee) &&
        <Error myError={"در درلیافت لیست!"} />
      }

      {(errorAdd || errorDelete) && (
        <Error myError={" عملیات موفقیت آمیز نبود!"} />
      )}

      <Breadcrumb />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm	">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <div>
                <label className="mb-0.5 block text-black dark:text-white">
                  دوره
                </label>

                <SearchableSelect
                  options={dataPeriod.map((item: any) => ({
                    label: item.name,
                    value: item.id
                  }))}
                  value={selectedOptions.select1}
                  onChange={handleChange('select1')}
                  myPlaceHolder="دوره"
                  myClass="selected-field"
                />

              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <div>
                <label className="mb-0.5 block text-black dark:text-white">
                  ارزیابی کننده
                </label>


                <SearchableSelect
                  options={dataSupervisor.map((item: any) => ({
                    label: item.full_name,
                    value: item.id
                  }))}
                  value={selectedOptions.select2}
                  onChange={handleChange('select2')}
                  myPlaceHolder="یک گزینه انتخاب کنید"
                  myClass="selected-field2"
                />

              </div>
            </div>
          </div>

          <div className="w-full">
            <div>
              <label className="mb-0.5 block text-black dark:text-white">
                ارزیابی
              </label>

              <div className="relative z-10 bg-white dark:bg-form-input">
                <CustomSelect
                  options={dataEmployee.map((item: any) => ({
                    label: item.full_name,
                    value: item.id
                  }))}

                  placeholder="انتخاب کنید" />
              </div>
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <div>
              <label className="mb-0.5 block text-black dark:text-white">
                شاخص ها
              </label>


              <SearchableSelect
                options={dataIndicator.map((item: any) => ({
                  label: item.title,
                  value: item.id
                }))}
                value={selectedOptions.select3}
                onChange={handleChange('select2')}
                myPlaceHolder="یک گزینه انتخاب کنید"
                myClass="selected-field2"
              />

            </div>
          </div>


        <button
          type="button"
          onClick={() => handleAdd()}
          className="flex mt-4.5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 btnCustmColor"
        >
          افزودن کاربر
        </button>
        <button
          type="button"
          onClick={() => handleShowList()}
          className="flex mt-4.5 mb-4.5 w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 bg-teal-400	"
        >
          نمایش
        </button>

        {dataShow?.length !== 0 && (
          <div className="w-full max-w-full rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                                  نام
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                                >
                                  ایمیل
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-start text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-5/6"
                                >
                                  عنوان
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
                                  className="px-6 py-3 text-center text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-1/6"
                                >
                                  عملیات
                                </th>
                              </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 dark:divide-neutral-700 border-zinc-200">
                              {dataShow.map((item: any, index: number) => (
                                <tr key={index} className="border-zinc-200">
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {item.full_name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {item.email}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {item.job_title}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {item.phone_number}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200 border-zinc-200">
                                    {item.personnel_code}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                    <button
                                      className="inline-flex items-center justify-center rounded-md bg-red-100	 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                      type="button"
                                      onClick={() => {
                                        handleDeleteItem(item.id);
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
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>

                          <button
                            type="button"
                            onClick={() => handleDeleteBasedSelected()}
                            className="flex mt-4.5 mb-4.5 w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 bg-red-400	"
                          >
                            حذف همه موارد{' '}
                          </button>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {dataShow?.length == 0 && (
          <div>موردی برای نمایش جدول وجود ندارد!</div>
        )}
      </div>
    </div >
    </>
  );
};

export default AssignmentSupervisorIndicator;
