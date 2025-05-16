import React, { createContext, useContext } from 'react';

const VariableContext = createContext({});

export const VariableProvider = ({ children }: { children: React.ReactNode }) => (
  <VariableContext.Provider value={{}}>
    {children}
  </VariableContext.Provider>
);

export const useVariables = () => useContext(VariableContext);
