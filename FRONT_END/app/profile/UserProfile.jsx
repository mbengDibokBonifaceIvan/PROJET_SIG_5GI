"use client";

import { useState, useEffect } from "react";
import {
  FiUser,
  FiEdit2,
  FiMapPin,
  FiLock,
  FiSave,
  FiX,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import SideBar from "../Components/Sidebar1/SideBar";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `http://localhost:8080/utilisateurs/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setEditedUser(userData);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la récupération des données utilisateur",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setEditedUser(user);
    setIsEditing(false);
    setFeedback({ type: "", message: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/utilisateurs/editUser/${user.id_utilisateur}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setFeedback({
          type: "success",
          message: "Profil mis à jour avec succès",
        });
        setIsEditing(false);
      } else {
        setFeedback({
          type: "error",
          message: "Erreur lors de la mise à jour du profil",
        });
      }
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Erreur réseau lors de la mise à jour",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 min-h-screen bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* En-tête du profil */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                  <FiUser className="w-12 h-12 text-white" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-3xl font-bold text-white">
                    {user?.nomUtilisateur}
                  </h1>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                    <span className="text-white font-medium">{user?.role}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contenu principal */}
            <div className="p-8">
              {feedback.message && (
                <div
                  className={`mb-6 p-4 rounded-lg flex items-center ${
                    feedback.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}
                >
                  {feedback.type === "success" ? (
                    <FiSave className="w-5 h-5 mr-3" />
                  ) : (
                    <FiX className="w-5 h-5 mr-3" />
                  )}
                  {feedback.message}
                </div>
              )}

              <div className="space-y-8">
                {/* Section informations */}
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">
                      Informations personnelles
                    </h2>
                    {!isEditing ? (
                      <button
                        onClick={handleEdit}
                        className="flex items-center px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
                      >
                        <FiEdit2 className="w-4 h-4 mr-2" />
                        Modifier
                      </button>
                    ) : (
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSubmit}
                          disabled={isLoading}
                          className="flex items-center px-4 py-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                        >
                          <FiSave className="w-4 h-4 mr-2" />
                          Enregistrer
                        </button>
                        <button
                          onClick={handleCancel}
                          className="flex items-center px-4 py-2 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors"
                        >
                          <FiX className="w-4 h-4 mr-2" />
                          Annuler
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Nom d'utilisateur
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="nomUtilisateur"
                            value={editedUser?.nomUtilisateur || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                          />
                        ) : (
                          <p className="p-3 bg-white rounded-lg border border-gray-100 text-gray-800">
                            {user?.nomUtilisateur}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Rôle
                        </label>
                        <div className="p-3 bg-white rounded-lg border border-gray-100 text-gray-800">
                          {user?.role}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {user?.bureauVote && (
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">
                            Bureau de vote
                          </label>
                          <div className="p-3 bg-white rounded-lg border border-gray-100 text-gray-800 flex items-center">
                            <FiMapPin className="w-5 h-5 mr-2 text-indigo-500" />
                            {user.bureauVote.nom_bureau}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">
                          Mot de passe
                        </label>
                        {isEditing ? (
                          <input
                            type="password"
                            name="motDePasse"
                            value={editedUser?.motDePasse || ""}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                          />
                        ) : (
                          <div className="p-3 bg-white rounded-lg border border-gray-100 text-gray-800 flex items-center">
                            <FiLock className="w-5 h-5 mr-2 text-indigo-500" />
                            ••••••••
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
