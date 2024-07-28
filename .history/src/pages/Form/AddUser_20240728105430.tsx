import React from 'react';
import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import OrganizationLevelList from '../../hooks/OrganizationLevel/OrganizationLevelList';
import AdminUserAdd from '../../hooks/AdminUser/AdminUserAdd';
import useGetData from '../../hooks/Corporation/CorporationList';
import OrganizationUnitList from '../../hooks/OrganizationUnit/OrganizationUnitList';
import { DatePicker } from '@react-shamsi/datepicker';
import '@react-shamsi/datepicker/dist/styles.css';
import Error from '../../components/Error/Error';
import CustomSelect from '../../components/CustomSelect/CustomSelect';
import CustomInput from '../../components/CustomInput/CustomInput';

const AddUser: React.FC = () => {
  const { addAdminUser, errorAdd, doneAddAdminUser } = AdminUserAdd();
  const { error, data, getCorporationListData } = useGetData();
  const { errorOU, dataOU, getOrganizationUnitList } = OrganizationUnitList();
  const { errorOL, dataOL, getOrganizationLevelList } = OrganizationLevelList();
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  const [full_name, setFull_name] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [email, setEmail] = useState('');
  const [personnel_code, setPersonnel_code] = useState('');
  const [gender, setGender] = useState(1);
  const [marital_status, setMarital_status] = useState(1);
  const [education, setEducation] = useState(1);
  const [education_relationship, setEducation_relationship] = useState(1);
  const [university_level, setUniversity_level] = useState(1);
  const [corporation_name, setCorporation_name] = useState<number | null>();
  const [organization_unit_title, setOrganization_unit_title] = useState<
    number | null
  >();
  const [organization_level_title, setOrganization_level_title] = useState<
    number | null
  >();
  const [job_title, setJob_title] = useState('');
  const [is_supervisor, setIs_supervisor] = useState(false);
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [birth_date, setBirth_date] = useState('');
  const [birth_date_persian, setBirth_date_persian] = useState('');
  const [employeement_date, setEmployeement_date] = useState('');
  const [employeement_date_persian, setemployeement_date_persian] =
    useState('');
  const [showError, setShowError] = useState(false);
  const [showErrorType, setShowErrorType] = useState(false);

  const handleBirthDateChange = (selectedDate: any) => {
    const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
    setBirth_date(formattedDate);
    setBirth_date_persian(selectedDate.toLocaleDateString('fa-IR'));
  };

  const handleEnterDateChange = (selectedDate: any) => {
    const formattedDate = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1
      }-${selectedDate.getDate()}`;
    setEmployeement_date(formattedDate);
    setemployeement_date_persian(selectedDate.toLocaleDateString('fa-IR'));
  };

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  const validatePhoneNumber = () => {
    if (phone_number.length !== 11 || !phone_number.match(/^\d+$/)) {
      return false;
    }
    return true;
  };

  const validateFullName = () => {
    if (!full_name.match(/^[A-Za-z]+$/)) {
      return false;
    }
    return true;
  };

  const validatePersonnelCode = () => {
    if (!personnel_code.match(/^\d+$/)) {
      return false;
    }
    return true;
  };

  const validateEmail = () => {
    if (!email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (password.length < 8) {
      return false;
    }
    return true;
  };

  const handleAdd = async (
    phone_number: string,
    full_name: string,
    email: string,
    personnel_code: string,
    gender: number,
    marital_status: number,
    birth_date: Date,
    employeement_date: Date,
    education: number,
    education_relationship: number,
    university_level: number,
    corporation_name: number,
    organization_unit_title: number,
    organization_level_title: number,
    job_title: string,
    is_supervisor: boolean,
    password: string,
  ) => {
    if (
      phone_number &&
      full_name &&
      email &&
      personnel_code &&
      gender &&
      marital_status &&
      birth_date &&
      employeement_date &&
      education &&
      education_relationship &&
      university_level &&
      corporation_name &&
      organization_level_title &&
      organization_unit_title &&
      job_title &&
      is_supervisor &&
      password
    ) {
      if (
        validateEmail() &&
        validatePassword() &&
        validateFullName() &&
        validatePersonnelCode() &&
        validatePhoneNumber()
      ) {
        await addAdminUser(
          phone_number,
          full_name,
          email,
          personnel_code,
          gender,
          marital_status,
          birth_date,
          employeement_date,
          education,
          education_relationship,
          university_level,
          corporation_name,
          organization_unit_title,
          organization_level_title,
          job_title,
          is_supervisor,
          password,
        );
      } else {
        setShowErrorType(true);
        setTimeout(() => {
          setShowErrorType(false);
        }, 4000);
      }
    } else {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 4000);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getCorporationListData();
      await getOrganizationUnitList();
      await getOrganizationLevelList();
    };
    fetchData();
  }, []);

  return (
    <>

      {showErrorType && <Error myError={"لطفا فیلد ها را به درستی وارد کنید!"} />}
      {showError && <Error myError={"لطفا تمام فیلد ها را پر کنید!"} />}
      {errorAdd && <Error myError={"عملیات موفقیت آمیز نبود!"} />}

      {doneAddAdminUser && (
        <div
          className="flex fixed z-50 justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-green-400	 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
            <img src='/src/components/Icon/error.svg' />
          </div>
          {doneAddAdminUser}
        </div>
      )}

      <Breadcrumb />


      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm	">
        <div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <CustomInput
                  label="نام و نام خانوادگی"
                  value={full_name}
                  onChange={setFull_name}
                  placeholder="نام و نام خانوادگی را وارد کنید"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <CustomInput
                  label="کد پرسنلی"
                  value={personnel_code}
                  onChange={setPersonnel_code}
                  placeholder="کد پرسنلی را وارد کنید"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <CustomSelect
                  label="جنسیت"
                  options={[
                    { value: 1, label: 'مرد' },
                    { value: 2, label: 'زن' },
                  ]}
                  value={gender}
                  onChange={setGender}
                />

              </div>

              <div className="w-full xl:w-1/2">
                <CustomSelect
                  label="وضعیت تاهل"
                  options={[
                    { value: 2, label: 'مجرد' },
                    { value: 1, label: 'متاهل' },
                  ]}
                  value={marital_status}
                  onChange={setMarital_status}
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  تاریخ تولد
                </label>

                <div className="flex relative z-40 flex-row-reverse text-center justify-center items-center setting-widthDP">
                  <DatePicker
                    value={birth_date_persian}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleBirthDateChange}
                  />
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  تاریخ ورود
                </label>
                <div className="flex relative z-30 flex-row-reverse text-center justify-center items-center setting-widthDP">
                  <DatePicker
                    value={employeement_date_persian}
                    dateFormat="yyyy-MM-dd"
                    onChange={handleEnterDateChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <CustomInput
                  label="شماره تماس"
                  value={phone_number}
                  onChange={setPhone_number}
                  placeholder="شماره تماس را وارد کنید"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <CustomInput
                  label="ایمیل"
                  value={email}
                  onChange={setEmail}
                  placeholder="ایمیل را وارد کنید"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">

                <CustomSelect
                  label=" وضعیت تحصیلات"
                  options={[
                    { value: 1, label: 'زیر دیپلم' },
                    { value: 2, label: 'دیپلم' },
                    { value: 3, label: 'فوق دیپلم' },
                    { value: 4, label: 'لیسانس' },
                    { value: 5, label: 'فوق لیسانس' },
                    { value: 6, label: 'دکترا' },
                  ]}
                  value={education}
                  onChange={setEducation}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <CustomSelect
                  label=" وضعیت شغل و تحصیلات"
                  options={[
                    { value: 1, label: ' مرتبط' },
                    { value: 2, label: 'نیمه مرتبط' },
                    { value: 3, label: 'نا مرتبط ' },
                  ]}
                  value={education_relationship}
                  onChange={setEducation_relationship}
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <CustomSelect
                  label="سطح دانشگاه"
                  options={[
                    { value: 1, label: ' سطح 1' },
                    { value: 2, label: 'سطح 2' },
                    { value: 3, label: 'سطح 3' },
                    { value: 4, label: 'سطح 4' }
                  ]}
                  value={university_level}
                  onChange={setUniversity_level}
                />
              </div>

              <div className="w-full xl:w-1/2">
                <CustomSelect
                  label="شرکت"
                  options={data.map((item: any, index) => ({ value: item.id, label: item.name }))}
                  value={corporation_name}
                  onChange={(value) => {
                    setCorporation_name(value);
                  }}
                />

              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    واحد سازمانی
                  </label>

                  <div className="relative z-10 bg-white dark:bg-form-input">
                    <select
                      value={organization_unit_title}
                      onChange={(e) => {
                        setOrganization_unit_title(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        واحد سازمانی
                      </option>
                      {dataOU.map((item: any, index: number) => (
                        <option
                          value={item.id}
                          className="text-body dark:text-bodydark"
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                      <img src='/src/components/Icon/dropdown.svg' />

                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    سطح سازمانی
                  </label>

                  <div className="relative z-10 bg-white dark:bg-form-input">
                    <select
                      value={organization_level_title}
                      onChange={(e) => {
                        setOrganization_level_title(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-10 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        سطح سازمانی
                      </option>
                      {dataOL.map((item: any, index: number) => (
                        <option
                          value={item.id}
                          className="text-body dark:text-bodydark"
                        >
                          {item.title}
                        </option>
                      ))}
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                      <img src='/src/components/Icon/dropdown.svg' />

                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">

                <CustomInput
                  label="عنوان شغلی"
                  value={job_title}
                  onChange={setJob_title}
                  placeholder="عنوان شغلی را وارد کنید"
                />

              </div>

              <div className="w-full xl:w-1/2">
                <CustomInput
                  label=" رمز عبور"
                  value={password}
                  onChange={setPassword}
                  placeholder=" رمز عبور را وارد کنید"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  عکس پروفایل
                </label>
                <input
                  type="file"
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:ml-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
              <div
                className="w-full xl:w-1/2"
                style={{ alignItems: 'center', display: 'flex' }}
              >
                <label
                  htmlFor="checkboxLabelOne"
                  className="flex cursor-pointer select-none items-center"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="checkboxLabelOne"
                      className="sr-only"
                      onChange={() => {
                        setIsChecked(!isChecked);
                        setIs_supervisor(!isChecked);
                      }}
                    />
                    <div
                      className={`ml-4 flex h-5 w-5 items-center justify-center rounded border ${isChecked &&
                        'border-primary bg-gray dark:bg-transparent'
                        }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-sm ${isChecked && 'bg-primary'
                          }`}
                      ></span>
                    </div>
                  </div>
                  آیا ارزیابی کننده است؟
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                handleAdd(
                  phone_number,
                  full_name,
                  email,
                  personnel_code,
                  gender,
                  marital_status,
                  birth_date,
                  employeement_date,
                  education,
                  education_relationship,
                  university_level,
                  corporation_name,
                  organization_unit_title,
                  organization_level_title,
                  job_title,
                  is_supervisor,
                  password,
                )
              }
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 btnCustmColor"
            >
              افزودن کاربر
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
