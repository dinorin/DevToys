import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  theme: "light" | "dark";
  favorites: string[];
  recentTools: string[];
  toggleTheme: () => void;
  toggleFavorite: (id: string) => void;
  addRecent: (id: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set, get) => ({
      theme: "dark",
      favorites: [],
      recentTools: [],
      toggleTheme: () => {
        const next = get().theme === "dark" ? "light" : "dark";
        set({ theme: next });
        document.documentElement.setAttribute("data-theme", next);
      },
      toggleFavorite: (id) => {
        const favs = get().favorites;
        set({
          favorites: favs.includes(id)
            ? favs.filter((f) => f !== id)
            : [...favs, id],
        });
      },
      addRecent: (id) => {
        const recents = get().recentTools.filter((r) => r !== id);
        set({ recentTools: [id, ...recents].slice(0, 5) });
      },
    }),
    { name: "devtoys-settings" }
  )
);
