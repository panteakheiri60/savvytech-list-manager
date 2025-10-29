import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

interface ToastProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Toast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`fixed top-4 right-4 px-4 py-4 rounded shadow-lg bg-white z-50
          ${type === "success" ? "text-green-500" : "text-red-500"}`}
      >
        <div className="flex gap-2 items-center">
        {type === "success" ? <IoCheckmarkDoneCircleOutline className="w-6 h-6" /> : <MdErrorOutline className="w-6 h-6"/>}
        {message}
        </div>
       
      </motion.div>
    </AnimatePresence>
  );
}

