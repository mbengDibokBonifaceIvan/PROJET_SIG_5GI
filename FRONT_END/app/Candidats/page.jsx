'use client';

import React, { useState, useEffect } from "react";
import { PlusCircle, Pencil, Trash2, User } from "lucide-react";
import SideBar from "../Components/Sidebar1/SideBar";
import Footer from "../Components/Footer/footer";

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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
          {candidat ? "Modifier" : "Ajouter"} un candidat
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Photo
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-gray-400" />
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
                className="block w-full text-sm text-gray-500 dark:text-gray-300
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  dark:file:bg-blue-900 dark:file:text-blue-200
                  hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
              />
            </div>
          </div>

          <div>
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600
                shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700
                dark:text-white sm:text-sm"
              required
            />
          </div>

          <div>
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
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600
                shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700
                dark:text-white sm:text-sm"
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200
                bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600
                rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-600
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600
                border border-transparent rounded-md shadow-sm hover:bg-blue-700
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {candidat ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const CandidatRow = ({ candidat, onEdit, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-10 h-10 flex-shrink-0">
            {candidat.photo ? (
              <img
                src={`http://localhost:8080/candidats/photo/${candidat.id_candidat}`}
                alt={candidat.nom_candidat}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-400" />
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
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900 dark:text-white">
          {candidat.parti_politique}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <button
          onClick={() => onEdit(candidat)}
          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-4"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(candidat.id_candidat)}
          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </td>
    </tr>
  );
};

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
      const data = await response.json();
      setCandidats(data);
    } catch (error) {
      console.error("Erreur lors du chargement des candidats:", error);
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

      if (response.ok) {
        await fetchCandidats();
        setIsModalOpen(false);
        setSelectedCandidat(null);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce candidat ?")) {
      try {
        await fetch(`http://localhost:8080/candidats/deleteCandidat/${id}`, {
          method: "DELETE",
        });
        await fetchCandidats();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    }
  };

    return (
      <SideBar>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
                  Candidats
                </h1>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  onClick={() => {
                    setSelectedCandidat(null);
                    setIsModalOpen(true);
                  }}
                  className="inline-flex items-center px-4 py-2 border border-transparent
                text-sm font-medium rounded-md shadow-sm text-white bg-blue-600
                hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
                focus:ring-blue-500"
                >
                  <PlusCircle className="w-5 h-5 mr-2" />
                  Ajouter un candidat
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Candidat
                          </th>
                          <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                            Parti politique
                          </th>
                          <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                        {candidats.map((candidat) => (
                          <CandidatRow
                            key={candidat.id_candidat}
                            candidat={candidat}
                            onEdit={() => {
                              setSelectedCandidat(candidat);
                              setIsModalOpen(true);
                            }}
                            onDelete={handleDelete}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
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
        </div>
        <Footer/>
      </SideBar>
    );
}
