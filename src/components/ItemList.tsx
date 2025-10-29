import type { Item } from "../types/item";
import { AnimatePresence} from "framer-motion";
import ItemCard from "./ItemCard";
import { useEffect } from "react";

interface Props {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  lastAddedId: string | null;
  setLastAddedId: (id: string | null) => void;
}


export default function ItemList({ items, onEdit, onDelete ,lastAddedId,setLastAddedId }: Props) {

  useEffect(() => {
    if (lastAddedId) {
      const timer = setTimeout(() => setLastAddedId(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [lastAddedId, setLastAddedId]);
  

  
  return (
    <div className="mt-6 space-y-3 divide-gray-100 divide-y-2">
     <AnimatePresence>
      {[...items].reverse().map((item, index) => {
        const progress = index / (items.length - 1 || 1);

        const startPink = [255, 182, 193]; 
        const endPurple = [128, 0, 128];   
        const r = Math.round(startPink[0] + (endPurple[0] - startPink[0]) * progress);
        const g = Math.round(startPink[1] + (endPurple[1] - startPink[1]) * progress);
        const b = Math.round(startPink[2] + (endPurple[2] - startPink[2]) * progress);
        const gradientColor = `rgb(${r},${g},${b})`;

      return (
      <ItemCard
        key={item.id}
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
        isHighlighted={item.id === lastAddedId}
        titleColor={gradientColor} 
      />
        );
     })}
      </AnimatePresence>

    </div>
  );
}

