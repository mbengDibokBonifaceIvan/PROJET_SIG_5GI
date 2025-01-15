"use client";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";

import UserProfile from "./UserProfile";

const Profile = () => {
    return (
        <div className="flex">
            <Sidebar />
            <UserProfile />
            <Footer/>
        </div>
    );
};

export default Profile;
