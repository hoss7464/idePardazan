import React from 'react';
import Select from 'react-select';
import './SelectedFields.css';

interface OptionType {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  options: OptionType[];
  value: OptionType | null;
  onChange: (option: OptionType | null) => void;
  myPlaceHolder: string;
  myClass: string;
}

const noOptionsMessage = () => (
  <div style={{ padding: '4px', textAlign: 'right' }}>
    آپشنی وجود ندارد
  </div>
);

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  options,
  value,
  onChange,
  myPlaceHolder,
  myClass,
}) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      isSearchable
      placeholder={myPlaceHolder}
      className={myClass}
      noOptionsMessage={noOptionsMessage}
      menuPortalTarget={document.body} // قرار دادن منو در body
      styles={{
        menuPortal: (base) => ({
          ...base,
          zIndex: 9999, // تنظیم z-index برای منوی انتخاب
          direction:'rtl',

        }),
      }}
    />
  );
};

export default SearchableSelect;
