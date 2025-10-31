import { useState, useEffect } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {
  // 📌 useState para almacenar la respuesta, el estado de carga y los errores
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📌 useEffect que se ejecuta cada vez que cambia la URL
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || 'Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  // 📌 Devuelve el objeto con los tres estados
  return { data, loading, error };
};

export default useFetch;
