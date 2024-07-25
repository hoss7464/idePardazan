import React from 'react';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AssignmentSupervieorGetData from '../../hooks/AssignmentSupervisor/AssignmentSupervisorGetData';
import { MultiSelect } from 'react-multi-select-component';
import AssignmentSupervisorStore from '../../hooks/AssignmentSupervisor/AssignmentSupervisorStore';
import AssignmentSupervieorList from '../../hooks/AssignmentSupervisor/AssignmentSupervisorList';
import AssignmentSupervieorDelete from '../../hooks/AssignmentSupervisor/AssignmentSupervisorDelete';

const CustomMultiSelect = ({ dataEmployee, selected, setSelected }) => {
  const customItemRenderer = ({ checked, option, onClick }) => (
    <div className="custom-item" onClick={onClick}>
      <input type="checkbox" checked={checked} readOnly />
      <span>{option.label}</span>
    </div>
  );

  const customSelectedRenderer = (selected, options) => {
    return (
      <div className="custom-selected-list">
        {selected.map((item) => (
          <div key={item.value} className="custom-selected-item">
            {item.label}
            <button
              onClick={() =>
                setSelected(selected.filter((s) => s.value !== item.value))
              }
              className="remove-btn"
            >
              x
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <MultiSelect
      options={dataEmployee.map((item) => ({
        label: item.full_name,
        value: item.id.toString(),
      }))}
      value={selected}
      onChange={setSelected}
      labelledBy="ارزیابی شونده ها"
      isCreatable={true}
      ItemRenderer={customItemRenderer}
      className="custom-multi-select multiSearchInput"
      overrideStrings={{
        selectSomeItems: 'چند آیتم را انتخاب کنید...',
        allItemsAreSelected: 'همه موارد انتخاب شده‌اند',
        selectAll: 'انتخاب همه',
        search: 'جستجو',
      }}
      selectedValueRenderer={customSelectedRenderer}
    />
  );
};

const AssignmentSupervisorAdd: React.FC = () => {
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

  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [period, setPeriod] = useState<number | null>();
  const [supervisor, setSupervisor] = useState<number | null>();
  const [employementList, setEmployementList] = useState<number[]>([]);
  const [selected, setSelected] = useState([]);
  const [dataShow, setDataShow] = useState<object[] | null>([]);

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
  useEffect(() => {
    const fetchData = async () => {
      await getAdminPeriodListData();
      await getEmployeeListData();
      await getSupervisorListData();
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newEmployementList = selected.map((item) => parseInt(item.value));
    setEmployementList(newEmployementList);
  }, [selected]);

  useEffect(() => {
    setDataShow(dataBasedPeriod);
  }, [dataBasedPeriod]);

  useEffect(() => {
    setDataShow(dataBasedSupervisor);
  }, [dataBasedSupervisor]);

  return (
    <>
      <Breadcrumb pageName="انتساب ارزیابی شونده" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm	">
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <div>
                <label className="mb-0.5 block text-black dark:text-white">
                  دوره
                </label>

                <div className="relative z-10 bg-white dark:bg-form-input">
                  <select
                    value={period || ''}
                    onChange={(e) => {
                      setPeriod(e.target.value);
                      setIsOptionSelected(true);
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
                      دوره
                    </option>
                    {dataPeriod.map((item: any, index: number) => (
                      <option
                        value={item.id}
                        className="text-body dark:text-bodydark"
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>

                  <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full xl:w-1/2">
              <div>
                <label className="mb-0.5 block text-black dark:text-white">
                  ارزیابی کننده
                </label>

                <div className="relative z-10 bg-white dark:bg-form-input">
                  <select
                    value={supervisor || ''}
                    onChange={(e) => {
                      setSupervisor(e.target.value);
                      setIsOptionSelected(true);
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
                      ارزیابی کننده
                    </option>
                    {dataSupervisor.map((item: any, index: number) => (
                      <option
                        value={item.id}
                        className="text-body dark:text-bodydark"
                      >
                        {item.full_name}
                      </option>
                    ))}
                  </select>

                  <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.8">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                          fill="#637381"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <label className="mb-0.5 block text-black dark:text-white">
            ارزیابی
          </label>

          <CustomMultiSelect
            dataEmployee={dataEmployee}
            selected={selected}
            setSelected={setSelected}
          />

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

          {dataShow.length !== 0 && (
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
                                        <img/>
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
      </div>
    </>
  );
};

export default AssignmentSupervisorAdd;
