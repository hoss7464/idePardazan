import React from 'react';

interface MyComponentProps {
    myType : string;
    myPlaceHolder : string;
    myVal : string ;
    myOnChnage : (event: React.ChangeEvent<HTMLInputElement>) => void ;
}


const SearchInput: React.FC<MyComponentProps> = ({myVal, myType, myPlaceHolder, myOnChnage}) => {
  return (
    <>
     <input
        type={myType}
        placeholder={myPlaceHolder}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-white py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary mb-4"
        value={myVal}
        onChange={myOnChnage}
      />
    </>
  );
};

export default SearchInput;
