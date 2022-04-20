import { useCallback } from 'react';
import useCountries from './hooks/useCountries';
import Select from '../Select';

import './CountriesSelect.css';

const CountriesSelect = () => {
  const { countries, fetchData, isLoading, error } = useCountries();

  // refetch countries with query on filter change
  const refetchCountries = useCallback(
    (query: string) => {
      fetchData(query);
    },
    [fetchData],
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
