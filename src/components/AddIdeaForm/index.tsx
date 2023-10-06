import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import type { Idea } from "../../types/ideas";
import type { FirebaseUser } from "../../types/user";
// @ts-ignore
interface IdeaListProps {
  // @ts-ignore
  addIdea: (idea: Idea) => void;
  // @ts-ignore
  doLogin: () => void;
  // @ts-ignore
  doLogout: () => void;
  user: FirebaseUser;
}

interface IFormInput {
  idea: string;
}

const AddIdeaForm: React.FC<IdeaListProps> = ({ addIdea, user, doLogin, doLogout }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    addIdea({
      name: data.idea,
      userName: user?.displayName || "",
      votes: 0,
      createdAt: Date.now(),
      user: user?.uid,
    });
    reset();
  };

  return (
    <>
      <section className="mb-6">
        <form className="sm:flex" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            defaultValue=""
            disabled={!user}
            placeholder="Add your idea"
            {...register("idea", { required: "Idea is required" })}
            className={`form-control ${errors.idea ? "is-invalid" : null}`}
            aria-invalid={errors.idea ? "true" : "false"}
          />
          {user && (
            <input
              type="submit"
              value={"Add idea"}
              className="w-full p-2 text-white bg-gray-600 sm:flex-1"
            />
          )}
        </form>
        {(errors.idea?.message as string) && (
          <div className="block mt-1 text-sm text-left text-red-500" role="alert">
            {errors.idea?.message as string}
          </div>
        )}
        <p>
          {user ? (
            <>
              Hi 👋 {user.displayName}.
              <a href="#" onClick={doLogout} className="font-bold underline">
                Logout
              </a>
              .
            </>
          ) : (
            <>
              Please{" "}
              <a href="#" onClick={doLogin} className="font-bold underline">
                login
              </a>{" "}
              first
            </>
          )}
        </p>
      </section>
    </>
  );
};

export default AddIdeaForm;
