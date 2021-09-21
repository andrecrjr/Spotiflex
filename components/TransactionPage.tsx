import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const TransactionPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayChildren, setChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('fadeOut');

  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      ref?.current?.scrollIntoView({ block: 'start' });
    });
    () => {
      router.events.off('routeChangeComplete', () => {
        ref?.current?.scrollIntoView({ block: 'start' });
      });
    };
  }, [router.events]);

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
          setTransitionStage('fadeIn');
        }
      }}
    >
      {displayChildren}
    </div>
  );
};

export default TransactionPage;
