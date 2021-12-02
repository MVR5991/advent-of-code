import fs from "fs";

export const readTextFile = (file) => {
    return fs.readFileSync(file).toString().split("\r\n");
}