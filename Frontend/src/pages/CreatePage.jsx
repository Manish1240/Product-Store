import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from 'react-icons/io';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function CreatePage() {
  const [FormData, setFormData] = useState({
    name: '',
    price: '',
    imageurl: '',
  });

  const FormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/product/create', FormData);
      setFormData({
        name: '',
        price: '',
        imageurl: '',
      });

      toast.success('🎉 Product added successfully!');
    } catch (error) {
      console.error(error);
      toast.error('❌ Failed to add product. Check console.');
    }
  };

  const InputHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-white to-zinc-100 dark:from-slate-900 dark:to-slate-800 px-4 transition-colors duration-500 font-[Inter]">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-zinc-200 dark:border-slate-700 shadow-xl rounded-2xl p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-zinc-800 dark:text-white">
            Add New Product
          </h2>
          <Link to="/" title="Cancel">
            <IoMdCloseCircleOutline className="text-2xl text-zinc-400 dark:text-slate-300 hover:text-zinc-600 dark:hover:text-slate-100 transition" />
          </Link>
        </div>

        <form onSubmit={FormHandler} className="flex flex-col gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-slate-300">
              Product Name
            </label>
            <input
              name="name"
              onChange={InputHandler}
              value={FormData.name}
              type="text"
              placeholder="Enter product name"
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-zinc-800 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-slate-300">
              Product Price ($)
            </label>
            <input
              name="price"
              onChange={InputHandler}
              value={FormData.price}
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-zinc-800 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-zinc-700 dark:text-slate-300">
              Product Image URL
            </label>
            <input
              name="imageurl"
              onChange={InputHandler}
              value={FormData.imageurl}
              type="url"
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 rounded-xl border border-zinc-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-zinc-800 dark:text-white focus:ring-2 focus:ring-indigo-400 dark:focus:ring-emerald-400 outline-none transition"
            />
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold transition duration-300"
          >
            <IoMdAddCircleOutline className="text-xl" />
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePage;
