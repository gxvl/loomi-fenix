import { FieldValues } from "react-hook-form";

import { InputProps } from "./types";
import { cn } from "@/src/lib/utils";

const Input = <T extends FieldValues>({
  register,
  name,
  className,
  suffix,
  onSuffixClick,
  inputPrefix,
  ...props
}: InputProps<T>) => {
  return (
    <div
      className={cn(
        "ring-offset-primary-50 focus-within:ring-primary-50 relative flex h-13 w-full items-center gap-1 rounded-2xl border border-[#737677] px-3 text-sm  placeholder:font-inter font-inter text-light-white outline-none",
        className
      )}
    >
      <div className="absolute top-1/2 left-5 z-10 -translate-y-1/2">
        {inputPrefix}
      </div>
      <input
        className={`${inputPrefix && "ml-10"} "border-white text-light-white placeholder:text-light-white w-full bg-inherit ring-0 ring-offset-0 outline-none placeholder:text-sm ${props.readOnly && "text-search-gray"} `}
        {...props}
        {...(register && name ? register(name) : {})}
      />
      <div
        onClick={onSuffixClick}
        className="absolute top-1/2 right-5 z-10 -translate-y-1/2"
      >
        {suffix}
      </div>
    </div>
  );
};

export default Input;
