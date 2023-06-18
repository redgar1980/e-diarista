import { createContext } from "react";

export const ExternalServiceContext = createContext({});

export const ExternalServiceProvider = () => {
  return (
    <ExternalServiceContext.Provider
      value={{}}
    ></ExternalServiceContext.Provider>
  );
};
