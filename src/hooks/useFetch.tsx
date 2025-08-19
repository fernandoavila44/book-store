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

  useEffect (() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try{
        const response = await fetch(url);
        if(!response.ok){
          throw new Error(`Error HTTP: ${response.status}`);
        }
        const result =(await response.json()) as T;

        if (isMounted) {
          setData(result);
        }
      } catch (err: unknown){
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally{
        if(isMounted){
          setLoading(false);
        }
      }
    };

    fetchData();

    return () =>{
      isMounted = false;
    };
  },[url]);



  return { data, loading, error };
};

export default useFetch;