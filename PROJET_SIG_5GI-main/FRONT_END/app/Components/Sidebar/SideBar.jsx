"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser, FaSignOutAlt } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch, BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

// Routes de navigation
const routes = [
  { path: "/scrutateur", name: "Dashboard", icon: <FaHome /> },
  { path: "/profile", name: "Profile", icon: <FaUser /> },
  { path: "/logout", name: "Logout", icon: <FaSignOutAlt /> },

];

const SideBar = ({ children }) => {

  const [theme, setTheme] = useState("light"); // État pour le thème (clair ou sombre)
  //const pathname = usePathname();

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  // Classe dynamique pour le style du Sidebar
  const sidebarClass = theme === "light" ? "sidebar-dark" : "sidebar-light";

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const pathname = usePathname(); // Hook pour récupérer l'URL actuelle

  const inputAnimation = {
    hidden: { width: 0, padding: 0, transition: { duration: 0.2 } },
    show: { width: "140px", padding: "5px 15px", transition: { duration: 0.2 } },
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: { duration: 0.5, type: "spring", damping: 10 },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  DoSomeCoding
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          {/* Barre de recherche */}
          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}

          {/* Navigation */}
          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }

              return (
                <Link href={route.path} key={index} passHref>
                  <div
                    className={`link ${pathname === route.path ? "active" : ""}`}
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Link>
              );
            })}
          </section>
        </motion.div>

        {/* Contenu principal */}
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
