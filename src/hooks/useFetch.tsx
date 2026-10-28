import { useState, useEffect } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result: T = await response.json();
        setData(result);
        setLoading(false);
      } catch (err) {
        // Si la petición se canceló (cambió la url o se desmontó el componente), no hacemos nada
        if (err instanceof DOMException && err.name === 'AbortError') return;

        setError(err instanceof Error ? err.message : 'Error desconocido');
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup: cancela la petición si el componente se desmonta o cambia la url
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;