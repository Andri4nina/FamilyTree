import React, { useEffect, useRef } from "react";
import { BiLogIn } from "react-icons/bi";
import gsap from "gsap"; // Importer GSAP
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import authService ,{ login } from "../service/AuthService";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Initialiser SweetAlert avec React
const MySwal = withReactContent(Swal);

const NavGuest = ({ navOpen, setNavOpen }) => {
  // Références pour chaque élément du menu
  const menuItems = useRef([]);
  const navigate = useNavigate();

  // Fonction pour ajouter les éléments à la référence
  const addToRefs = (el) => {
    if (el && !menuItems.current.includes(el)) {
      menuItems.current.push(el);
    }
  };

  // Animation avec GSAP
  useEffect(() => {
    if (!navOpen) {
      gsap.fromTo(
        menuItems.current,
        {
          opacity: 0,
          x: 200, // Commencer hors de l'écran, à droite (x: 200)
        },
        {
          opacity: 1,
          x: 0, // Animation vers la position d'origine
          stagger: 0.1, // Un léger délai entre chaque animation
          ease: "easeInOut", // Easing pour un mouvement plus doux
          duration: 0.6, // Durée de l'animation
        }
      );
    }
  }, [navOpen]); // L'animation se déclenche chaque fois que navOpen change

  // Fonction pour afficher la boîte de dialogue de connexion
  const handleLoginClick = async () => {
    try {
      const result = await MySwal.fire({
        title: "Connexion",
        html: `
          <div class="flex flex-col space-y-4">
            <input
              type="email"
              id="email"
              class="swal2-input"
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              class="swal2-input"
              placeholder="Mot de passe"
            />
          </div>
        `,
        showCancelButton: true,
        confirmButtonText: "Se connecter",
        cancelButtonText: "Annuler",
        preConfirm: () => {
          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;
  
          if (!email || !password) {
            Swal.showValidationMessage("Veuillez remplir tous les champs.");
            return false;
          }
  
          return { email, password };
        },
      });
  
      if (result.isConfirmed) {
        const { email, password } = result.value;
        const credential = { email, password };
  
        // Appel au service de connexion
        const data = await authService.DoLogin(credential);
        const token = data.data.access_token;
        // Enregistre le token dans un cookie pour maintenir l'utilisateur connecté pendant 100 jours.
        Cookies.set("token", token, { expires: 100 });
        // Met à jour l'état de connexion dans l'application avec le jeton.
        login(token);
  
        // Redirige l'utilisateur vers la page d'accueil après une connexion réussie.
        navigate("/");
        
       
        // Vérification de la réponse et affichage des toasts
        if (data.data.access_token) {
          Swal.fire({
            toast: true,
            icon: "success",
            title: "Connexion réussie",
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
  
          // Redirection ou autre action après connexion
        } else {
          Swal.fire({
            toast: true,
            icon: "error",
            title: data.message || "Connexion échouée",
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        toast: true,
        icon: "error",
        title: "Une erreur est survenue",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      console.error(error);
    }
  };
  
  return (
    <div className="relative flex flex-col items-center justify-center mr-2 h-full">
      {/* Menu Header */}
      <div
        className={`absolute top-4 left-1/2 -translate-x-1/2 transition-all duration-300 text-lg font-bold ${
          navOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        MENU
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
          onClick={handleLoginClick} // Ajouter l'événement au clic
        >
          <BiLogIn size={20} />
          <span
            className={`transition-all ${
              navOpen ? "w-full opacity-100" : "hidden"
            }`}
          >
            Se connecter
          </span>
          <div
            className={`absolute w-[150px] text-xs opacity-0 group-hover:opacity-100 group-hover:-translate-x-[75px] transition duration-150 ${
              navOpen ? "hidden" : "block"
            }`}
          >
            Se connecter
          </div>
        </li>
      </ul>
    </div>
  );
};

export default NavGuest;
