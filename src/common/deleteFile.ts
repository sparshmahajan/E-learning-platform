import { unlink } from "fs";
import { fileExists } from "./fileExists";

const deleteFile = async (path: string) => {
  if (await fileExists(path)) {
    unlink(path, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

export { deleteFile };
