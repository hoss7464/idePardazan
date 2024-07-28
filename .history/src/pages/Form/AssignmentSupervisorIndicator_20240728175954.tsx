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
import EvalIndicatorGuyehList from '../../hooks/EvalIndicatorGuyeh/EvalIndicatorGuyehList';
import CustomInput from '../../components/CustomInput/CustomInput';

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

  const [selectedPeriod, setSelectedPeriod] = useState<any>();
  const [selectedSupervisor, setSelectedSupervisor] = useState<any>();
  const [selectedIndicator, setselectedIndicator] = useState<any>();

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

  //----------------------------------------------------------------------------------------------------

  const handleChange =
    (selectName: 'select1' | 'select2' | 'select3' | 'select4') => (option: OptionType | null) => {
      setSelectedOptions((prevState) => ({
        ...prevState,
        [selectName]: option,
      }));

    };



  const handleAdd = async () => {
    await AssignmentStore(period, supervisor, employementList);
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

    const fetchData = async () => {

      if (selectedPeriod) {
        await getAdminSAListbasedPeriod(selectedPeriod.value)
      }
    };

    fetchData();
  }, [selectedPeriod]);


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




  //-------------------------------------------------------------------------------


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

                  placeholder="انتخاب کنید" />
              </div>
            </div>
          </div>

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

          <div className="relative  px-6 py-3  flex-auto text-right">
            <CustomInput
              label="وزن شاخص"
              value={newIndicatorTitle}
              onChange={setnewIndicatorTitle}
              placeholder="نام شاخص را وارد کنید"
            />
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
            onClick={() => { }}
            className="flex mt-4.5 mb-4.5 w-full justify-center rounded  p-3 font-medium text-gray hover:bg-opacity-90 bg-teal-400	"
          >
            نمایش
          </button>



          {dataShow?.length == 0 && (
            <div>موردی برای نمایش جدول وجود ندارد!</div>
          )}
        </div>
      </div >
    </>
  );
};

export default AssignmentSupervisorIndicator;
