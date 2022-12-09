import React from "react";

const Image = ({ data }: any) => {
  return (
    <a href={data.urls.regular} target="_blank" rel="noreferrer">
      <img
        className="h-72 w-full object-cover rounded-lg shadow-md"
        src={data.urls.small}
        alt={data.alt_description}
      />
    </a>
  );
};

export const Images: React.FC<any> = ({ results }) => {
  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 my-4 max-w-7xl mx-auto px-4">
        {results.map((data: any) => (
          <Image key={data.id} data={data} />
        ))}
      </div>
    </>
  );
};
