import React, { useState } from 'react';
import {
  NumberIncrementWrapper,
  NumberIncrement,
  NumberDecrementWrapper,
  NumberDecrement,
  FieldWrapper1,
} from './EvalIndicatorStyles';

interface Field {
  text: string;
  number: string;
}

const MAX_FIELDS = 4; // Set a maximum number of fields

const EvalDynamicForm: React.FC = () => {
  // State
  const [fields, setFields] = useState<Field[]>([{ text: '', number: '' }]);

  // Functions
  const handleTextChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].text = value;
    setFields(newFields);
  };

  const handleNumberChange = (index: number, value: string) => {
    const newFields = [...fields];
    newFields[index].number = value;
    setFields(newFields);
  };

  const addField = () => {
    if (fields.length < MAX_FIELDS) {
      setFields([...fields, { text: '', number: '' }]);
    } else {
      alert('Maximum number of fields reached');
    }
  };

  const deleteField = (index: number) => {
    const newFields = fields.filter((_, i) => i !== index);
    setFields(newFields);
  };

  return (
    <div className="relative px-6 py-3 flex text-right items-start justify-start">
      <div className="flex items-center mb-1 bg-slate-400">
        <NumberIncrementWrapper onClick={addField} className="self-start">
          <NumberIncrement />
        </NumberIncrementWrapper>

        <div className="flex flex-col w-full">
          {fields.map((field, index) => (
            <div className="flex mb-6" key={index}>
              {index > 0 && (
                <NumberDecrementWrapper onClick={() => deleteField(index)}>
                  <NumberDecrement />
                </NumberDecrementWrapper>
              )}

              <input
                type="text"
                placeholder="گویه"
                value={field.text}
                onChange={(e) => handleTextChange(index, e.target.value)}
                className="w-1/2 mr-6 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-white outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                placeholder="امتیاز"
                value={field.number}
                onChange={(e) => handleNumberChange(index, e.target.value)}
                className="w-1/3 mr-6 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EvalDynamicForm;
