import { useState } from "react";
import { useItems } from "./hooks/useItems";
import ItemList from "./components/ItemList";
import ItemModal from "./components/ItemModal";
import Toast from "./ui/Toast";
import type { Item } from "./types/item";

export default function App() {
  const { items, addItem, editItem, deleteItem, loading } = useItems();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);


  const [toast, setToast] = useState<{ message: string; type?: "success" | "error" } | null>(null);

  const handleCreate = () => {
    setSelectedItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  return (
    <div className="h-screen bg-white w-[100vw]  flex justify-center bg-cover">
      <div className="bg-white rounded-xl pb-8 w-full flex flex-col items-center ">
        <div className="sticky flex shadow-sm justify-center  top-0 w-full px-4 bg-white/80 border-b-[1px] border-gray-300 backdrop-blur-sm pt-8 pb-4">
          <div className="w-full md:w-[80%] lg:w-[60%] flex justify-between items-center">
            <p
              className="text-[26px] sm:text-[36px] md:text-[40px] font-bold mb-4 text-center
                         bg-gradient-to-r from-pink-500 to-purple-800
                         bg-clip-text text-transparent
                         drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]"
            >
              SavvyTech List Manager
            </p>

            <button
              onClick={handleCreate}
              className="shadow-md text-sm px-4 rounded-lg !bg-gray-300 hover:!bg-gray-400 hover:!border-gray-400 transition"
            >
              + Create
            </button>
          </div>
        </div>

     
        <div className="w-full md:w-[80%] lg:w-[60%] px-4">
          {loading ? (
            <p className="text-gray-500 mt-6 text-center">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-gray-400 mt-6 text-center">No items yet.</p>
          ) : (
            <ItemList
              items={items}
              onEdit={handleEdit}
              onDelete={deleteItem}
              setLastAddedId={setLastAddedId}
              lastAddedId={lastAddedId}
            />
          )}
        </div>

        {isModalOpen && (
          <ItemModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={async (title, subtitle) => {
              try {
                let newItem: Item;
                if (selectedItem) {
                  await editItem(selectedItem.id, title, subtitle);
                  showToast("Item updated successfully", "success"); 
                } else {
                  newItem = await addItem(title, subtitle);
                  setLastAddedId(newItem.id);
                  showToast("Item created successfully", "success");
                }
              } catch {
                showToast("Something went wrong", "error");
              } finally {
                setIsModalOpen(false);
              }
            }}
            defaultValues={selectedItem}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
}

