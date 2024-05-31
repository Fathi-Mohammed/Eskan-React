import React, { createContext, useState } from 'react';

interface LanguageContextType {
  language: string;
  changeLanguage: (newLanguage: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [key, setKey] = useState(0);

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setKey((prevKey) => prevKey + 1);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      <div key={key}>{children}</div>
    </LanguageContext.Provider>
  );
};
