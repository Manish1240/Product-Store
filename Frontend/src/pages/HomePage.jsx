import React from 'react';

function Homepage() {
  return (
    <div
      className="bg-gradient-to-br from-white to-zinc-100 dark:from-slate-900 dark:to-slate-800 px-4 py-6 transition-colors duration-500 flex items-center justify-center font-[Inter]"
      style={{ minHeight: 'calc(100vh - 64px)' }} // 64px = navbar height
    >
      <div className="w-full max-w-md bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-zinc-200 dark:border-slate-700 shadow-xl rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-zinc-800 dark:text-white">
          Welcome to Product Store
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-slate-300">
          This is your homepage — consistent with the app’s premium theme.
        </p>
      </div>
    </div>
  );
}

export default Homepage;
