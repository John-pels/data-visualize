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
        setData(response.data);
      } catch (err) {
        const error = err as any;
        setError(error);
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
      setData(response.data);
    } catch (err) {
      const error = err as any;
      setError(error);
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
