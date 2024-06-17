import { ComponentPropsWithoutRef, forwardRef } from "react";

type BaseInputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const BaseInputRef = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ label, id, ...props }: BaseInputProps, ref) => {
    return (
      <p className="mt-3">
        <label className="block" htmlFor={id}>
          {label}
        </label>
        <input className="text-gray-900" id={id} {...props} ref={ref} />
      </p>
    );
  },
);

export default BaseInputRef;
