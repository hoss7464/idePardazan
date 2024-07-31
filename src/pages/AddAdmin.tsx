import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useApi from '../hooks/registerAdmin';
import CustomInput from '../components/CustomInput/CustomInput';

import ErrorIcon from '/src/components/Icon/error.svg'
import Error from '../components/Error/Error';

const AddAdmin: React.FC = () => {
  const { error, create, statusAdd } = useApi();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorType, setShowErrorType] = useState(false);

  const handleAddAdmin = async () => {
    if (phoneNumber !== "" && fullName !== "" && email !== "" && password !== "") {
      await create(phoneNumber, fullName, email, password);

    } else {
      setShowErrorType(true);
      setTimeout(() => {
        setShowErrorType(false);
      }, 4000);
    }
  };

  return (
    <>

      {showErrorType && (
        <Error myError={"لطفا تمام فیلد ها را پر کنید!"} />
      )}


      {error && (
        <Error myError={error} />
      )}
      
      {statusAdd && (
        <div
          className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-green-400 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <div>
            <img src={ErrorIcon} />
            <span className="font-medium ml-10">
              ادمین با موفقیت اضافه شد!{' '}
            </span>
          </div>
          {error}
        </div>
      )}
      <Breadcrumb />

      <div className="w-full max-w-full rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark text-sm">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              فرم افزودن ادمین
            </h3>
          </div>
          <div className="p-6.5">

            <div className="mb-4 flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/2 mx-2">
                <CustomInput
                  label="نام کامل"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="نام کامل را وارد کنید"
                />
              </div>

              <div className="w-full xl:w-1/2 mx-2">
                <CustomInput
                  label="شماره همراه"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="شماره همراه را وارد کنید"
                />
              </div>
            </div>

            <div className="mb-6 flex flex-col xl:flex-row">
              <div className="w-full xl:w-1/2 mx-2">
                <CustomInput
                  label="ایمیل"
                  value={email}
                  onChange={setEmail}
                  placeholder="ایمیل را وارد کنید"
                />
              </div>
              <div className="w-full xl:w-1/2 mx-2">
                <CustomInput
                  label="رمز عبور"
                  value={password}
                  onChange={setPassword}
                  placeholder="رمز عبور را وارد کنید"
                />

              </div>
            </div>



            <button
              type="button"
              onClick={handleAddAdmin}
              className="flex  w-full xl:w-1/3  justify-center mx-2 rounded bg-primary px-5  py-3 font-medium text-gray hover:bg-opacity-90 btnCustmColor"
            >
              افزودن ادمین
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
