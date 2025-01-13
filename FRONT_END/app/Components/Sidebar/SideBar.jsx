"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaHome, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { lusitana } from "../lib/fonts";

// Routes de navigation
const routes = [
  { path: "/scrutateur", name: "Dashboard", icon: <FaHome /> },
  { path: "/profile", name: "Profile", icon: <FaUser /> },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // État pour la confirmation de déconnexion
  const pathname = usePathname(); // Hook pour récupérer l'URL actuelle

  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: { width: 0, padding: 0, transition: { duration: 0.2 } },
    show: { width: "140px", padding: "5px 15px", transition: { duration: 0.2 } },
  };

  const showAnimation = {
    hidden: { width: 0, opacity: 0, transition: { duration: 0.5 } },
    show: { opacity: 1, width: "auto", transition: { duration: 0.5 } },
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      // Si l'utilisateur confirme, on redirige vers la page d'accueil
      window.location.href = "http://localhost:3000"; // Redirection vers la page d'accueil
    }
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",
            transition: { duration: 0.5, type: "spring", damping: 10 },
          }}
          className={`sidebar`}
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
                 <div>
                    {" "}
                    <p className={`${lusitana.className} text-2xl`}>
                      ELECAM-RESULTS.COM
                    </p>{" "}
                  </div>
                </motion.h1>
              )}
            </AnimatePresence>
            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

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

            {/* Déconnexion */}
            <div className="link" onClick={handleLogout}>
              <div className="icon">
                <FaSignOutAlt />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="link_text"
                  >
                    Déconnexion
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </section>
        </motion.div>

        {/* Contenu principal */}
        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
