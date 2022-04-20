import { FC, useCallback, useMemo } from 'react';
import { SelectOption } from '../../Select';

import './Option.css';

interface Props {
  /**
   * SelectOption data
   */
  data: SelectOption;

  /**
   * Selected flag will add checkmark at the end
   */
  isSelected?: boolean;

  /**
   * Event will be fired on click event
   */
  onClick?: (key: SelectOption['key']) => void;

  /**
   * Text will be highlighted with yellow background
   */
  highlightedText?: string;
}

const Option: FC<Props> = ({ data, onClick, isSelected, highlightedText }) => {
  const { key, label } = data;
  const onClickWrapper = useCallback(() => {
    onClick?.(key);
  }, [key, onClick]);

  const highlightRegExp = new RegExp(`(${highlightedText})`, 'gi');
  const textParts = label.split(highlightRegExp);

  const content = useMemo(() => {
    if (!highlightedText || highlightedText === label) {
      return label;
    }

    return textParts.map((part, index) => (
      <span
        key={`${part}_${index}`}
        className={part.toLowerCase() === highlightedText.toLowerCase() ? 'option__highlight' : ''}
      >
        {part}
      </span>
    ));
  }, [highlightedText, label, textParts]);

  return (
    <div className='option' onClick={onClickWrapper}>
      {content}
      {isSelected && <span className='option__checkmark'>✅</span>}
    </div>
  );
};

export default Option;
