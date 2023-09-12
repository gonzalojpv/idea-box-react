const addIdeaForm = () => {
  return (
    <>
      <section className="mb-6">
        <form className="sm:flex">
          <input
            type="text"
            required
            placeholder="Add your idea"
            className="w-full p-3 sm:flex-auto"
          />
          <input
            type="submit"
            value={"Add idea"}
            className="w-full p-2 text-white bg-gray-600 sm:flex-1"
          />
        </form>
      </section>
    </>
  );
};

export default addIdeaForm;
