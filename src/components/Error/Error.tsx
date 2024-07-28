import React from 'react';

interface MyComponentProps {
  myError: React.ReactElement | string | null;
}


const Error: React.FC<MyComponentProps> = ({ myError }) => {
  return (
    <>
      <div
        className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <div className='inline-flex	'>
          <img src="/src/components/Icon/error.svg" />
          <span className="font-medium ml-10">خطا! </span>
        </div>
        {myError}
      </div>
    </>
  );
};

export default Error;