// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
import { useRef, useEffect, useLayoutEffect } from 'react'

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useLayoutEffect(() => {
    function tick() {
      savedCallback.current();
    }

    let id = setInterval(tick, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export default useInterval