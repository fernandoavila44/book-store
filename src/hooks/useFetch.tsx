import { useEffect, useState } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {

   //TODO: 📌 Completar los useState e implementar la funcion de data fetching para que utilice la url que se pasa por parametro
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Ocurrió un error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;