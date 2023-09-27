import { useForm, SubmitHandler } from "react-hook-form";

const AuthLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    // @ts-ignore
  } = useForm<Inputs>();
  // @ts-ignore
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email" className="label-control">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              type="email"
              autoComplete="email"
              defaultValue=""
              {...register("email", { required: "Email Address is required" })}
              className={`form-control ${errors.password ? "is-invalid" : null}`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.message as string && (
              <div className="block mt-1 text-sm text-left text-red-500" role="alert">
                {errors.email?.message as string}
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="label-control">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              defaultValue=""
              {...register("password", { required: "This field is required" })}
              className={`form-control ${errors.password ? "is-invalid" : null}`}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.password?.message as string && (
              <div className="block mt-1 text-sm text-left text-red-500" role="alert">
                {errors.password?.message as string}
              </div>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthLoginForm;
