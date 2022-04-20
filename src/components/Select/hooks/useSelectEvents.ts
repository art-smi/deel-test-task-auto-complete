import { useCallback, useState } from 'react';
import { SelectOption, SelectProperties } from '../Select';

const useSelectEvents = (
  { options, onChange, onChangeFilter }: Pick<SelectProperties, 'onChangeFilter' | 'onChange' | 'options'>
) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption['key']>();
  const [currentSearchValue, setSearchValue] = useState('');
  const [isOpened, setIsOpened] = useState(false);

  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
      onChangeFilter?.(value);
    },
    [onChangeFilter],
  );

  // toggle dropdown state
  const onClickInput = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onClickSelectOption = useCallback(
    (key: SelectOption['key']) => {
      onChange?.(key);
      setSelectedOption(key);
      setIsOpened(false);

      // get original option label by clicked key
      const originalOption = options.find((item) => item.key === key);
      setSearchValue(originalOption?.label ?? '');
    },
    [onChange, options],
  );

  return [
    { selectedOption, currentSearchValue, isOpened },
    { onClickInput, onChangeInput, onClickSelectOption }
  ];
}

export default useSelectEvents;
