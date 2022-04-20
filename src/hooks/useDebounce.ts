import { useCallback, useRef } from 'react';

const DEBOUNCE_TIMEOUT = 300;

/**
 * Debounce the function
 *
 * @param timeout timeout in ms passed to setTimeout(). Default: 300
 */
const useDebounceCallback = (timeout = DEBOUNCE_TIMEOUT) => {
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (callback: () => void) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }

      debounceTimeout.current = setTimeout(() => {
        callback();
      }, timeout);
    },
    [timeout],
  );

  return debounce;
};

export default useDebounceCallback;
