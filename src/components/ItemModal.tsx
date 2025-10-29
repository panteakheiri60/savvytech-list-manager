import { useEffect, useRef, useState } from "react";
import type { Item } from "../types/item";

interface Props {
  onClose: () => void;
  onSubmit: (title: string, subtitle: string) => Promise<void>;
  defaultValues?: Item | null;
}

export default function ItemModal({ onClose, onSubmit, defaultValues }: Props) {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [errors, setErrors] = useState<{ title?: string; subtitle?: string }>({});
  const [loading, setLoading] = useState(false);

  const backdropRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (defaultValues) {
      setTitle(defaultValues.title);
      setSubtitle(defaultValues.subtitle);
    } else {
      setTitle("");
      setSubtitle("");
    }

    setTimeout(() => titleRef.current?.focus(), 10);
  }, [defaultValues]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required.";
    else if (title.trim().length < 3) newErrors.title = "Title must be at least 3 characters.";

    if (!subtitle.trim()) newErrors.subtitle = "Subtitle is required.";
    else if (subtitle.trim().length < 5) newErrors.subtitle = "Subtitle must be at least 5 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit(title.trim(), subtitle.trim());
      onClose();
    } catch (err) {
      setErrors({ ...errors, title: errors.title, subtitle: errors.subtitle });
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdropRef.current) onClose();
  };

  return (
    <div
      ref={backdropRef}
      onMouseDown={handleBackdropClick}
      className="fixed inset-0 bg-black/40 flex  items-center justify-center z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-xl md:w-[40%] w-[80%]"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4">
          {defaultValues ? "Edit Item" : "Create Item"}
        </h2>

    
        <div className="mb-3">
          <input
            ref={titleRef}
            type="text"
            placeholder="Title"
            className={`border rounded-md w-full p-2 ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-invalid={!!errors.title}
            aria-describedby="title-error"
          />
          {errors.title && (
            <p id="title-error" className="text-red-500 text-sm mt-1">
              {errors.title}
            </p>
          )}
        </div>

  
        <div className="mb-3">
          <textarea
            
            placeholder="Subtitle"
            className={`border rounded-md w-full resize-none p-2 ${
              errors.subtitle ? "border-red-500" : "border-gray-300"
            }`}
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            aria-invalid={!!errors.subtitle}
            aria-describedby="subtitle-error"
          />
          {errors.subtitle && (
            <p id="subtitle-error" className="text-red-500 text-sm mt-1">
              {errors.subtitle}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1 rounded-md   transition !bg-slate-300  hover:!border-slate-400 hover:!bg-slate-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`px-3 py-1 rounded-md shadow-md  transition ${
              loading ? "!bg-gray-300 cursor-wait" : " !bg-purple-400 hover:!bg-purple-500 hover:!border-purple-500 "
            }`}
            disabled={loading}
          >
            {loading ? (defaultValues ? "Updating..." : "Creating...") : defaultValues ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}



