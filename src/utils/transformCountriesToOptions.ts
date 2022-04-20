import { SelectOption } from '../components/Select';

interface Country {
  id: number;
  country: string;
}

const transformCountriesToOptions = (data: Country[]): SelectOption[] => {
  return data.map(({ id, country }) => ({ key: id, label: country }));
};

export default transformCountriesToOptions;
