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

export const getRemainingTimeOnDate = (date: string, isShorten: boolean) => {
  const remainingTime = new Date(date).getTime() - new Date().getTime();
  if (remainingTime > 0) {
    if (remainingTime / DAYS_IN_SECONDS < 1) {
      const dayCount = Math.round((remainingTime / DAYS_IN_SECONDS) * HOURS);
      const secondaryText = !isShorten
        ? resources.remainingHours
        : resources.remainingHoursShort;
      return { dayCount, secondaryText };
    }
    const dayCount = Math.round(remainingTime / DAYS_IN_SECONDS);
    const secondaryText = !isShorten
      ? resources.remainingDays
      : resources.remainingDaysShort;

    return { dayCount, secondaryText };
  }

  return undefined;
};
