import { useCallback, useEffect, useState } from 'react';
import { SelectOption } from '../../Select';
import transformCountriesToOptions from '../../../utils/transformCountriesToOptions';

// should be moved to env's or config
const COUNTRIES_API = 'https://62600ac653a42eaa07ff38ea.mockapi.io/api/countries';

const useCountries = () => {
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(
    async (query?: string, limit = 10) => {
      // remove error if was
      if (!error) {
        setError(undefined);
      }

      // indicate loading
      setIsLoading(true);

      // passing parameters can be better with query-string package
      await fetch(`${COUNTRIES_API}?page=1&limit=${limit}&filter=${query ?? ''}`)
        .then((response) => response.json())
        .then((data) => {
          // transform received countries to the Select options and save to state
          setCountries(transformCountriesToOptions(data));
        })
        .catch((_error: Error) => {
          // set error message
          setError(_error.message);
          console.error(_error);
        })
        .finally(() => {
          // stop loading
          setIsLoading(false);
        });
    },
    [error],
  );

  // fetch data on first render
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { countries, fetchData, error, isLoading };
};

export default useCountries;
