import React from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';

const TransactionPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { asPath, pathname } = useRouter();

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => {
        window.scrollTo(0, 0);
        console.log('aqui no final');
      }}
    >
      <motion.div
        key={asPath}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`content ${(pathname !== '/' && 'subpage') || ''}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionPage;
