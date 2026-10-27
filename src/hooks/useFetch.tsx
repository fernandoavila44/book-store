import { useEffect, useState } from 'react';

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
    const controlador = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal: controlador.signal });
        if (!response.ok) {
          throw new Error('Error en la consulta al api');
        }
        const resultado = await response.json();
        setData(resultado);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === 'AbortError') {
          return;
        }
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        if (!controlador.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controlador.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
