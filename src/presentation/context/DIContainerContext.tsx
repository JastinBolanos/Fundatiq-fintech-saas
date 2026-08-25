import React, { createContext, useContext, ReactNode } from 'react';
import { DIContainer, appDIContainer } from '../../infrastructure/di/Container';

const DIContainerContext = createContext<DIContainer>(appDIContainer);

export interface DIContainerProviderProps {
  children: ReactNode;
  container?: DIContainer;
}

export const DIContainerProvider: React.FC<DIContainerProviderProps> = ({
  children,
  container = appDIContainer,
}) => {
  return (
    <DIContainerContext.Provider value={container}>
      {children}
    </DIContainerContext.Provider>
  );
};

export const useDIContainer = (): DIContainer => {
  const ctx = useContext(DIContainerContext);
  if (!ctx) {
    throw new Error('useDIContainer must be used within a DIContainerProvider');
  }
  return ctx;
};
