import React, { FC, useCallback, useState } from 'react';
import Input from '../Input';
import Loader from '../Loader';
import Option from './components/Option';

import './Select.css';

export interface SelectOption {
  /**
   * Unique id
   */
  key: string | number;

  /**
   * Label will be displayed to user
   */
  label: string;
}

interface Props {
  /**
   * Select options to display
   */
  options: SelectOption[];

  /**
   * Event will be fired when filter is changed
   */
  onChangeFilter?: (filter: string) => void;

  /**
   * Event will be fired when selected value will be changed
   */
  onChange?: (key: SelectOption['key']) => void;

  /**
   * Show error text below component
   */
  error?: string;

  /**
   * Indicates loading data
   */
  isLoading?: boolean;

  /**
   * Placeholder will be display when input value is empty
   */
  placeholder?: string;
}

const Select: FC<Props> = ({ options, onChangeFilter, error, isLoading, onChange, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState<SelectOption['key']>();
  const [currentSearchValue, setSearchValue] = useState('');
  const [isOpened, setIsOpened] = useState(false);
  const hasResults = options.length > 0;
  const onChangeInput = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchValue(value);
      onChangeFilter?.(value);
    },
    [onChangeFilter],
  );

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

  const renderedLoading = isLoading ? (
    <div className='select__loader'>
      <Loader />
    </div>
  ) : undefined;

  return (
    <div className='select'>
      <div className='select__input'>
        <Input
          onChange={onChangeInput}
          endAdornment={renderedLoading}
          onClick={onClickInput}
          value={currentSearchValue ?? ''}
          placeholder={placeholder}
        />
        {error && <p className='select__error'>{error}</p>}
      </div>
      {isOpened && (
        <div className='select__dropdown'>
          {hasResults &&
            options.map((option) => (
              <Option
                key={option.key}
                data={option}
                onClick={onClickSelectOption}
                highlightedText={currentSearchValue}
                isSelected={selectedOption === option.key}
              />
            ))}
          {!hasResults && <span className='select__nothing'>Nothing to show :(</span>}
        </div>
      )}
    </div>
  );
};

export default Select;
