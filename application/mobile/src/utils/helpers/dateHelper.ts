import { DAYS_IN_SECONDS, HOURS } from "./constants";
import { resources } from "../../themeHelpers";

export const getDateFormat = (s: string) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };
  const date = new Date(s);
  return date.toLocaleDateString();
};

export const getRemainingTimeOnDate = (
  date: string | undefined,
  isShorten: boolean
) => {
  if (date) {
    const remainingTime = new Date(date).getTime() - new Date().getTime();
    if (remainingTime > 0) {
      if (remainingTime / DAYS_IN_SECONDS < 1) {
        const value = Math.round((remainingTime / DAYS_IN_SECONDS) * HOURS);
        const text = !isShorten
          ? resources.remainingHours
          : resources.remainingHoursShort;
        return { value, text };
      }
      const value = Math.round(remainingTime / DAYS_IN_SECONDS);
      const text = !isShorten
        ? resources.remainingDays
        : resources.remainingDaysShort;

      return { value: value.toString(), text };
    }

    return undefined;
  }
  return undefined;
};
