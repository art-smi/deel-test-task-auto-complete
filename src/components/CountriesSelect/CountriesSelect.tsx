import { useCallback } from 'react';
import Select from '../Select';
import useDebounceCallback from '../../hooks/useDebounce';

import useCountries from './hooks/useCountries';
import './CountriesSelect.css';

const CountriesSelect = () => {
  const { countries, fetchData, isLoading, error } = useCountries();
  const debounceCallback = useDebounceCallback();

  // refetch countries with query on filter change
  const refetchCountries = useCallback(
    (query: string) => {
      debounceCallback(() => fetchData(query));
    },
    [debounceCallback, fetchData],
  );

  return (
    <div className='countries-select'>
      <Select
        options={countries}
        onChangeFilter={refetchCountries}
        isLoading={isLoading}
        error={error}
        placeholder='Search country'
      />
    </div>
  );
};

export default CountriesSelect;
