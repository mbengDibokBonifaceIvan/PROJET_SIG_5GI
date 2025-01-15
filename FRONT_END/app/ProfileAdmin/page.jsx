"use client";

import Footer from "../Components/Footer/footer";
import SideBar from "../Components/Sidebar1/SideBar";
import AdminProfile from "./AdminProfile";

const ProfileAdmin = () => {
  return (
    <SideBar>
      <div className="flex">
        <AdminProfile />
      </div>
      <Footer/>
    </SideBar>
  );
};

export default ProfileAdmin;
