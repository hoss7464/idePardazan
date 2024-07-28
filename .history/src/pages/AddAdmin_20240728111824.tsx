import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import useLogin from '../hooks/adminLogin';
import useApi from '../hooks/registerAdmin';
import CustomInput from '../components/CustomInput/CustomInput';

const AddAdmin: React.FC = () => {
  const { error, create, statusAdd } = useApi();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAdmin = async () => {
    await create(phoneNumber, fullName, email, password);
  };

  return (
    <>
      {error && (
        <div
          className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
            <img src='/src/components/Icon/error.svg' />
            <span className="font-medium ml-10">خطا! </span>
          </div>
          {error}
        </div>
      )}
      {statusAdd && (
        <div
          className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-green-400 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <div>
            <img src='/src/components/Icon/error.svg' />
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
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5">
                <CustomInput
                  label="نام کامل"
                  value={fullName}
                  onChange={setFullName}
                  placeholder="نام کامل را وارد کنید"
                />
              </div>

              <div className="mb-4.5">
                <CustomInput
                  label="شماره همراه"
                  value={phoneNumber}
                  onChange={setPhoneNumber}
                  placeholder="شماره همراه را وارد کنید"
                />
              </div>
              <div className="mb-4.5">
                <CustomInput
                  label="ایمیل"
                  value={email}
                  onChange={setEmail}
                  placeholder="ایمیل را وارد کنید"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-0.5 block text-black dark:text-white">
                  رمز عبور
                </label>
                <input
                  type="password"
                  placeholder="رمز عبور را وارد کنید"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
                <CustomInput
                  label="ایمیل"
                  value={email}
                  onChange={setEmail}
                  placeholder="ایمیل را وارد کنید"
                />

              </div>

              <button
                type="button"
                onClick={handleAddAdmin}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 btnCustmColor"
              >
                افزودن ادمین
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddAdmin;
