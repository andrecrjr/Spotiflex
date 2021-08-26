import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

function TransactionPage({ children }) {
  const [displayChildren, setChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');
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
      className={`content ${transitionStage}`}
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          setChildren(children);
          setTransitionStage('fadeIn');
        }
      }}
    >
      {displayChildren}
    </div>
  );
}

export default TransactionPage;
