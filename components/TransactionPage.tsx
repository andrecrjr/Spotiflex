import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

function TransactionPage({ children }) {
  const [displayChildren, setChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setTransitionStage('fadeIn');
  }, []);
  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionStage('fadeOut');
    }
  }, [children, setChildren, displayChildren]);

  return (
    <div
      className={`content ${transitionStage} ${
        (router.pathname !== '/' && 'subpage') || ''
      }`}
      ref={ref}
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          setChildren(children);
          ref.current.scrollIntoView(true);
          setTransitionStage('fadeIn');
        }
      }}
    >
      {displayChildren}
    </div>
  );
}

export default TransactionPage;
