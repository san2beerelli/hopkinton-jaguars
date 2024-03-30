import { isFuture, parse } from "date-fns";

const currentYear = new Date().getFullYear();
const getFilteredResponse = (response: any[]) => {
  const filteredResponse = response.filter(
    (item: { Date: string; Time: string }) => {
      const date = parse(
        `${item.Date}/${currentYear} ${item.Time}`,
        "MM/dd/yyyy h:mm a",
        new Date()
      );
      return isFuture(date);
    }
  );
  return filteredResponse;
};

export { getFilteredResponse };
