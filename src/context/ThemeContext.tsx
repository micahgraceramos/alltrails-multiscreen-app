import { createContext, useContext, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";
import { DARK, LIGHT, ThemeColors } from "../constants/theme";

export type ThemeMode = "system" | "light" | "dark";

type ThemeValue = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
};

const ThemeContext = createContext<ThemeValue | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState<ThemeMode>("system");

  const isDark = mode === "system" ? systemScheme === "dark" : mode === "dark";
  const colors = isDark ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const value = useContext(ThemeContext);
  if (value === undefined) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return value;
};
