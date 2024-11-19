// InputQuestion.tsx
import React from 'react';

interface InputQuestionProps {
  label: string;
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  validate?: (value: string) => boolean;
}

const InputQuestion: React.FC<InputQuestionProps> = ({ label, id, type, value, onChange, placeholder, validate }) => {
  const isValid = validate ? validate(value) : true; // validate if provided
  
  return (
    <div className="flex items-center mb-6">
      <div className="w-1/3 flex items-center">
        <div className="h-[20px] w-[2px] bg-[#EC0808] mr-2"></div>
        <label className="block text-gray-500 font-bold text-left mb-1 mb-0 pr-4" htmlFor={id}>
          {label}
        </label>
      </div>
      <div className="w-2/3">
        <input
          className={`bg-gray-200 appearance-none border-2 ${isValid ? 'border-gray-200' : 'border-red-500'} rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        {!isValid && <p className="text-red-500 text-xs">Invalid input</p>}
      </div>
    </div>
  );
};

export default InputQuestion;
