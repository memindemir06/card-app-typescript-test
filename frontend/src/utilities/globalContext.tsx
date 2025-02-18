import axios from "axios";
import { FC, ReactNode, createContext, useContext, useEffect, useState } from "react";
import { Entry, EntryContextType } from "../@types/context";

export const EntryContext = createContext<EntryContextType | null>(null);

export const EntryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<Entry[]>([]);

  const initState = async () => {
    const data = await axios.get<Entry[]>("http://localhost:3001/get/");
    const initialStateBody = data.data;
    setEntries(initialStateBody);
  };

  useEffect(() => {
    initState();
  }, []);

  const saveEntry = async (entry: Entry) => {
    const requestData = await axios.post<Entry>("http://localhost:3001/create/", entry);
    const newEntry = requestData.data;
    setEntries([...entries, newEntry]);
  };

  const updateEntry = async (id: string, entry: Entry) => {
    await axios.put<Entry>(`http://localhost:3001/update/${id}`, entry);
    setEntries((entries) => {
      const entryIndex = entries.findIndex((obj) => obj.id == id);
      entries[entryIndex] = entry;
      console.log(entries);
      return entries;
    });
  };
  const deleteEntry = async (id: string) => {
    await axios.delete<Entry>(`http://localhost:3001/delete/${id}`);
    setEntries((e) => e.filter((entry) => entry.id != id));
  };
  return (
    <EntryContext.Provider value={{ entries, saveEntry, updateEntry, deleteEntry }}>{children}</EntryContext.Provider>
  );
};

export const DarkModeContext = createContext({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const prefersDarkMode =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && !("isDarkMode" in localStorage);
  const savedIsDarkMode = localStorage.getItem("isDarkMode") === "true";
  const [isDarkMode, setIsDarkMode] = useState(savedIsDarkMode || prefersDarkMode);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</DarkModeContext.Provider>;
};

export const useDarkMode = () => useContext(DarkModeContext);
