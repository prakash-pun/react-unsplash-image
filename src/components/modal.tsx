import { Fragment, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import debounce from "lodash.debounce";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { getImages } from "../services";
import { Images } from "./image";

const NoResult = () => {
  return (
    <div className="text-center self-center h-72 flex justify-center items-center">
      <div>
        <p className="text-2xl font-semibold">No results</p>
        <p className="font-medium">Please update your search and try again</p>
      </div>
    </div>
  );
};

const Loading = () => {
  return (
    <div className="text-center self-center h-72 flex justify-center items-center">
      <svg
        className="animate-spin -ml-1 mr-3 h-6 w-6 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export const UnsplashModal: React.FC<any> = ({ isOpen, closeModal }) => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any): void => {
    setQuery(event.target.value);
  };

  // const clearSelected = (): void => {
  //   setQuery("");
  // };

  const debouncedResults = useMemo(() => debounce(handleChange, 300), []);

  console.log(result);

  useEffect(() => {
    if (query) {
      const getSearchImages = async (): Promise<void> => {
        setLoading(true);
        const payload = {
          name: "Get Images",
          endpoint: `search/photos?page=1&query=${query}&client_id=${process.env.REACT_APP_ACCESS_KEY}`,
        };
        const response = await getImages(payload);
        if (response.status === "success") {
          setResult(response?.data);
          setLoading(false);
        } else {
          setLoading(false);
          setResult([]);
        }
      };

      getSearchImages();
    }
  }, [query]);

  useEffect(() => () => {
    debouncedResults.cancel();
  });

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-3xl h-96 transform overflow-hidden rounded-md bg-white p-4 pb-0 text-left align-middle shadow-xl transition-all ">
                  <Dialog.Title
                    as="div"
                    className="text-lg flex justify-between font-semibold leading-6 text-gray-900 pb-2 border-b"
                  >
                    <div>Unsplash</div>

                    <XCircleIcon
                      onClick={closeModal}
                      className="h-6 w-6 text-violet-200 hover:text-violet-100 cursor-pointer"
                      aria-hidden="true"
                    />
                  </Dialog.Title>
                  <div className="mt-2 ">
                    <form className="group relative">
                      <svg
                        width="20"
                        height="20"
                        fill="currentColor"
                        className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        />
                      </svg>
                      <input
                        className="focus:ring-2 focus:ring-blue-200 focus:outline-none appearance-none w-full text-base leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
                        type="text"
                        aria-label="Search Photos"
                        placeholder="Search Photos"
                        onChange={debouncedResults}
                      />
                    </form>
                    <div className=" h-72 overflow-y-scroll">
                      {!loading ? (
                        result && result?.results?.length ? (
                          <Images results={result.results} />
                        ) : (
                          <NoResult />
                        )
                      ) : (
                        <Loading />
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
