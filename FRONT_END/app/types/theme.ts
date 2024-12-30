// types/theme.ts

export interface UseThemeProps {
    themes: string[]; // Liste des thèmes disponibles
    forcedTheme?: string; // Thème forcé
    setTheme: (theme: string) => void; // Fonction pour changer le thème
    theme?: string; // Thème actif
    resolvedTheme?: string; // Thème résolu
    systemTheme?: 'dark' | 'light'; // Thème système
}

export interface ThemeProviderProps {
    themes?: string[]; // Liste des thèmes
    forcedTheme?: string; // Thème forcé
    enableSystem?: boolean; // Système de thème
    disableTransitionOnChange?: boolean; // Transition lors du changement de thème
    defaultTheme?: string; // Thème par défaut
    attribute?: string | 'class'; // Attribut HTML modifié
    children?: React.ReactNode; // Enfants
}