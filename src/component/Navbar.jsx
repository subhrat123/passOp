import React from 'react'

const nav = () => {
  return (
    <div className=' bg-zinc-600 flex justify-around h-14 items-center'>
      <div className=' tracking-widest'>
        <span className='  text-green-400 font-bold'>&lt;</span>
        <span className=' font-bold text-white text-lg'>Pass</span>
        <span className=' text-green-400 font-bold text-lg'>OP/&gt;</span>
      </div>
      {/* <ul className=' flex gap-5 text-white'>
        <li>Home</li>
        <li>About</li>
        <li>Contact</li>
      </ul> */}
      <div className=' flex justify-center items-center text-white gap-3 w-24 bg-green-600 rounded-full ring-white ring-1'>
        <img className='invert left-0' src="svg/git.svg" alt="" />
        <span className=' pr-2'>GitHub </span>
      </div>
    </div>
  )
}

export default nav
