import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FileRejection, useDropzone } from "react-dropzone";

interface IAvatarUpload {
  // handleImage: (file: File) => void;
  avatar?: string;
}

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

const ImageUpload: React.FC<IAvatarUpload> = ({ avatar }) => {
  const baseStyle = useMemo(
    () => ({
      width: "100%",
      borderRadius: "2%",
      backgroundColor: "transparent",
      color: "#bdbdbd",
      transition: "border .3s ease-in-out",
    }),
    []
  );

  const activeStyle = useMemo(
    () => ({
      borderColor: "#2196f3",
      borderWidth: 3,
    }),
    []
  );

  const acceptStyle = useMemo(
    () => ({
      borderColor: "#00e676",
      borderWidth: 3,
    }),
    []
  );

  const rejectStyle = useMemo(
    () => ({
      borderColor: "#ff1744",
      borderWidth: 3,
    }),
    []
  );

  const [files, setFiles] = useState<Blob[] | string[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setLoading(true);
      setLoading(true);
      if (acceptedFiles.length !== 0) {
        const formData = new FormData();
        formData.append("avatar", acceptedFiles[0], acceptedFiles[0].name);
        setFiles(
          acceptedFiles.map((file: Blob | MediaSource) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        // handleImage(acceptedFiles[0]);
        setLoading(false);
      }
    },
    // [handleImage]
    []
  );

  const onDropRejected = (fileRejections: FileRejection[]) => {
    // handleUploadError(fileRejections[0]);
    setLoading(false);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    onDropRejected,
    // accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] },
    noClick: true,
    // maxSize: 300 * 1024, // 300KB
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [
      baseStyle,
      isDragActive,
      activeStyle,
      isDragAccept,
      acceptStyle,
      isDragReject,
      rejectStyle,
    ]
  );

  const thumbs = files.map((file: any) => (
    <div
      key={file.name}
      className="relative h-96 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-96 lg:aspect-w-1 lg:aspect-h-1"
    >
      <img
        className="h-full w-full object-cover object-center"
        src={file.preview}
        alt={file.name}
      />
    </div>
  ));

  // const deleteAvatar = () => {
  //   if (files.length !== 0) {
  //     setFiles([]);
  //   }
  // };

  useEffect(
    () => () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );
  return (
    <div className=" items-center flex bg-slate-700 relative h-96 w-full overflow-hidden rounded-lg ">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div
          className={classNames(
            !loading ? "opacity-100 " : "opacity-0",
            "absolute flex cursor-pointer content-center items-center justify-center text-center text-lg text-gray-200 h-full w-full"
          )}
        >
          {!loading ? "Drag or Drop Image" : "Loading..."}
        </div>

        <aside>{thumbs}</aside>
        {thumbs.length === 0 && (
          <div className="inline-block overflow-hidden rounded-lg relative h-96 w-full  group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-96 lg:aspect-w-1 lg:aspect-h-1 text-center">
            {avatar && <img className="" src={avatar} alt="avatar" />}
          </div>
        )}
      </div>
    </div>
  );
};

export { ImageUpload };
