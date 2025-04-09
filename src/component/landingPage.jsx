import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";




const LandingPage = () => {
    const fullText = "Securely store, manage, and access your passwords with ease.";
    const [displayedText, setDisplayedText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const delay = deleting ? 50 : 100;
  
      const timeout = setTimeout(() => {
        if (!deleting) {
          setDisplayedText(fullText.slice(0, index + 1));
          setIndex(index + 1);
          if (index + 1 === fullText.length) {
            setTimeout(() => setDeleting(true), 1500); // pause before deleting
          }
        } else {
          setDisplayedText(fullText.slice(0, index - 1));
          setIndex(index - 1);
          if (index - 1 === 0) {
            setDeleting(false);
          }
        }
      }, delay);
  
      return () => clearTimeout(timeout);
    }, [index, deleting]);
  
  return (
    <div className="min-h-screen bg-zinc-900 text-white flex flex-col items-center justify-center px-4">
       
        <div className="mb-16 max-w-lg w-28">
        <img
          src="/lock.png"
          alt="Secure Vault"
          className="w-full max-h-[300px] object-contain opacity-90"
        />
         <div className="h-4 w-32 bg-zinc-700 rounded animate-pulse mb-2"></div>
         <div className="h-3 w-20 bg-zinc-700 rounded animate-pulse"></div>
      </div>
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 tracking-wide">
          <span className="text-green-400">&lt;</span>
          Pass<span className="text-green-400">OP/&gt;</span>
        </h1>
        <p className="text-lg text-zinc-300 mb-10">
      {displayedText}
      <span className="animate-pulse">|</span>
    </p>
        <div className="flex gap-6 justify-center">
          <Link to="/signup">
            <button className="bg-green-500 px-6 py-2 rounded-full text-black font-semibold hover:bg-green-400 transition">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="border border-green-400  px-6 py-2 rounded-full text-green-400 hover:bg-zinc-800 transition">
              Login
            </button>
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default LandingPage;
