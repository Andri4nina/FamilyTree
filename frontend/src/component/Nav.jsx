import React, { useState } from "react";
import NavAdmin from "./NavAdmin";
import MenuToggle from "./MenuToggle";
import NavGuest from "./NavGuest";
import { AuthStatus } from "../hook/useAuth";
import { useAuthCheck } from "../hook/useAuthCheck";
import UserContext from "../context/UserContext";

const Nav = ({ navOpen, setNavOpen }) => {
  const { userData, status } = useAuthCheck();  // Vérifie le statut de l'utilisateur

  return (
    <div
      className={`relative h-[95%] rounded-tl-[20px] rounded-bl-[20px] bg-slate-50 dark:bg-slate-950 transition-all duration-300 ${
        navOpen ? "w-[300px]" : "w-[50px]"
      }`}
    >
      <div className="mx-auto">
        {/* Passer navOpen et setNavOpen à MenuToggle */}
        <MenuToggle navOpen={navOpen} setNavOpen={setNavOpen} />
      </div>

      {/* Afficher NavAdmin ou NavGuest selon le statut de l'utilisateur */}
      {status === AuthStatus.Guest ? (
        <NavGuest navOpen={navOpen} setNavOpen={setNavOpen} />
      ) : (
        <UserContext.Provider value={userData}>
          <NavAdmin navOpen={navOpen} setNavOpen={setNavOpen} />
        </UserContext.Provider>
      )}
    </div>
  );
};

export default Nav;
