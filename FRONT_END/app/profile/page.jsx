"use client";
import Sidebar from "../Components/Sidebar/SideBar";

import UserProfile from "./UserProfile";

const Profile = () => {
    return (
        <div className="flex">
            <Sidebar />
           <UserProfile/>
        </div>
    );
};

export default Profile;
