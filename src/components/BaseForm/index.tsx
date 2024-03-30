import {
  useRef,
  type ComponentPropsWithoutRef,
  type FormEvent,
  useImperativeHandle,
  forwardRef,
} from "react";

export type FormHandle = {
  clear: () => void;
};

type BaseFormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

const BaseForm = forwardRef<FormHandle, BaseFormProps>(
  ({ onSave, children, ...otherProps }, ref) => {
    const form = useRef<HTMLFormElement>(null);

    useImperativeHandle(ref, () => {
      return {
        clear() {
          form.current?.reset();
        },
      };
    });

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const formData = new FormData(evt.currentTarget);
      const data = Object.fromEntries(formData);

      onSave(data);
    };

    return (
      <form onSubmit={handleSubmit} {...otherProps} ref={form}>
        {children}
      </form>
    );
  },
);

export default BaseForm;
