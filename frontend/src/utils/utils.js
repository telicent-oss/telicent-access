import config from "../config/app-config";

export const getCountryName = (countries, alpha3) =>
  countries?.find((country) => country.alpha3 === alpha3)?.name ?? alpha3;

export const getAlpha2 = (countries, alpha3) =>
  countries?.find((country) => country.alpha3 === alpha3)?.alpha2 ?? "";

export const getLabel = (type, value) => {
  const { classifications, userProperties } = config;
  let options = [];

  if (type === "classification") {
    options = classifications;
  } else if (type === "user") {
    options = userProperties;
  }

  return options.find((option) => option.value === value)?.label || value;
};

export const validateEmail = (email) =>
  /(.+){1,63}@(.+){1,63}\.(.+){2,63}/.test(email);

export const isUserClearanceValid = (tiers, userClearance) =>
  tiers?.includes(userClearance) ?? false;

export const sort = (array, type, descend) =>
  array.sort((a, b) => {
    const notSet = "Not set";
    let sorted;
    // Move "Not set" to the top.
    if (a[type] === notSet) sorted = -1;
    else if (b[type] === notSet) sorted = 1;
    else {
      sorted = a[type].toString().localeCompare(b[type].toString(), "en", {
        sensitivity: "base",
        numeric: true,
      });
    }
    return descend ? -sorted : sorted;
  });

export const sortPartial = (type, isDescend) => (a, b) => {
  const sorted = a[type].toString().localeCompare(b[type].toString(), "en", {
    sensitivity: "base",
    numeric: true,
  });
  return isDescend ? -sorted : sorted;
};

export const sortPartialLabels = (type, isDescend) => (a, b) => {
  const sortA = a.labels?.find(({ name }) => name === type)?.value ?? "";
  const sortB = b.labels?.find(({ name }) => name === type)?.value ?? "";
  const sorted = sortA.localeCompare(sortB, "en", { sensitivity: "base" });
  return isDescend ? -sorted : sorted;
};

export const buildError = (error) => {
  if (error?.response) {
    return {
      code: error.response.data.code,
      message: error.response.data.message,
    };
  }
  if (error?.code) {
    return { code: error.data, message: error.message };
  }
  if (error?.data?.code) {
    return error.data;
  }
  if (error?.response) {
    return { code: error.response.status, message: error.response.statusText };
  }
  if (error?.status) {
    return { code: error.status, message: error.statusText };
  }
  return { code: "UNKNOWN", message: error?.message || "Unknown error" };
};
