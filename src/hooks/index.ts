import { useEffect, useState, useCallback } from "react";
import { IPort, IRateQuery, IRates } from "../@types";
import requestService from "../services/requests";

export const useFetchPort = () => {
  const [data, setData] = useState<Array<IPort>>([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await requestService.getAllPorts();
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (err) {
        const error = err;
        setError(err);
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return [data, error];
};

export const useFetchRates = (query: IRateQuery) => {
  const [data, setData] = useState<Array<IRates>>([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await requestService.getMarketRates(query);
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (err) {
      const error = err;
      setError(error?.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [query, fetchData]);

  return [data, error, isLoading];
};
