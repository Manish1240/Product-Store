import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';

const DeletePage = ({ isOpen, onClose, product, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/product/delete/${product._id}`);
      onDelete(product._id); // Update frontend state
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Failed to delete product');
      console.error('Delete Error:', error);
    } finally {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 z-50 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-[90%] max-w-md p-6 text-center space-y-6 border border-zinc-200 dark:border-slate-700 font-[Inter]"
          >
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-white">
              Are you sure?
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Do you really want to delete <span className="font-medium text-red-600 dark:text-red-400">{product?.name}</span>? This action cannot be undone.
            </p>

            <div className="flex justify-center gap-4 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-zinc-200 dark:bg-slate-700 text-zinc-800 dark:text-white hover:bg-zinc-300 dark:hover:bg-slate-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeletePage;
