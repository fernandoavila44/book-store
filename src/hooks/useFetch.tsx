import { useState, useEffect } from 'react';

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
      const response = await fetch(url);   
      const result = await response.json(); 
      setData(result);
      setLoading(false);
    } 
    catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  fetchData();
}, [url]);

  return { data, loading, error };
};

export default useFetch;