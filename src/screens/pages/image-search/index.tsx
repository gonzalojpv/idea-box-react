import ImageSearchList from "../../../components/ImageSearchList";

import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../../../services/images";

const ImageSearch = () => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    // @ts-ignore
    return <div>{error.message}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="sm:flex sm:items-baseline sm:justify-between">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">Our Favorites</h2>
          <a
            href="#"
            className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
          >
            Browse all favorites
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <ImageSearchList images={data.results} />

        <div className="mt-6 sm:hidden">
          <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
            Browse all favorites
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageSearch;
