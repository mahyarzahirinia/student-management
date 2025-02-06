export type FontTypes =
  | "vazir-medium"
  | "vazir-thin"
  | "vazir-bold"
  | "vazir-medium-farsi-num"
  | "vazir-thin-farsi-num"
  | "vazir-bold-farsi-num";

export const changeFont = (isPersianWithNumbers: boolean) => {
  const font: FontTypes = isPersianWithNumbers
    ? "vazir-thin-farsi-num"
    : "vazir-thin";
  document.documentElement.style.setProperty("--app-font", font);
};
