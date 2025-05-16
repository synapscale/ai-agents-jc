import React, { createContext, useContext } from 'react';

const CodeTemplateContext = createContext({});

export const CodeTemplateProvider = ({ children }: { children: React.ReactNode }) => (
  <CodeTemplateContext.Provider value={{}}>
    {children}
  </CodeTemplateContext.Provider>
);

export const useCodeTemplates = () => useContext(CodeTemplateContext);
