import { AxiosRequestConfig } from "axios";
import { ApiService } from "data/services/ApiService";
import useSwr from "swr";

export default function useApi<OutputType>(
  endPoint: string | null,
  config?: AxiosRequestConfig
): { data: OutputType | undefined; error: Error } {
  const { data, error } = useSwr(endPoint, async (url) => {
    const response = await ApiService(url, config);

    return response.data;
  });

  return { data, error };
}
