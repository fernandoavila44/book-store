import { useEffect, useState } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Controlador para cancelar la petición si el componente se desmonta
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
        // Si se canceló al desmontar, no se muestra error
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

    // Cleanup: al desmontar el componente se cancela la petición
    return () => {
      controlador.abort();
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;