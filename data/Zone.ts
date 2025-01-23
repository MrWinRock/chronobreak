import { getAllCountriesTime } from "../utils/TimeUtils";

export const popularCountryCodes = [
  "US",
  "CN",
  "IN",
  "JP",
  "DE",
  "GB",
  "FR",
  "IT",
  "BR",
  "CA",
  "RU",
  "KR",
  "AU",
  "ES",
  "MX",
  "ID",
  "NL",
  "SA",
  "TR",
  "CH",
];

// Example usage
const countryTimes = getAllCountriesTime();
console.log(countryTimes);
