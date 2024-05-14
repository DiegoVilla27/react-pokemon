import { API_URL } from "@/config/general.config";
import { IPokemonList } from "@/interfaces/pokemon";
import axios from "@interceptor/index";
import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";

export const useGetPokemonsSvc = (generation: number) => {
  const controller: AbortController = new AbortController();
  const { signal }: { signal: AbortSignal } = controller;

  const [data, setData] = useState<IPokemonList>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData: () => Promise<void> = async () => {
      try {
        setLoading(true);
        const response: AxiosResponse<IPokemonList> = await axios.get(
          `${API_URL}/generation/${generation}`,
          { signal }
        );
        setData(response.data);
        setError(null);
      } catch (err: unknown) {
        if (axios.isCancel(err)) {
          setError((err as AxiosError).message);
        } else {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [generation]);

  return {
    data,
    loading,
    error
  };
};
