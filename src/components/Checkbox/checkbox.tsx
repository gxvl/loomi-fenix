import React from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
export const Checkbox = ({
  label,
  className = "",
  ...props
}: CheckboxProps) => {
  return (
    <label
      className={`flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          className="
            peer appearance-none w-5 h-5 border-2 border-[#C1C1C1] rounded-sm bg-transparent
            checked:bg-dark-blue
            
            transition-all duration-200 cursor-pointer
          "
          {...props}
        />

        <svg
          className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
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

      <span className="text-light-white font-medium text-base group-hover:text-white transition-colors">
        {label}
      </span>
    </label>
  );
};
