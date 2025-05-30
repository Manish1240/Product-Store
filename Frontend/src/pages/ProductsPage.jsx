import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import EditProductModal from './EditProductModal';
import DeleteProductModal from './DeletePage';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/product/all');
        setProducts(res.data.data);
        toast.success('Products loaded!', { duration: 2000 });
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsEditOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    );
  };

  const handleDeleteConfirmed = async (id) => {
    setProducts((prev) => prev.filter((product) => product._id !== id));
  };

  return (
    <div className="min-h-screen px-4  py-10 bg-gradient-to-br from-white to-zinc-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 font-[Inter]">
      <Toaster position="top-center" />

      <h1 className="text-3xl mt-15 font-bold text-center text-zinc-800 dark:text-white mb-10">
        Latest Products
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <motion.div
            className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>
      ) : products.length === 0 ? (
        <p className="text-center text-red-500 dark:text-red-400 font-semibold">
          No products found.
        </p>
      ) : (
        <AnimatePresence>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-slate-900 border border-zinc-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 relative"
              >
                <div className="overflow-hidden h-52">
                  <motion.img
                    src={product.imageurl}
                    alt={product.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/fallback.jpg';
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover transition-transform duration-500"
                  />
                </div>

                <div className="bg-zinc-100 dark:bg-slate-800 p-5 flex flex-col justify-between gap-3">
                  <h2 className="text-xl font-semibold text-zinc-800 dark:text-white">
                    {product.name}
                  </h2>
                  <p className="text-indigo-600 dark:text-emerald-400 font-bold text-lg">
                    ${product.price}
                  </p>

                  <div className="flex justify-end items-center gap-3 pt-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleEdit(product)}
                      className="p-2 rounded-full bg-indigo-100 dark:bg-slate-700 hover:bg-indigo-200 dark:hover:bg-slate-600 text-indigo-600 dark:text-emerald-400 transition"
                      title="Edit Product"
                    >
                      <FiEdit2 className="text-lg" />
                    </motion.button>

                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleDelete(product)}
                      className="p-2 rounded-full bg-red-100 dark:bg-slate-700 hover:bg-red-200 dark:hover:bg-slate-600 text-red-600 dark:text-red-400 transition"
                      title="Delete Product"
                    >
                      <FiTrash2 className="text-lg" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>
      )}

      {/* ✅ EDIT MODAL */}
      <AnimatePresence>
        {isEditOpen && (
          <EditProductModal
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            product={selectedProduct}
            onUpdate={handleUpdate}
          />
        )}
      </AnimatePresence>

      {/* ✅ DELETE MODAL */}
      <AnimatePresence>
        {isDeleteOpen && (
          <DeleteProductModal
            isOpen={isDeleteOpen}
            onClose={() => setIsDeleteOpen(false)}
            product={selectedProduct}
            onDelete={handleDeleteConfirmed}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductsPage;
