import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import toast from 'react-hot-toast';

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
};

function EditProductModal({ isOpen, onClose, product, onUpdate }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    imageurl: '',
  });
  const [loading, setLoading] = useState(false);

  // Sync product data when modal opens or product changes
   useEffect(() => {
 
    if (product && typeof product === 'object') {
      setFormData({
        name: product.name || '',
        price: product.price || '',
        imageurl: product.imageurl || '',
      });
    }
  }, [product]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(`/api/product/update/${product._id}`, formData);
      toast.success('Product updated successfully');
      onUpdate(res.data.data);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            className="w-full max-w-md bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-2xl border border-zinc-200 dark:border-slate-700"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-zinc-800 dark:text-white">
                Edit Product
              </h3>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition"
              >
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">
                  Product Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInput}
                  type="text"
                  className="w-full px-4 py-2 mt-1 rounded-xl bg-white dark:bg-slate-800 border border-zinc-300 dark:border-slate-600 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">
                  Price ($)
                </label>
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleInput}
                  type="number"
                  className="w-full px-4 py-2 mt-1 rounded-xl bg-white dark:bg-slate-800 border border-zinc-300 dark:border-slate-600 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 dark:text-slate-300">
                  Image URL
                </label>
                <input
                  name="imageurl"
                  value={formData.imageurl}
                  onChange={handleInput}
                  type="url"
                  className="w-full px-4 py-2 mt-1 rounded-xl bg-white dark:bg-slate-800 border border-zinc-300 dark:border-slate-600 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold transition"
              >
                {loading ? 'Updating...' : 'Save Changes'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EditProductModal;
