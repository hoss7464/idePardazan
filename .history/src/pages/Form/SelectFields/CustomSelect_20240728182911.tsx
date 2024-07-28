import React, { useState } from 'react';
import Select, { MultiValue, SingleValue, StylesConfig } from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

interface CustomSelectProps {
  options: OptionType[];
  placeholder?: string;
  onChange: (selected: MultiValue<OptionType> | SingleValue<OptionType>) => void; // اضافه کردن onChange
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, placeholder, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const handleChange = (selected: MultiValue<OptionType> | SingleValue<OptionType>) => {
    setSelectedOptions(selected as OptionType[]);
    onChange(selected); // فراخوانی تابع onChange
  };

  const customStyles: StylesConfig<OptionType, true> = {
    multiValue: (base) => ({
      ...base,
      background: '#1C2434',
      zIndex: 0,
      marginRight: "0.2rem",
      marginTop: "0.3rem",
      marginBottom: "0.3rem",
      padding: "3px",
      borderRadius: "4px"
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#F1F5F9',
      zIndex: 0
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#F1F5F9',
      ':hover': {
        backgroundColor: '#F1F5F9',
        color: '#d9534f',
        zIndex: 0
      },
    }),
  };

  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
    />
  );
};

export default CustomSelect;
