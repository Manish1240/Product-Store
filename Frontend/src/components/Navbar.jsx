import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaBoxOpen } from 'react-icons/fa';
import { IoSunnySharp } from 'react-icons/io5';
import { CiCirclePlus } from 'react-icons/ci';
import { FiMoon } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const [circleVisible, setCircleVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const themeTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (themeTimeout.current) clearTimeout(themeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleThemeToggle = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setCoords({ x, y });
    setCircleVisible(true);

    themeTimeout.current = setTimeout(() => {
      setDarkMode((prev) => !prev);
      setCircleVisible(false);
    }, 600);
  };

  return (
    <>
      <div className="w-full fixed z-[1000] h-16 px-6 md:px-10 shadow-md bg-gradient-to-r from-white to-zinc-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-500 flex items-center justify-between font-[Inter]">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="text-lg md:text-2xl font-semibold text-slate-800 dark:text-white flex items-center gap-2"
        >
          Product Store <FaShoppingCart className="text-indigo-500 dark:text-emerald-400" />
        </motion.h1>

        <div className="flex items-center gap-4 text-slate-700 dark:text-slate-200">
          {/* Products Link */}
          <Link to="/products">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-1 text-sm md:text-base px-2 py-1 font-medium rounded-lg hover:bg-indigo-100 dark:hover:bg-slate-700 transition-all"
              aria-label="View Products"
            >
              <FaBoxOpen className="text-lg text-indigo-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Products</span>
            </motion.button>
          </Link>

          {/* Create Product Link */}
          <Link to="/create">
            <motion.button
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.1 }}
              className="text-2xl transition-colors duration-300 hover:text-indigo-600 dark:hover:text-emerald-400"
              aria-label="Add Product"
            >
              <CiCirclePlus />
            </motion.button>
          </Link>

          {/* Theme Toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleThemeToggle}
            className="relative z-20 text-xl transition-colors duration-300 hover:text-indigo-600 dark:hover:text-yellow-300"
            aria-label="Toggle Theme"
          >
            {darkMode ? <IoSunnySharp /> : <FiMoon />}
          </motion.button>
        </div>
      </div>

      {/* Theme Switch Overlay Animation */}
      <AnimatePresence>
        {circleVisible && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
            initial={{ clipPath: `circle(0px at ${coords.x}px ${coords.y}px)` }}
            animate={{ clipPath: `circle(150% at ${coords.x}px ${coords.y}px)` }}
            exit={{ clipPath: `circle(0px at ${coords.x}px ${coords.y}px)` }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            style={{
              backgroundColor: darkMode ? '#f4f4f5' : '#0f172a'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
