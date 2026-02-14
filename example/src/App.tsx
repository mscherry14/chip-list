import type { ChipData } from "chip-list"
import { ChipList } from "chip-list";
import './App.css';

function App() {
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

  return (
    <>
      <ChipList items={items} chipStyle={{color: "accent", variant: 'outlined'}} />
    </>
  );
}

export default App;
