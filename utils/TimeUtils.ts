import moment from "moment-timezone";
import * as ct from "countries-and-timezones";

/**
 * Gets the current time for a given country's timezone.
 * @param {string} countryCode - The ISO country code.
 * @returns {string | null} The formatted time or null if the country is not found.
 */
export function getTimeByCountry(countryCode: any) {
  const country = ct.getCountry(countryCode);
  if (!country || !country.timezones.length) return null;

  const timezone = country.timezones[0];
  return moment.tz(timezone).format("DD/MM/YYYY HH:mm:ss");
}

/**
 * Gets the current time for all countries' timezones.
 * @returns {Record<string, string | null>} An object with country codes as keys and formatted times as values.
 */
export function getAllCountriesTime() {
  const countries = ct.getAllCountries();
  const countryTimes: Record<string, string | null> = {};

  for (const countryCode in countries) {
    countryTimes[countryCode] = getTimeByCountry(countryCode);
  }

  return countryTimes;
}
