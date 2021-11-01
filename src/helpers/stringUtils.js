import moment from "moment";

const stringUtils = {};

stringUtils.formatNumberString = (num) => {
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
stringUtils.checkCalculationFormat = (str) => {
  const regex = /^\d+\s*(\+|-|\*)\s*\d+\s*$/g;
  return regex.test(str);
};

stringUtils.convertToCalendarDate = (str) => {
  const date = moment(str).calendar(null, {
    sameDay: "[Today] [at] h:mm:ss a",
    lastDay: "[Yesterday] [at] h:mm:ss a",
    sameElse: "ddd, Do MMM, YYYY [at] h:mm:ss a",
  });
  return date;
};
export const {
  formatNumberString,
  checkCalculationFormat,
  convertToCalendarDate,
} = stringUtils;
