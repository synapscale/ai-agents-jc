import React, { createContext, useContext } from 'react';

const MarketplaceContext = createContext({});

export const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => (
  <MarketplaceContext.Provider value={{}}>
    {children}
  </MarketplaceContext.Provider>
);

export const useMarketplace = () => useContext(MarketplaceContext);
