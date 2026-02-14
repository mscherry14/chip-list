import "./App.css";
import type { ChipData } from "./components/ChipList/ChipList.types";
import { ChipList } from "./components/ChipList/ChipList.tsx";
import { Chip } from "./components/Chip/Chip.tsx";
import { useState } from "react";

const items: ChipData[] = [
  { id: 1, label: "Chip 1" },
  { id: 2, label: "Chip 2" },
  { id: 3, label: "Chip 3" },
  { id: 4, label: "Chip 4" },
  { id: 5, label: "Chip 5" },
  { id: 6, label: "Chip 6" },
  { id: 7, label: "Chip 7" },
  { id: 8, label: "Chip 8" },
  { id: 9, label: "Chip 9" },
  { id: 10, label: "Chip 10" },
  { id: 11, label: "Chip 11" },
  { id: 12, label: "Chip 12" },
  { id: 13, label: "Chip 13" },
];

function App() {
  const [isOutlined, setIsOutlined] = useState<boolean>(false);
  const [isDark, setIsDark] = useState<boolean>(true);

  const setDarkTheme = () => {
    const root = document.documentElement;
    root.style.setProperty("--color-surface", "#242424");
    root.style.setProperty("--color-on-surface", "#fff");
  };

  const setLightTheme = () => {
    const root = document.documentElement;
    root.style.setProperty("--color-surface", "#fff");
    root.style.setProperty("--color-on-surface", "#000");
  };

  return (
    <div className={(isDark ? "dark" : "light") + " " + "root"}>
      <h1>Chip Components Showcase</h1>
      <Chip
        className="choice-chip"
        selected={isOutlined}
        onSelectChange={() => {
          setIsOutlined(!isOutlined);
        }}
        variant={isOutlined ? "outlined" : "filled"}
        color="warning"
        label={isOutlined ? "Outlined" : "Filled"}
      />
      <Chip
        className="choice-chip"
        selected={isDark}
        onSelectChange={() => {
          setIsDark(!isDark);
          if (isDark) setLightTheme();
          else setDarkTheme();
        }}
        variant={isOutlined ? "outlined" : "filled"}
        label={isDark ? "Dark theme" : "Light Theme"}
      />
      <ChipList
        items={items}
        chipStyle={{
          color: "accent",
          variant: isOutlined ? "outlined" : "filled",
        }}
      />
    </div>
  );
}

export default App;
