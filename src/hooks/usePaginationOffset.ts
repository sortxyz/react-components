// hooks/usePaginationOffset.ts
import { useState } from 'react';

const usePaginationOffset = (initialOffset = 0) => {
  const [offset, setOffset] = useState(initialOffset);

  const increaseOffset = () => {
    setOffset((prevOffset) => prevOffset + 25);
  };

  const decreaseOffset = () => {
    setOffset((prevOffset) => (prevOffset - 25 >= 0 ? prevOffset - 25 : 0));
  };

  return { offset, increaseOffset, decreaseOffset };
};

export default usePaginationOffset;
