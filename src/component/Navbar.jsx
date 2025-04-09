import React from 'react';

const Nav = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // or use a router if using React Router
  };

  return (
    <div className="bg-zinc-600 flex justify-around h-14 items-center">
      {/* Logo */}
      <div className="tracking-widest">
        <span className="text-green-400 font-bold">&lt;</span>
        <span className="font-bold text-white text-lg">Pass</span>
        <span className="text-green-400 font-bold text-lg">OP/&gt;</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex gap-5 text-white">
        <li
          className="hover:text-green-300"
          onClick={(e) => {
            if (!isLoggedIn) {
              e.preventDefault();
              window.location.href = '/login';
            }
          }}
        >
          <a href="/">Home</a>
        </li>

        {!isLoggedIn ? (
          <>
            <button>
              <a href="/login" className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-300">
                Login
              </a>
            </button>
            <button>
              <a href="/signup" className="bg-green-500 px-5 py-2 rounded-full hover:bg-green-300">
                SignUp
              </a>
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-2 rounded-full hover:bg-red-400"
          >
            Logout
          </button>
        )}
      </ul>

      {/* GitHub Button */}
      <div className="flex gap-5 text-white">
        <div className="flex justify-center items-center text-white gap-3 w-24 bg-green-600 rounded-full ring-white ring-1">
          <img className="invert left-0" src="svg/git.svg" alt="" />
          <span className="pr-2"><a href="https://github.com/subhrat123/passOp">GitHub</a></span>
        </div>
      </div>
    </div>
  );
};

export default Nav;
