import React, { useEffect, useRef } from 'react';

const OutSideClick = ({ onOutsideClick, children }) => {
  const node = useRef();

  const handleClick = (e) => {
    if (!node.current.contains(e.target)) {
      onOutsideClick();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [handleClick]);

  return <div ref={node}>{children}</div>;
};

export default OutSideClick;
