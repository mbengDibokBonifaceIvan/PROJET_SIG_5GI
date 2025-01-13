"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";

const Profile = () => {
    const [profileData, setProfileData] = useState({
        username: "",
        password: "",
        role: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch("http://localhost:8080/utilisateurs/verify?name=JohnDoe&password=password123"); // Remplacez par les données d'identifiant réelles
                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await response.json();
                setProfileData({
                    username: "JohnDoe", // Exemple - remplacez par data reçue
                    password: "password123", // Exemple - remplacez par data reçue
                    role: data.role || "Scrutateur",
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`http://localhost:8080/utilisateurs/editUser/1`, { // Remplacez `1` par l'ID utilisateur réel
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: profileData.username,
                    password: profileData.password,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save changes");
            }
            alert("Profile updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full ml-2">
                {/* Navbar */}
                <Navbar />
                <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
                    <h2 className="text-xl font-bold mb-4">User Profile</h2>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className="text-red-500">{error}</p>
                    ) : (
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

                            {/* Password */}
                            <div>
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={profileData.password}
                                    onChange={handleChange}
                                    className="border p-2 rounded w-full"
                                />
                            </div>

                            {/* Role (Read-only) */}
                            <div>
                                <label className="block text-gray-700">Role</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={profileData.role}
                                    readOnly
                                    className="border p-2 rounded w-full bg-gray-100"
                                />
                            </div>

                            {/* Save Button */}
                            <Button onClick={handleSave}>
                                Save Changes
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
