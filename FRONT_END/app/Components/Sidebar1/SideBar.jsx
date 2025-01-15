"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaBars, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { BiAnalyse, BiSearch, BiCog } from "react-icons/bi";
import { AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lusitana } from "../lib/fonts";

const routes = [
  {
    path: "/Administrateur",
    name: "Dashboard",
    icon: <FaHome />,
  },
  {
    path: "/Candidats",
    name: "Candidats",
    icon: <AiFillHeart />,
  },
  {
    path: "/Utilisateurs",
    name: "Utilisateurs",
    icon: <FaUser />,
  },
  {
    path: "/PV",
    name: "Procès Verbaux",
    icon: <BiSearch />,
  },
  {
    path: "/ProfileAdmin",
    name: "Profil",
    icon: <BiCog />,
  },
];

const SideBar = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleLogout = () => {
    if (window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?")) {
      localStorage.removeItem("userData");
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-screen">
      <motion.div
        animate={{
          width: isOpen ? "250px" : "60px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className="fixed left-0 top-0 h-screen bg-gray-800 text-white dark:bg-gray-900"
      >
        <div className="flex items-center justify-between p-4">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="overflow-hidden"
              >
                <p
                  className={`${lusitana.className} text-2xl text-white whitespace-nowrap`}
                >
                  ELECAM-RESULTS.COM
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="cursor-pointer text-xl">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <nav className="mt-8">
          {routes.map((route) => (
            <Link
              href={route.path}
              key={route.path}
              className={`flex items-center px-4 py-3 text-sm transition-colors duration-200 
                ${
                  pathname === route.path
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                }
              `}
            >
              <div className="text-xl">{route.icon}</div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="ml-4 whitespace-nowrap"
                  >
                    {route.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          ))}

          <div
            onClick={handleLogout}
            className="flex items-center px-4 py-3 text-sm cursor-pointer text-gray-300 hover:bg-gray-700 transition-colors duration-200"
          >
            <div className="text-xl">
              <FaSignOutAlt />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="ml-4 whitespace-nowrap"
                >
                  Déconnexion
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </motion.div>

      <main
        className="flex-1 ml-[60px] transition-all duration-500"
        style={{ marginLeft: isOpen ? "250px" : "60px" }}
      >
        {children}
      </main>
    </div>
  );
};

export default SideBar;
