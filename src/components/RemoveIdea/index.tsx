import { PropsWithChildren } from "react";

interface ChildProps {
  name: string;
  onRemoveIdea: () => void;
  onCancelRemoveIdea: () => void;
}

const RemoveIdea = ({ name, onCancelRemoveIdea, onRemoveIdea }: PropsWithChildren<ChildProps>) => {
  return (
    <>
      <div className="w-full flex justify-center absolute top-40">
        <article className="w-3/4 p-4 bg-gray-400 shadow-2xl">
          <p className="text-center text-xl">Remove {name}?</p>
          <section className="flex justify-end">
            <button className="p-3 m-1 bg-red-500 text-white" onClick={onRemoveIdea}>
              OK
            </button>
            <button className="p-3 m-1 bg-gray-200" onClick={onCancelRemoveIdea}>
              Cancel
            </button>
          </section>
        </article>
      </div>
    </>
  );
};

export default RemoveIdea;
