// utils/dateUtils.js
import moment from "jalali-moment";

export const convertToJalali = (gregorianDate) => {
  return moment(gregorianDate, "YYYY-MM-DD")
    .locale("fa")
    .format("jYYYY/jMM/jDD");
};

export const convertToGregorian = (jalaliDate) => {
  return moment(jalaliDate, "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD");
};

// I Use This
export const convertIsoToJalali = (isoDate) => {
  return moment(isoDate, "YYYY-MM-DDTHH:mm:ss.SSS")
    .locale("fa")
    .format("jYYYY/jMM/jDD");
};

export const convertJalaliToIso = (jalaliDate) => {
  return moment(jalaliDate, "jYYYY/jMM/jDD")
    .locale("en")
    .format("YYYY-MM-DDTHH:mm:ss.SSS");
};
