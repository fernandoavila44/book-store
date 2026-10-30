import { useCallback, useEffect, useState } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Realiza la petición y actualiza los estados según su resultado.
  const dispatching = useCallback(async (signal: AbortSignal) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, { signal });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const result: T = await response.json();
      setData(result);
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError(err.message);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, [url]);

  useEffect(() => {
    const controller = new AbortController();
    dispatching(controller.signal);

    return () => controller.abort();
  }, [dispatching]);

  return { data, loading, error };
};

export default useFetch;
