import { SubmitHandler, useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

interface IFormInput {
  query: string;
}

interface ImageSearchInputProps {
  onSearch: (query: string) => void;
}

const ImageSearchInput = ({ onSearch }: ImageSearchInputProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    onSearch(data.query);
    reset();
  };

  return (
    <form className="my-3" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
        Quick search
      </label>
      <div className="relative mt-2 flex items-center">
        <input
          type="text"
          id="search"
          defaultValue=""
          {...register("query", { required: "This is required" })}
          className={`form-control ${errors.query ? "is-invalid" : null}`}
          aria-invalid={errors.query ? "true" : "false"}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center px-1 font-sans text-xs text-gray-400">
            <MagnifyingGlassIcon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
          </kbd>
        </div>
      </div>
    </form>
  );
};

export default ImageSearchInput;
