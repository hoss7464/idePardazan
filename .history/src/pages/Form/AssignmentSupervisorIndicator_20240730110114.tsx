import React from 'react';
import { useEffect, useState } from 'react';
import "./SelectFields/SelectedFields.css"

//---------------------------------------------------------------------------------------------------
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import AssignmentSupervieorGetData from '../../hooks/AssignmentSupervisor/AssignmentSupervisorGetData';
import AssignmentSupervisorStore from '../../hooks/AssignmentSupervisor/AssignmentSupervisorStore';
import AssignmentSupervieorList from '../../hooks/AssignmentSupervisor/AssignmentSupervisorList';
import AssignmentSupervieorDelete from '../../hooks/AssignmentSupervisorIndicatorStore/AssignmentSupervisorDelete';
import SearchableSelect from './SelectFields/SearchableSelect';
import CustomSelect from './SelectFields/CustomSelect';
import Error from '../../components/Error/Error';
import EvalIndicatorList from '../../hooks/EvalIndicator/EvalIndicatorList';
import EvalIndicatorGuyehList from '../../hooks/EvalIndicatorGuyeh/EvalIndicatorGuyehList';
import CustomInput from '../../components/CustomInput/CustomInput';
import AssignmentSupervisorIndicatorStore from '../../hooks/AssignmentSupervisorIndicatorStore/AssignmentSupervisorIndicatorStore';
import PrintIcon from '/src/components/Icon/print.svg'
import closeIcon from '/src/components/Icon/close.svg'
import deleteIcon from '/src/components/Icon/delete.svg'
import addIcon from '/src/components/Icon/add.svg'
import updateIcon from '/src/components/Icon/update.svg'

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

  const { errorGuyeh, dataIndicatorGuyeh, getEvalIndicatorGuyehListData } = EvalIndicatorGuyehList();


  const { error, dataIndicator, getEvalIndicatorListData } =
    EvalIndicatorList();

  const { AssignmentIndicatorStore, errorAddIndicator, doneAssignmentIndicatorStore } =
    AssignmentSupervisorIndicatorStore();



  const [selectedPeriod, setSelectedPeriod] = useState<any>();
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>();
  const [selectedIndicator, setselectedIndicator] = useState<any>();
  const [selectedIndicatorGuyeh, setselectedIndicatorGuyeh] = useState<any>();

  const [weight, setWeight] = useState<number | null>();

  const [period, setPeriod] = useState<number | null>();
  const [supervisor, setSupervisor] = useState<number | null>();
  const [employementList, setEmployementList] = useState<number[]>([]);
  const [selected, setSelected] = useState([]);
  const [dataShow, setDataShow] = useState<object[] | null>([]);

  const [selectedOptions, setSelectedOptions] = useState<{
    select1: OptionType | null;
    select2: OptionType | null;
    select3: OptionType | null;
    select4: OptionType | null;

  }>({
    select1: null,
    select2: null,
    select3: null,
    select4: null
  });
  const [showErrorTimer, setShowErrorTimer] = useState(false);


  //----------------------------------------------------------------------------------------------------

  const handleChange =
    (selectName: 'select1' | 'select2' | 'select3' | 'select4') => (option: OptionType | null) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [selectName]: option,
      }));

    };



  const handleAdd = async () => {
    await AssignmentIndicatorStore(selectedPeriod.value, selectedSupervisor.value, employementList, selectedIndicatorGuyeh.value, Number(weight));
  };


  const handleShowList = async () => {
    if (selectedPeriod && employementList.length == 0 && !selectedSupervisor) {
      await getAdminSAListbasedPeriod(selectedPeriod);
    } else if (selectedPeriod && selectedSupervisor && employementList.length == 0) {
      await getAdminSAListbasedPeriodSupervisor(selectedSupervisor, selectedPeriod);
    }
  };

  const handleDeleteItem = async (id: number, selectedSupervisor: any, selectedPeriod: any) => {

    await getAdminSADeletebasedPeriodSupervisorEmployee(selectedSupervisor.value, selectedPeriod.value, id);

  };

  const handleDeleteBasedSelected = async () => {
    if (selectedPeriod && employementList.length == 0 && !selectedSupervisor) {
      await getAdminSADeletebasedPeriod(selectedPeriod.value);
    } else if (selectedPeriod && selectedSupervisor && employementList.length == 0) {
      await getAdminSADeletebasedPeriodSupervisor(selectedSupervisor.value, selectedPeriod.value);
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
      await getEvalIndicatorListData()
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newEmployementList = selected.map((item) => parseInt(item.value));
    setEmployementList(newEmployementList);
  }, [selected]);

  useEffect(() => {
    console.log(employementList)
  }, [employementList]);

  useEffect(() => {

    const fetchData = async () => {

      if (selectedPeriod) {
        await getAdminSAListbasedPeriod(selectedPeriod.value)
      }
    };

    fetchData();
  }, [selectedPeriod]);

  useEffect(() => {

    const fetchData = async () => {

      if (selectedIndicator) {
        await getEvalIndicatorGuyehListData(selectedIndicator.value)
      }
    };

    fetchData();
  }, [selectedIndicator]);




  useEffect(() => {

    const fetchData = async () => {
      if (selectedPeriod && selectedSupervisor) {
        await getAdminSAListbasedPeriodSupervisor(selectedSupervisor.value, selectedPeriod.value)
      }
    };

    fetchData();
  }, [selectedSupervisor]);

  useEffect(() => {

    const fetchData = async () => {
      if (selectedIndicator) {
        await getEvalIndicatorGuyehListData(selectedIndicator.id)
      }
    };

    fetchData();
  }, [selectedIndicator]);


  useEffect(() => {
    if (errorPeriod || errorAdd || errorDelete || errorSupervisor || errorEmployee) {
      setShowErrorTimer(true);
      const timer = setTimeout(() => {
        setShowErrorTimer(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [errorPeriod, errorAdd, errorDelete, errorSupervisor, errorEmployee]);




  //-------------------------------------------------------------------------------


  return (
    <>
      {showErrorTimer && (errorSupervisor || errorPeriod || errorEmployee) &&
        <Error myError={"در درلیافت لیست!"} />
      }

      {showErrorTimer && (errorAdd || errorDelete) && (
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
                    value: item.id,
                  }))}
                  value={selectedOptions.select1}
                  onChange={(option) => {
                    handleChange('select1')(option);
                    setSelectedPeriod(option);
                  }}
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
                  options={dataBasedPeriod.map((item: any) => ({
                    label: item.full_name,
                    value: item.id
                  }))}
                  value={selectedOptions.select2}
                  onChange={(option) => {
                    handleChange('select2')(option);
                    setSelectedSupervisor(option);
                  }}
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
                  options={dataBasedSupervisor.map((item: any) => ({
                    label: item.full_name,
                    value: item.id
                  }))}
                  onChange={(selectedOptions) => {
                    const selectedIds = selectedOptions?.map(option => option.value);
                    setEmployementList(selectedIds);
                  }}
                  placeholder="انتخاب کنید" />
              </div>
            </div>
          </div>
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">

            <div className="w-full xl:w-1/2">
              <div>
                <label className="mt-5 mb-0.5 block text-black dark:text-white">
                  شاخص ها
                </label>


                <SearchableSelect
                  options={dataIndicator.map((item: any) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  value={selectedOptions.select3}
                  onChange={(option) => {
                    handleChange('select3')(option);
                    setselectedIndicator(option);
                  }}
                  myPlaceHolder="یک گزینه انتخاب کنید"
                  myClass="selected-field2"
                />

              </div>
            </div>

            <div className="w-full xl:w-1/2">
              <div>
                <label className="xl:mt-5 mb-0.5 block text-black dark:text-white">
                  گویه ها
                </label>


                <SearchableSelect
                  options={dataIndicatorGuyeh?.map((item: any) => ({
                    label: item.title,
                    value: item.id
                  }))}
                  value={selectedOptions.select4}
                  onChange={(option) => {
                    handleChange('select4')(option);
                    setselectedIndicatorGuyeh(option);
                  }}
                  myPlaceHolder="یک گزینه انتخاب کنید"
                  myClass="selected-field2"
                />

              </div>
            </div>


          </div>

          <div className="w-full xl:w-1/2 mt-2">
            <CustomInput
              label="وزن شاخص"
              value={weight}
              onChange={setWeight}
              placeholder="وزن شاخص را وارد کنید"
            />
          </div>



          <button
            type="button"
            onClick={() => handleAdd()}
            className="flex mt-4.5 w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 btnCustmColor"
          >
            افزودن انتساب
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
                                  {selectedSupervisor && <th
                                    scope="col"
                                    className="px-6 py-3 text-center text-l font-medium text-gray-500 uppercase dark:text-neutral-500 w-1/6"
                                  >
                                    عملیات
                                  </th>}
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
                                    {selectedSupervisor && <td className="flex flex-row	items-center justify-center px-6 py-4 whitespace-nowrap text-end text-sm font-medium border-zinc-200">
                                      <button
                                        className="inline-flex align-center items-center justify-center rounded-md bg-green-100 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                        type="button"
                                        onClick={() => {
                                          handleDeleteItem(item.id, selectedSupervisor, selectedPeriod);
                                        }}
                                      >
                                        <img src={addIcon} />
                                      </button>

                                      <button
                                        className="inline-flex items-center justify-center rounded-md bg-red-400 py-2 px-2 text-center font-medium text-white hover:bg-opacity-90 ml-2"
                                        type="button"
                                        onClick={() => {
                                          handleDeleteItem(item.id, selectedSupervisor, selectedPeriod);
                                        }}
                                      >
                                        حذف همه شاخص ها
                                      </button>


                                    </td>}
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
