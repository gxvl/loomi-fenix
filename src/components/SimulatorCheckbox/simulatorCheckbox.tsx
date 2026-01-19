import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const SimulatorCheckbox = ({
  label,
  className = "",
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={`group flex cursor-pointer items-center gap-3 select-none ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="peer checked:bg-dark-blue h-5 w-5 cursor-pointer appearance-none rounded-sm border-2 border-[#C1C1C1] bg-transparent transition-all duration-200"
          {...props}
        />

        <svg
          className="pointer-events-none absolute h-3.5 w-3.5 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>

      <span className="text-light-white font-inter text-sm transition-colors group-hover:text-white">
        {label}
      </span>
    </label>
  );
};
