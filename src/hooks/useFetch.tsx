import { useState } from 'react';

type FetchResult<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>(url: string): FetchResult<T> => {

  //TODO: 📌 Completar los useState e implementar la funcion de data fetching para que utilice la url que se pasa por parametro
  const [data,] = useState<T | null>(null);
  const [loading,] = useState(true);
  const [error,] = useState<string | null>(null);



  return { data, loading, error };
};

export default useFetch;