"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: "JohnDoe",
        email: "john.doe@example.com",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full ml-2">
                {/* Navbar */}
                <Navbar />
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">User Profile</h2>
            <div className="flex flex-col gap-4">
                {/* Username */}
                <div>
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        className="border p-2 rounded w-full"
                    />
                </div>

                {/* Save Button */}
                <Button onClick={() => alert("Profile updated successfully!")}>
                    Save Changes
                </Button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Profile;
