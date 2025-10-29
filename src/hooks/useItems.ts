import { useState, useEffect } from "react";
import type { Item } from "../types/item";

export function useItems() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setItems([]);
      setLoading(false);
    }, 700);
  }, []);

  const simulateDelay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const addItem = async (title: string, subtitle: string): Promise<Item> => {
    setLoading(true);
    await simulateDelay(400);
  
    const newItem: Item = {
      id: crypto.randomUUID(),
      title,
      subtitle,
      createdAt: new Date().toISOString(),
    };
  
    setItems((prev) => [...prev, newItem]);
    setLoading(false);
  
    return newItem;
  };
  

  const editItem = async (id: string, title: string, subtitle: string) => {
    setLoading(true);
    await simulateDelay(500);
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title, subtitle } : item
      )
    );
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    await simulateDelay(500);
    setItems((prev) => prev.filter((item) => item.id !== id));
    setLoading(false);
  };

  return { items, addItem, editItem, deleteItem, loading };
}


