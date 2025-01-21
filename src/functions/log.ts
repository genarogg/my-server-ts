import colors from "colors";

const green = (text: string) => {
  return console.log(colors.green(text));
};

const cyan = (text: string) => {
  return console.log(colors.cyan(text));
};

const red = (text: string) => {
  return console.log(colors.red(text));
};

const log = {
  green,
  cyan,
  red,
};

export default log;