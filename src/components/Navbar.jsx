//import React from 'react'

const Navbar = () => {
  return (
    <nav className="flex justify-around bg-slate-700 text-white py-2">
        <div className="logo">
            <span className="font-bold text-xl mx-9">rTasks</span>
        </div>
      <ul className="flex gap-8 mx-9">
        <li className="cursor-pointer hover:text-red-400 ">Home</li>
        <li className="cursor-pointer hover:text-red-400 ">Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
