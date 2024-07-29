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
    onChange(selected); 
  };

  const customStyles: StylesConfig<OptionType, true> = {
    multiValue: (base) => ({
      ...base,
      background: '#1C2434',
      marginRight: "0.2rem",
      marginTop: "0.3rem",
      marginBottom: "0.3rem",
      padding: "3px",
      borderRadius: "4px"
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: '#F1F5F9',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: '#F1F5F9',
      ':hover': {
        backgroundColor: '#F1F5F9',
        color: '#d9534f',
      },
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 260, 
      direction
    }),
  };

  const noOptionsMessage = () => (
    <div style={{ padding: '4px', textAlign: 'right' }}>
      آپشنی وجود ندارد
    </div>
  );

  return (
    <Select
      isMulti
      value={selectedOptions}
      onChange={handleChange}
      options={options}
      placeholder={placeholder}
      styles={customStyles}
      menuPortalTarget={document.body} 
      noOptionsMessage={noOptionsMessage}
    />
  );
};

export default CustomSelect;
