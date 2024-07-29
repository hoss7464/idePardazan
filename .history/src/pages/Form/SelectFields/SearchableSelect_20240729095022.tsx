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
  <div style={{ padding: '10px', textAlign: 'right' }}>
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

    />
  );
};

export default SearchableSelect;
