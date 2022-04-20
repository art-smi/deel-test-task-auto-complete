import { FC } from 'react';
import './Input.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * End adornment text or JSX
   */
  endAdornment?: string | JSX.Element;
}

const Input: FC<Props> = ({ endAdornment, ...props }) => (
  <div className='input'>
    <input className='input__field' {...props} />
    {endAdornment && <span className='input__end-adornment'>{endAdornment}</span>}
  </div>
);

export default Input;
