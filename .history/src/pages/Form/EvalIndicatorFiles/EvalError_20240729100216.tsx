import React from 'react';
import ErrorIcon from "../../../components/Icon/error.svg"
interface MyComponentProps {
    myError: React.ReactElement | string | null;
}


const EvalError: React.FC<MyComponentProps> = ({myError}) => {
  return (
    <>
       <div
          className="flex fixed justify-between items-center p-4 mb-4 text-sm text-white rounded-lg bg-red-400 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <div>
            <img src={}/>
            <span className="font-medium ml-10">خطا! </span>
          </div>
          {myError}
        </div>
    </>
  );
};

export default EvalError;