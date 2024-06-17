import { ComponentPropsWithoutRef } from "react";

type BaseInputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const BaseInput = ({ label, id, ...props }: BaseInputProps) => {
  return (
    <p className="mt-3">
      <label className="block text-xs font-bold text-teal-300 uppercase mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        className="block w-full p-2 border border-teal-500 rounded-md bg-teal-100 mb-4 text-base text-teal-900"
        id={id}
        name={id}
        {...props}
      />
    </p>
  );
};

export default BaseInput;
