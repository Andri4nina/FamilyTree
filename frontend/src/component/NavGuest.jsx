import React, { useEffect, useRef } from "react";
import { BiPlus, BiUser, BiGroup, BiCog, BiLogOut } from "react-icons/bi";
import gsap from "gsap"; // Importer GSAP

const NavGuest =({ navOpen, setNavOpen })=> {
 // Références pour chaque élément du menu
 const menuItems = useRef([]);

 // Fonction pour ajouter les éléments à la référence
 const addToRefs = (el) => {
   if (el && !menuItems.current.includes(el)) {
     menuItems.current.push(el);
   }
 };

 useEffect(() => {
   if (!navOpen) {
     gsap.fromTo(
       menuItems.current,
       {
         opacity: 0,
         x: 200 // Commencer hors de l'écran, à droite (x: 200)
       },
       {
         opacity: 1,
         x: 0, // Animation vers la position d'origine
         stagger: 0.1, // Un léger délai entre chaque animation
         ease: "easeInOut", // Easing pour un mouvement plus doux
         duration: 0.6 // Durée de l'animation
       }
     );
   }
 }, [navOpen]); // L'animation se déclenche chaque fois que navOpen change

 return (
   <div className="relative flex flex-col items-center justify-center mr-2 h-full">
     {/* Menu Header */}
     <div
       className={`absolute top-4 left-1/2 -translate-x-1/2 transition-all duration-300 text-lg font-bold ${
         navOpen ? "opacity-100" : "opacity-0"
       }`}
     >
       MENUX
     </div>

     {/* Menu Options */}
     <ul className="ml-2">
       <li
         className={`relative mb-5 cursor-pointer hover:scale-150  transition-all group ${
           navOpen
             ? "flex items-center space-x-2"
             : "flex justify-center items-center"
         }`}
         ref={addToRefs} // Ajouter la référence à cet élément
       >
         <BiPlus size={20} />
         <span
           className={`transition-all ${
             navOpen ? "w-full opacity-100" : "hidden"
           }`}
         >
           Ajouter un membre
         </span>

         <div
           className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
             navOpen ? "hidden" : "block"
           }`}
         >
           Ajouter un membre
         </div>
       </li>
       <li
         className={`relative mb-5 cursor-pointer hover:scale-150  transition-all group ${
           navOpen
             ? "flex items-center space-x-2"
             : "flex justify-center items-center"
         }`}
         ref={addToRefs} // Ajouter la référence à cet élément
       >
         <BiUser size={20} />
         <span
           className={`transition-all ${
             navOpen ? "w-full opacity-100" : "hidden"
           }`}
         >
           Gérer les utilisateurs
         </span>
         <div
           className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
             navOpen ? "hidden" : "block"
           }`}
         >
           Gérer les utilisateurs
         </div>
       </li>
       <li
         className={`relative mb-5 cursor-pointer hover:scale-150  transition-all group ${
           navOpen
             ? "flex items-center space-x-2"
             : "flex justify-center items-center"
         }`}
         ref={addToRefs} // Ajouter la référence à cet élément
       >
         <BiGroup size={20} />
         <span
           className={`transition-all ${
             navOpen ? "w-full opacity-100" : "hidden"
           }`}
         >
           Gérer les familles
         </span>
         <div
           className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
             navOpen ? "hidden" : "block"
           }`}
         >
           Gérer les familles
         </div>
       </li>
       <li
         className={`relative mb-5 cursor-pointer hover:scale-150  transition-all group ${
           navOpen
             ? "flex items-center space-x-2"
             : "flex justify-center items-center"
         }`}
         ref={addToRefs} // Ajouter la référence à cet élément
       >
         <BiCog size={20} />
         <span
           className={`transition-all ${
             navOpen ? "w-full opacity-100" : "hidden"
           }`}
         >
           Paramètres
         </span>
         <div
           className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
             navOpen ? "hidden" : "block"
           }`}
         >
           Paramètres
         </div>
       </li>
       <li
         className={`relative mb-5 cursor-pointer hover:scale-150  transition-all group ${
           navOpen
             ? "flex items-center space-x-2"
             : "flex justify-center items-center"
         }`}
         ref={addToRefs} // Ajouter la référence à cet élément
       >
         <BiLogOut size={20} />
         <span
           className={`transition-all ${
             navOpen ? "w-full opacity-100" : "hidden"
           }`}
         >
           Déconnexion
         </span>
         <div
           className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
             navOpen ? "hidden" : "block"
           }`}
         >
           Déconnexion
         </div>
       </li>
     </ul>
   </div>
  )
}

export default NavGuest