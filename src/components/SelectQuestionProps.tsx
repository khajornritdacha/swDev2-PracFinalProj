// SelectQuestion.tsx
import React from 'react';
import Image from 'next/image';

interface SelectQuestionProps {
  label: string;
  id: string;
  options: string[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  svgPath: string;  // Path to SVG file
  placeholder?: string;
}

const SelectQuestion: React.FC<SelectQuestionProps> = ({ label, id, options, selectedValue, onChange, svgPath, placeholder }) => {
  return (
    <div className="w-full flex gap-2 px-3">
      <label className="flex items-center gap-2 text-gray-700 text-xs font-bold" htmlFor={id}>
        {/* Icon and label inline */}
        <div className="h-5 w-5 relative">
          <Image
            src={svgPath}
            alt="Icon"
            fill={true}
            className="object-contain"
          />
        </div>
        {/* <span>{label}</span> */}
      </label>
      <div className="relative">
        <select
          className="block appearance-none w-full bg-gray-200  text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={id}
          value={selectedValue}
          onChange={onChange}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SelectQuestion;
