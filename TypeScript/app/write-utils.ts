import * as fs from "fs";

export const appendToFile = async (fileName: string, text: string) => {
  fs.appendFile(`./${fileName}.txt`, text, (err: any) => {
    if (err) {
      return console.log(err);
    }
  });
};

export const logToConsoleAndFile = async (fileName: string, text: string) => {
  await appendToFile(fileName, `${text}\n`);
  console.log(text);
};
