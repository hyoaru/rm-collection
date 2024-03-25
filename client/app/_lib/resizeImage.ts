import FileResizer from "react-image-file-resizer";

export const resizeImage = (file: File) =>
  new Promise((resolve) => {
    FileResizer.imageFileResizer(
      file,
      1000,
      1000,
      "JPEG",
      85,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      300,
      300,
    );
  });