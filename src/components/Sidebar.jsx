import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-[#111] border-r border-pink-500 p-4">
      <h2 className="text-xl font-bold mb-6 text-pink-400">Legal Assistant</h2>
      <ul className="space-y-4">
        <li className="hover:text-pink-300 cursor-pointer">Home</li>
        <li className="hover:text-pink-300 cursor-pointer">Notes</li>
        <li className="hover:text-pink-300 cursor-pointer">Q/A</li>
        <li className="hover:text-pink-300 cursor-pointer">Summarizer</li>
      </ul>
    </div>
  );
};

export default Sidebar;
