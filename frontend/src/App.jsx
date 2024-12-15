import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useAuthCheck } from "./hook/useAuthCheck";
import Nav from "./component/Nav";
import IndexPage from "./page/IndexPage";
import Loader from "./component/Loader";
import { AuthStatus } from "./hook/useAuth";
import userService from "./service/UserService";


function App() {
  const { userData, status } = useAuthCheck();
  const [loading, setLoading] = useState(true);
  const [adminCreated, setAdminCreated] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  const [navOpen, setNavOpen] = useState(false);

  const [login, setLogin] = useState(false);
  const [isLogged, setIsLogged] = useState(true);

  const menuRef = useRef(null); // Référence pour le menu

  // Fermer le menu si un clic en dehors du menu est détecté
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavOpen(false); // Fermer le menu si clic à l'extérieur
      }
    };

    // Ajouter l'écouteur de clic
    document.addEventListener("mousedown", handleClickOutside);

    // Nettoyer l'écouteur quand le composant est démonté
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);

    // Gestion du mode sombre
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  

  useEffect(() => {
    const checkUserAndCreateAdmin = async () => {
      try {
        // Vérifier si l'utilisateur avec ID 1 existe
        const response = await userService.getUserById(1);
        if (response.data === "") {
            await userService.addAdminUsers();
        }else{
          setAdminCreated(true); 
        }
      } catch (error) {
        // Si l'utilisateur n'existe pas, nous allons créer un admin
        if (error.response && error.response.status === 404) {
          await userService.addAdminUsers();
          setAdminCreated(true); // Mettre à jour l'état pour indiquer que l'admin a été créé
        } else {
          console.error('Error fetching user:', error);
        }
      }
    };

    checkUserAndCreateAdmin();
  }, []);
  
  if (status === AuthStatus.Unknown) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-900">
        <Loader />
      </div>
    );
  }

  return (
    <section className="relative w-full h-screen bg-slate-100 dark:bg-slate-900 dark:text-slate-100 text-slate-900 transition-all duration-300">
      <div className="fixed top-0 right-1 h-screen flex justify-center items-center" ref={menuRef}>
        <Nav navOpen={navOpen} setNavOpen={setNavOpen} />
      </div>
      
      <IndexPage />
    </section>
  );
}

export default App;
