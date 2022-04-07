import { DAY_IN_SECONDS, HOURS, locale } from "./constants";
import { resources } from "../../themeHelpers";

export const getDateFormat = (s: string | number) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(s);
  return date.toLocaleDateString(locale); // not working on Android https://github.com/facebook/react-native/issues/15717
};

export const getRemainingTimeOnDate = (
  date: string | undefined,
  isShorten: boolean
) => {
  if (date) {
    const remainingTime = new Date(date).getTime() - new Date().getTime();
    if (remainingTime > 0) {
      if (remainingTime / DAY_IN_SECONDS < 1) {
        const value = Math.round((remainingTime / DAY_IN_SECONDS) * HOURS);
        const text = !isShorten
          ? resources.remainingHours
          : resources.remainingHoursShort;
        return { value, text };
      }
      const value = Math.round(remainingTime / DAY_IN_SECONDS);
      const text = !isShorten
        ? resources.remainingDays
        : resources.remainingDaysShort;

      return { value: value.toString(), text };
    }

    return undefined;
  }
  return undefined;
};
