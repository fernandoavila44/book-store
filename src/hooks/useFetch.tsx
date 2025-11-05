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
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue satisfactoria.');
        }
        const result = await response.json() as T;
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Ocurrió un error inesperado.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]); 

  return { data, loading, error };
};

export default useFetch;