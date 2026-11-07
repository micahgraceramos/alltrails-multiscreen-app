import { createContext, useContext, useState, type ReactNode } from "react";

type SavedValue = {
  savedIds: string[];
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const SavedContext = createContext<SavedValue | undefined>(undefined);

const STARTING_SAVED = [
  "parker-ridge",
  "kicking-horse",
  "little-arethusa",
  "wilcox-pass",
  "tent-ridge",
];

export const SavedProvider = ({ children }: { children: ReactNode }) => {
  const [savedIds, setSavedIds] = useState<string[]>(STARTING_SAVED);

  const isSaved = (id: string) => savedIds.includes(id);

  const toggleSaved = (id: string) => {
    if (savedIds.includes(id)) {
      setSavedIds(savedIds.filter((savedId) => savedId !== id));
    } else {
      setSavedIds([...savedIds, id]);
    }
  };

  return (
    <SavedContext.Provider value={{ savedIds, isSaved, toggleSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSaved = () => {
  const value = useContext(SavedContext);
  if (value === undefined) {
    throw new Error("useSaved must be used inside a SavedProvider");
  }
  return value;
};
