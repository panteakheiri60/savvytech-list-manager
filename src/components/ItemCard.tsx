import { motion } from "framer-motion";
import type { Item } from "../types/item";
import { formatRelativeTime } from "../helpers/formatRelativeTime";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

interface ItemCardProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  isHighlighted: boolean;
  titleColor?: string; 
}

export default function ItemCard({ item, onEdit, onDelete, isHighlighted, titleColor }: ItemCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.25 }}
      className={`bg-white px-8 py-4 flex justify-between items-start rounded-lg transition-colors duration-5000 ${
        isHighlighted ? "!bg-purple-100" : "bg-white"
      }`}
    >
      <div className="max-w-[200px] md:max-w-[400px]">
        <p
          className="font-semibold text-[20px] truncate"
          title={item.title}
          style={{
            background: `linear-gradient(to right, ${titleColor}, ${titleColor})`,
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {item.title}
        </p>
        <p
          className="text-gray-500 text-sm truncate mt-1"
          title={item.subtitle}
        >
          {item.subtitle}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          {formatRelativeTime(item.createdAt)}
        </p>
      </div>
      <div className="flex gap-3">
        <div onClick={() => onEdit(item)} className="text-gray-600 hover:text-gray-800">
          <FiEdit className="w-5 h-5" />
        </div>
        <div onClick={() => onDelete(item.id)} className="text-red-600 hover:text-red-800">
          <RiDeleteBin6Line className="w-5 h-5" />
        </div>
      </div>
    </motion.div>
  );
}



