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
      }}
    >
      <motion.div
        key={asPath}
        initial={{ opacity: 0, translateY: 100 }}
        animate={{ opacity: 1, translateY: 1 }}
        transition={{ duration: 0.5 }}
        className={`content ${(pathname !== '/' && 'subpage') || ''}`}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default TransactionPage;
