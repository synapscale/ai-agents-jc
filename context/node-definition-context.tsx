import React, { createContext, useContext } from 'react';

const NodeDefinitionContext = createContext({});

export const NodeDefinitionProvider = ({ children }: { children: React.ReactNode }) => (
  <NodeDefinitionContext.Provider value={{}}>
    {children}
  </NodeDefinitionContext.Provider>
);

export const useNodeDefinitions = () => useContext(NodeDefinitionContext);
