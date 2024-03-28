import { ComponentPropsWithoutRef } from "react";

type BaseInputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

const BaseInput = ({ label, id, ...props }: BaseInputProps) => {
  return (
    <p className="mt-3">
      <label className="block" htmlFor={id}>
        {label}
      </label>
      <input id={id} {...props} />
    </p>
  );
};

export default BaseInput;
