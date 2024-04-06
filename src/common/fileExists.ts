import { access } from "fs/promises";
import { constants } from "fs";

const fileExists = async (path: string) => {
  return access(path, constants.F_OK)
    .then(() => true)
    .catch(() => false);
};

export { fileExists };
