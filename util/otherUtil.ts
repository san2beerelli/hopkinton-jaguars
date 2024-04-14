import { parse, format } from "date-fns";

const currentYear = new Date().getFullYear();

export const getFormattedDate = (inputDateStr: string) => {
  const date = parse(
    `${inputDateStr} ${currentYear}`,
    "MM/dd yyyy",
    new Date()
  );

  const formattedDate = format(date, "MMMM dd, yyyy");
  return formattedDate;
};
