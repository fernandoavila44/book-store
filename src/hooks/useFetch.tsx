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
      try {
        setLoading(true); 
        setError(null);
        
        
        const response = await fetch(url);
        
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        
        const result = await response.json();
        setData(result); 
        
      } catch (err) {
        
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        
        setLoading(false);
      }
    };

    
    fetchData();
  }, [url]); 

  return { data, loading, error };
};

export default useFetch;