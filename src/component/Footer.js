import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-4">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm">
        <p>© {new Date().getFullYear()} My Reviewer. All rights reserved.</p>
        <p className="text-gray-400">For personal use.</p>
      </div>
    </footer>
  );
};

export default Footer;
