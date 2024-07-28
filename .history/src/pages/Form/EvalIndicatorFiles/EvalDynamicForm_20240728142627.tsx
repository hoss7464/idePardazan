import React from 'react';
import {
  NumberIncrementWrapper,
  NumberIncrement,
  NumberDecrementWrapper,
  NumberDecrement,
} from './EvalIndicatorStyles';

interface Field {
  label: string;
  number: string;
}

interface EvalDynamicFormProps {
  fields: Field[];
  onTextChange: (index: number, value: string) => void;
  onNumberChange: (index: number, value: string) => void;
  onAddField: () => void;
  onDeleteField: (index: number) => void;
}

const EvalDynamicForm: React.FC<EvalDynamicFormProps> = ({
  fields,
  onTextChange,
  onNumberChange,
  onAddField,
  onDeleteField,
}) => {
  return (
    <div className="px-6 py-3 flex text-right">
      <div className="flex items-center mb-1">
        <div className="flex flex-col w-full">
          {fields.map((field, index) => (
            <div className="flex mb-6" key={index}>
              {index === 0 && (
                <NumberIncrementWrapper
                  onClick={onAddField}
                  className="self-start"
                >
                  <NumberIncrement />
                </NumberIncrementWrapper>
              )}
              {index > 0 && (
                <NumberDecrementWrapper onClick={() => onDeleteField(index)}>
                  <NumberDecrement />
                </NumberDecrementWrapper>
              )}

              <input
                type="text"
                placeholder="گویه"
                value={field.text}
                onChange={(e) => onTextChange(index, e.target.value)}
                disabled={index === 0}
                className="w-1/2 mr-6 rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <input
                type="number"
                placeholder="امتیاز"
                value={field.number}
                disabled={index === 0}
                onChange={(e) => onNumberChange(index, e.target.value)}
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
