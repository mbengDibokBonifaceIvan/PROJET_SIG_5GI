import React from "react";
import Card from "../Components/Card";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import ThemeDropdown from "../Components/ThemeDropdown/ThemeDropdown";

const Administrateur = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <SideBar />

        <div className="flex-1">
          {/* Header */}
          <div className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Dashboard Administrateur
            </h1>
            <ThemeDropdown />
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Welcome Message */}
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                BIENVENUE CHER ADMINISTRATEUR
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Veuillez charger les paramètres de l'application afin que les
                utilisateurs puissent voir les résultats. Merci!
              </p>
            </div>

            {/* Statistics Cards */}
            <Card />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Administrateur;
