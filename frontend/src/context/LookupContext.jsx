import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import api from "../utils/api";

import config from "../config/app-config";
import { buildError } from "../utils/utils";

export const LookupContext = createContext();

export const LookupProvider = ({ children }) => {
  const { url } = config;
  const [clearances, setClearances] = useState({});
  const [countries, setCountries] = useState([]);
  const [isScimEnabled, setIsScimEnabled] = useState(true);

  const fetchClearances = useCallback(async () => {
    try {
      const { data } = await api.get(
        `${url}/hierarchies/lookup/clearance?isUserAttribute=true`
      );
      setClearances({ data });
    } catch (err) {
      setClearances({
        error: buildError(err),
        data: {},
      });
    }
  }, [url]);

  const fetchCountries = useCallback(async () => {
    try {
      const { data } = await api.get(`${url}/countries`);
      setCountries({ data });
    } catch (err) {
      setCountries({
        error: buildError(err),
        data: [],
      });
    }
  }, [url]);

  const fetchScimEnabled = useCallback(async () => {
    try {
      const {
        data: { isEnabled },
      } = await api.get(`${url}/scim/v2/IsEnabled`);
      setIsScimEnabled({ data: isEnabled === "true" });
    } catch (err) {
      setIsScimEnabled({
        error: buildError(err),
        data: true,
      });
    }
  }, [url]);

  useEffect(() => {
    fetchClearances();
  }, [fetchClearances]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  useEffect(() => {
    fetchScimEnabled();
  }, [fetchScimEnabled]);

  const value = useMemo(
    () => ({ clearances, countries, isScimEnabled }),
    [clearances, countries, isScimEnabled]
  );

  return (
    <LookupContext.Provider value={value}>{children}</LookupContext.Provider>
  );
};
