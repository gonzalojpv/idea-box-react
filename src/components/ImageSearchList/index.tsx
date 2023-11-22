import type { ImageType } from "../../types/image";

interface ImageSearchListProps {
  images: ImageType[];
}

const ImageSearchList = ({ images }: ImageSearchListProps) => {
  const open = url => window.open(url);

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-0 lg:gap-x-8">
      {images.map(photo => (
        <div key={photo.id} className="group relative">
          <div
            onClick={() => open(photo.links.html)}
            className="h-96 w-full overflow-hidden rounded-lg sm:aspect-h-3 sm:aspect-w-2 group-hover:opacity-75 sm:h-auto"
          >
            <img
              src={photo.urls?.regular}
              alt={photo.alt_description}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <h3 className="mt-4 text-base font-semibold text-gray-900">
            <a onClick={() => open(photo.links.html)} href="#">
              <span className="absolute inset-0" />
              {photo.description}
            </a>
          </h3>
          <p className="mt-1 mb-3 text-sm text-gray-500">{photo.alt_description}</p>
        </div>
      ))}
    </div>
  );
};

export default ImageSearchList;
