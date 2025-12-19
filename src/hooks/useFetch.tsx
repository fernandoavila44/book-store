import { useEffect, useState } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {

  // Estados básicos
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Efecto para obtener los datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError('No se pudieron cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
