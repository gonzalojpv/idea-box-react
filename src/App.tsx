import "./App.css";

import DefaultLayout from "./screens/layouts/default";
import arrowIcon from "/arrow.svg";

function App() {
  return (
    <>
      <DefaultLayout>
        <h1 className="mb-5 text-4xl text-center">IdeaBox</h1>
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

        <article className="p-3 bg-gray-300 rounded-lg sm:flex sm:items-center">
          <section className="text-center sm:flex-1 sm:text-left">
            <h2 className="text-xl sm:text-2xl sm:leading-6">
              Lorem ipsum dolor sit amet consectetur adipiscing elit, urna consequat felis vehicula
              class ultricies mollis dictumst, aenean non a in donec nulla.
            </h2>
            <small>UserName</small>
          </section>
          <section className="pt-3 mt-6 border-t-2 border-black sm:pt-0 sm:pl-3 sm:border-t-0 sm:border-l-2 sm:flex sm:items-center">
            <h3 className="text-3xl font-bold text-center">99</h3>
            <nav className="flex justify-center sm:block">
              <img src={arrowIcon} alt="Vote up" className="w-10 cursor-pointer" />
              <img
                src={arrowIcon}
                alt="Vote down"
                className="w-10 cursor-pointer transform rotate-180"
              />
            </nav>
          </section>
        </article>
      </DefaultLayout>
    </>
  );
}

export default App;
