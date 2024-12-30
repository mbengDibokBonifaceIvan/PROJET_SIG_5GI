// Providers/ThemeProvider.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { GlobalContextProvider } from "@/app/context/globalContext";
import { UseThemeProps, ThemeProviderProps } from '../types/theme'; // Importez vos types

const ThemeContext = React.createContext<UseThemeProps | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, ...props }) => {
  const themeProps = useNextTheme(); // Obtenez les propriétés de thème

  return (
    <NextThemesProvider {...props}>
      <GlobalContextProvider>
        <ThemeContext.Provider value={themeProps}>
          {children}
        </ThemeContext.Provider>
      </GlobalContextProvider>
    </NextThemesProvider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};