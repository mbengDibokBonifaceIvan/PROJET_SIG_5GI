"use client";
import { Button } from "@/components/ui/button";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";

const Logout = ({ onConfirm, onCancel }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full ml-2">
                {/* Navbar */}
                <Navbar />
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">Logout Confirmation</h2>
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="destructive" onClick={onConfirm}>
                    Yes, Logout
                </Button>
            </div>
        </div>
        </div>
    </div>
    );
};

export default Logout;
