import React from 'react'

const MenuToggle = ({ navOpen, setNavOpen }) => {

    const toggleMenu = () => {
        setNavOpen(!navOpen);  // Inverse la valeur de navOpen
      };
  return (
    <label>
    <div
      className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center"
    >
      <input className="hidden peer" type="checkbox" checked={navOpen}  onClick={toggleMenu}/>
      <div
        className="w-[50%] h-[2px] bg-black dark:bg-slate-100 rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]"
      ></div>
      <div
        className="w-[50%] h-[2px] bg-black dark:bg-slate-100 rounded-md transition-all duration-300 origin-center peer-checked:hidden"
      ></div>
      <div
        className="w-[50%] h-[2px] bg-black dark:bg-slate-100 rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]"
      ></div>
    </div>
  </label>
  )
}

export default MenuToggle