"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, User } from "lucide-react";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";
import { Button } from "@/components/ui/button";

const CandidatModal = ({ isOpen, onClose, onSubmit, candidat }) => {
  const [formData, setFormData] = useState({
    nom_candidat: candidat?.nom_candidat || "",
    parti_politique: candidat?.parti_politique || "",
  });
  const [imagePreview, setImagePreview] = useState(
    candidat?.photo
      ? `http://localhost:8080/candidats/photo/${candidat.id_candidat}`
      : null
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("nom_candidat", formData.nom_candidat);
    data.append("parti_politique", formData.parti_politique);
    if (e.target.photo.files[0]) {
      data.append("photo", e.target.photo.files[0]);
    }
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          {candidat ? "Modifier" : "Ajouter"} un candidat
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Photo
            </label>
            <div className="flex items-center space-x-6">
              <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImagePreview(URL.createObjectURL(file));
                  }
                }}
                className="flex-1 block text-sm text-gray-500 dark:text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  dark:file:bg-blue-900 dark:file:text-blue-200
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Nom du candidat
            </label>
            <input
              type="text"
              name="nom_candidat"
              value={formData.nom_candidat}
              onChange={(e) =>
                setFormData({ ...formData, nom_candidat: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 dark:border-gray-600
                shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700
                dark:text-white text-sm p-3"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Parti politique
            </label>
            <input
              type="text"
              name="parti_politique"
              value={formData.parti_politique}
              onChange={(e) =>
                setFormData({ ...formData, parti_politique: e.target.value })
              }
              className="w-full rounded-lg border-gray-300 dark:border-gray-600
                shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700
                dark:text-white text-sm p-3"
              required
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="px-6 py-2 text-sm font-medium"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="px-6 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700"
            >
              {candidat ? "Modifier" : "Ajouter"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CandidatRow = ({ candidat, onEdit, onDelete }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="h-12 w-12 flex-shrink-0">
          {candidat.photo ? (
            <img
              src={`http://localhost:8080/candidats/photo/${candidat.id_candidat}`}
              alt={candidat.nom_candidat}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-400" />
            </div>
          )}
        </div>
        <div className="ml-4">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {candidat.nom_candidat}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4">
      <div className="text-sm text-gray-900 dark:text-white">
        {candidat.parti_politique}
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="flex justify-end space-x-3">
        <Button
          onClick={() => onEdit(candidat)}
          variant="outline"
          size="sm"
          className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          onClick={() => onDelete(candidat.id_candidat)}
          variant="outline"
          size="sm"
          className="text-red-600 hover:text-red-700 dark:text-red-400"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </td>
  </tr>
);

export default function Candidats() {
  const [candidats, setCandidats] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidat, setSelectedCandidat] = useState(null);

  useEffect(() => {
    fetchCandidats();
  }, []);

  const fetchCandidats = async () => {
    try {
      const response = await fetch("http://localhost:8080/candidats/all");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCandidats(data);
    } catch (error) {
      console.error("Erreur lors du chargement des candidats:", error);
      // You might want to add error state handling here
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const url = selectedCandidat
        ? `http://localhost:8080/candidats/editCandidat/${selectedCandidat.id_candidat}`
        : "http://localhost:8080/candidats/addCandidat";

      const response = await fetch(url, {
        method: selectedCandidat ? "PUT" : "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      await fetchCandidats();
      setIsModalOpen(false);
      setSelectedCandidat(null);
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      // You might want to add error state handling here
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/candidats/deleteCandidat/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        await fetchCandidats();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        // You might want to add error state handling here
      }
    }
  };

  const handleEdit = (candidat) => {
    setSelectedCandidat(candidat);
    setIsModalOpen(true);
  };

  return (
    <SideBar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Candidats
                </h1>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Gérez la liste des candidats et leurs informations
                </p>
              </div>
              <Button
                onClick={() => {
                  setSelectedCandidat(null);
                  setIsModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <PlusCircle className="h-5 w-5" />
                <span>Ajouter un candidat</span>
              </Button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-gray-700/50">
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Candidat
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        Parti politique
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {candidats.map((candidat) => (
                      <CandidatRow
                        key={candidat.id_candidat}
                        candidat={candidat}
                        onEdit={() => handleEdit(candidat)}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <CandidatModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCandidat(null);
          }}
          onSubmit={handleSubmit}
          candidat={selectedCandidat}
        />
        <Footer />
      </div>
    </SideBar>
  );
}
