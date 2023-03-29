import React from "react";

const Image = ({ data }: any) => {
  const aspect = data.height <= 5000 ? "video" : "square";
  return (
    <a href={data.urls.regular} target="_blank" rel="noreferrer">
    <img
      className={`w-full aspect-${aspect} mb-6 object-cover rounded-lg shadow-md`}
      src={data.urls.small}
      alt={data.alt_description}
    />
    </a>
  );
};

export const Images: React.FC<any> = ({ results }) => {
  return (
    <>
      <div className="gap-4 columns-3 max-w-7xl mx-auto px-3 mb-5">
        {results.map((data: any) => (
          <Image key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};
