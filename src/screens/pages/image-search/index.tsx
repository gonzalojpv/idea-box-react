import ImageSearchList from "../../../components/ImageSearchList";
import ImageSearchInput from "../../../components/ImageSearchInput";

import { useQuery } from "@tanstack/react-query";
import { fetchImages } from "../../../services/images";
import { useState } from "react";

const ImageSearch = () => {
  const [query, setQuery] = useState<string>("");
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["images", query],
    queryFn: async () => fetchImages(query),
  });

  const onSearch = (query: string) => {
    setQuery(query);
    refetch();
  };

  if (isLoading) {
    return <>Loading...</>;
  } else if (isError) {
    // @ts-ignore
    return <div>{error.message}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 sm:py-4 lg:px-8">
        <ImageSearchInput onSearch={onSearch} />
        {query && (
          <div className="sm:flex sm:items-baseline sm:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Results of the {query}
            </h2>
            <a
              href="#"
              className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block"
            >
              Browse all favorites
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        )}

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
