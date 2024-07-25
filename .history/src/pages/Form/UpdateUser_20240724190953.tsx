import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import OrganizationLevelList from '../../hooks/OrganizationLevel/OrganizationLevelList';
import AdminUserUpdate from '../../hooks/AdminUser/AdminUserUpdate';
import AdminUserShowInfo from '../../hooks/AdminUser/AdminUserShowInfo';
import useGetData from '../../hooks/Corporation/CorporationList';
import OrganizationUnitList from '../../hooks/OrganizationUnit/OrganizationUnitList';

import { DatePicker } from '@react-shamsi/datepicker';
import '@react-shamsi/calendar/dist/styles.css';
import '@react-shamsi/datepicker/dist/styles.css';
import '@react-shamsi/timepicker/dist/styles.css';

const UpdateUser: React.FC = () => {
  const { UpdateAdminUser, errorAdd, doneUpdate } = AdminUserUpdate();
  const { error, data, getCorporationListData } = useGetData();
  const { errorShow, userData, getData } = AdminUserShowInfo();

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

  const location = useLocation();

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

  const validatePassword = () => {
    if (password.length < 8) {
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

  useEffect(() => {
    const fetchData = async () => {
      await getCorporationListData();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getData(location.state);
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFull_name(userData.full_name);
    setPhone_number(userData.phone_number);
    setEmail(userData.email);
    setPersonnel_code(userData.personnel_code);
    setGender(userData.gender);
    setMarital_status(userData.marital_status);
    setEducation(userData.education);
    setEducation_relationship(userData.education_relationship);
    setUniversity_level(userData.university_level);
    setCorporation_name(userData.corporation_name);
    setOrganization_unit_title(userData.organization_unit_title);
    setOrganization_level_title(userData.organization_level_title);
    setJob_title(userData.job_title);
    setIs_supervisor(userData.is_supervisor);
    setIsChecked(userData.is_supervisor);
  }, [userData]);

  const handleUpdate = async (
    id: string,
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
        validateFullName() &&
        validatePassword() &&
        validatePersonnelCode() &&
        validatePhoneNumber()
      ) {
        await UpdateAdminUser(
          id,
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
      await getOrganizationUnitList();
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getOrganizationLevelList();
    };
    fetchData();
  }, []);

  return (
    <>
      {showErrorType && (
        <div
          className="flex fixed z-50 justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-orange-500	 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
          <img src='/src/components/Icon/error.svg' />
            <span className="font-medium ml-10">خطا! </span>
          </div>
          لطفا فیلد ها را به درستی وارد کنید!
        </div>
      )}
      {showError && (
        <div
          className="flex fixed z-50 justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-yellow-300	 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
          <img src='/src/components/Icon/error.svg' />
            <span className="font-medium ml-10">خطا! </span>
          </div>
          لطفا تمام فیلد ها را پر کنید!
        </div>
      )}
      {errorAdd && (
        <div
          className="flex fixed z-50 justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-300	 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
          <img src='/src/components/Icon/error.svg' />
            <span className="font-medium ml-10">خطا! </span>
          </div>
          {errorAdd}
        </div>
      )}
      {doneUpdate && (
        <div
          className="flex fixed z-50 justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-green-400	 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
            <img src='/src/components/Icon/error.svg' />
          </div>
          {doneUpdate}
        </div>
      )}

      <Breadcrumb pageName="ویرایش کاربر" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm">
        <div>
          <div className="p-6.5">
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  نام و نام خانوادگی
                </label>
                <input
                  type="text"
                  value={full_name}
                  onChange={(e) => setFull_name(e.target.value)}
                  placeholder="نام و نام خانوادگی را وارد کنید"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  کد پرسنلی
                </label>
                <input
                  onChange={(e) => setPersonnel_code(e.target.value)}
                  type="text"
                  value={personnel_code}
                  placeholder="کد پرسنلی را وارد کنید"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    جنسیت
                  </label>

                  <div className="relative z-10 bg-white dark:bg-form-input">
                    <select
                      value={gender}
                      onChange={(e) => {
                        setGender(Number(e.target.value));
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
                        جنسیت
                      </option>
                      <option
                        value={2}
                        className="text-body dark:text-bodydark"
                      >
                        زن
                      </option>
                      <option
                        value={1}
                        className="text-body dark:text-bodydark"
                      >
                        مرد
                      </option>
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <img src='/src/components/Icon/dropdown.svg'/>

                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    وضعیت تاهل
                  </label>

                  <div className="relative z-10 bg-white dark:bg-form-input">
                    <select
                      value={marital_status}
                      onChange={(e) => {
                        setMarital_status(Number(e.target.value));
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
                        وضعیت تاهل
                      </option>
                      <option
                        value="2"
                        className="text-body dark:text-bodydark"
                      >
                        مجرد
                      </option>
                      <option
                        value="1"
                        className="text-body dark:text-bodydark"
                      >
                        متاهل
                      </option>
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <img src='/src/components/Icon/dropdown.svg'/>

                    </span>
                  </div>
                </div>
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
                <label className="mb-0.5 block text-black dark:text-white">
                  شماره تماس
                </label>
                <input
                  value={phone_number}
                  onChange={(e) => setPhone_number(e.target.value)}
                  type="text"
                  placeholder="شماره تماس را وارد کنید"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  ایمیل
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  placeholder="ایمیل را وارد کنید"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    وضعیت تحصیلات
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={education}
                      onChange={(e) => {
                        setEducation(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        وضعیت تحصیلات
                      </option>
                      <option
                        value="1"
                        className="text-body dark:text-bodydark"
                      >
                        زیر دیپلم
                      </option>
                      <option
                        value="2"
                        className="text-body dark:text-bodydark"
                      >
                        دیپلم
                      </option>
                      <option
                        value="3"
                        className="text-body dark:text-bodydark"
                      >
                        فوق دیپلم
                      </option>
                      <option
                        value="4"
                        className="text-body dark:text-bodydark"
                      >
                        لیسانس
                      </option>
                      <option
                        value="5"
                        className="text-body dark:text-bodydark"
                      >
                        فوق لیسانس
                      </option>
                      <option
                        value="6"
                        className="text-body dark:text-bodydark"
                      >
                        دکترا
                      </option>
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <img src='/src/components/Icon/dropdown.svg'/>

                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    وضعیت شغل و تحصیلات
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={education_relationship}
                      onChange={(e) => {
                        setEducation_relationship(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        وضعیت شغل و تحصیلات
                      </option>
                      <option
                        value="1"
                        className="text-body dark:text-bodydark"
                      >
                        مرتبط
                      </option>
                      <option
                        value="2"
                        className="text-body dark:text-bodydark"
                      >
                        نیمه مرتبط
                      </option>
                      <option
                        value="3"
                        className="text-body dark:text-bodydark"
                      >
                        نا مرتبط
                      </option>
                    </select>

                    <span className="absolute top-1/2 left-4 z-10 -translate-y-1/2">
                    <img src='/src/components/Icon/dropdown.svg'/>

                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    سطح دانشگاه
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={university_level}
                      onChange={(e) => {
                        setUniversity_level(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        سطح دانشگاه
                      </option>
                      <option
                        value="1"
                        className="text-body dark:text-bodydark"
                      >
                        سطح 1
                      </option>
                      <option
                        value="2"
                        className="text-body dark:text-bodydark"
                      >
                        سطح 2
                      </option>
                      <option
                        value="3"
                        className="text-body dark:text-bodydark"
                      >
                        سطح 3
                      </option>
                      <option
                        value="4"
                        className="text-body dark:text-bodydark"
                      >
                        سطح 4
                      </option>
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
                    شرکت
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={corporation_name}
                      onChange={(e) => {
                        setCorporation_name(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
                        }`}
                    >
                      <option
                        value=""
                        disabled
                        className="text-body dark:text-bodydark"
                      >
                        شرکت
                      </option>
                      {data.map((item: any, index: number) => (
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
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <div>
                  <label className="mb-0.5 block text-black dark:text-white">
                    واحد سازمانی
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={organization_unit_title}
                      onChange={(e) => {
                        setOrganization_unit_title(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
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
                    سطح سازمانی
                  </label>

                  <div className="relative z-20 bg-white dark:bg-form-input">
                    <select
                      value={organization_level_title}
                      onChange={(e) => {
                        setOrganization_level_title(Number(e.target.value));
                        changeTextColor();
                      }}
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${isOptionSelected ? 'text-black dark:text-white' : ''
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
                  <img src='/src/components/Icon/dropdown.svg'/>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  عنوان شغلی
                </label>
                <input
                  value={job_title}
                  onChange={(e) => setJob_title(e.target.value)}
                  type="text"
                  placeholder="عنوان شغلی را وارد کنید "
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="w-full xl:w-1/2">
                <label className="mb-0.5 block text-black dark:text-white">
                  رمز عبور
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                  placeholder="رمز عبور را وارد کنید "
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
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
                      value={is_supervisor}
                      className="sr-only"
                      onChange={() => {
                        setIsChecked(!isChecked);
                        setIs_supervisor(isChecked);
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
                handleUpdate(
                  location.state,
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
              ثبت تغییرات
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
