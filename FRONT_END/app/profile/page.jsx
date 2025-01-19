"use client";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";

import UserProfile from "./UserProfile";

const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            {/* Header section */}
            <div className="py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Profil Scrutateur
                </h1>
              </div>
            </div>

            {/* Profile content */}
            <div className="px-4 sm:px-6 lg:px-8">
              <UserProfile />
            </div>
          </main>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
