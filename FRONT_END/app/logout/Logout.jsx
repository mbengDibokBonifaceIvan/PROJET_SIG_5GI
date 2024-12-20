"use client";
import { Button } from "@/components/ui/button";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";
import {  useNavigate } from "react-router-dom";


 


const Logout = () => {
  const navigate = useNavigate();
  const onConfirm = () => {
    console.log("Confirmer");
    navigate("/");
  };

  const onCancel = () => {
    console.log("Annuler...");
    //navigate("/");
  };
    return (
      <div className="flex">
        {/** <Sidebar /> */}
        <div className="flex flex-col w-full ml-2">
          {/*  <Navbar /> */}

          <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-bold mb-4">
              Confirmer votre deconnexion
            </h2>
            <p className="mb-4">Voulez-vous vraiment vous deconnecter?</p>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={onCancel}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={onConfirm}>
                Valider
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Logout;
