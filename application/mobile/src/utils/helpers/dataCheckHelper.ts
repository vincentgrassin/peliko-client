import { countryCodes } from "./countryCodes";

export const formatPhoneNumber = (phoneNumber: string, countryCode: string) => {
  if (phoneNumber.length > 0 && phoneNumber.startsWith("0")) {
    phoneNumber = phoneNumber.substr(1);
  }
  phoneNumber = phoneNumber.replace(/\s/g, "");
  const detailedCountryCode = countryCodes.find(
    (el) => el.code === countryCode
  );

  if (detailedCountryCode) {
    phoneNumber = phoneNumber.replace(detailedCountryCode?.dial_code, "");
  }
  return phoneNumber;
};
