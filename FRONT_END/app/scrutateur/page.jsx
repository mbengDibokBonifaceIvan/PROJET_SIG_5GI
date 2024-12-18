"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, EditIcon } from "../utils/Icons";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";

const API_URL = "http://localhost:8080/resultats/all";

const Scrutateur = () => {
    const [candidats, setCandidats] = useState([]);
    const [candidatsList, setCandidatsList] = useState([]);
    const [bureauxOptions, setBureauxOptions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        bureau: "",
        candidat: "",
        date: "",
        voix: "",
        annee: new Date().getFullYear(),
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchVotes();
        fetchCandidats();
        fetchBureaux();
    }, []);

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            annee: new Date().getFullYear(), // Initialise l'année avec l'année actuelle
        }));
    }, []);
    

    const fetchVotes = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                console.log("Données reçues du backend :", data);
                setCandidats(data);
            } else {
                console.error("Erreur de récupération des votes");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    const fetchBureaux = async () => {
        try {
            const response = await fetch("http://localhost:8080/bureaux-de-vote/all");
            if (response.ok) {
                const data = await response.json();
                setBureauxOptions(data); // data = [{id_bureau_vote: 1, nom_bureau: "Bureau A"}, ...]
            } else {
                console.error("Erreur lors de la récupération des bureaux de vote.");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };

    const fetchCandidats = async () => {
        try {
            const response = await fetch("http://localhost:8080/candidats/all");
            if (response.ok) {
                const data = await response.json();
                console.log("Candidats reçus :", data);
                setCandidatsList(data);
            } else {
                console.error("Erreur lors de la récupération des candidats");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = async () => {
        try {
            // Charger les bureaux s'ils ne sont pas déjà disponibles
            if (bureauxOptions.length === 0) {
                await fetchBureaux(); // Recharger les bureaux de vote si la liste est vide
            }
    
            // Vérifier si le nom du bureau saisi existe dans la liste
            const bureau = bureauxOptions.find(
                (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
            );
    
            if (!bureau) {
                alert("Polling station not found. Please enter a valid polling station name.");
                return;
            }
    
            // Construire les données à envoyer au backend
            const voteData = {
                bureauVote: { id_bureau_vote: bureau.id_bureau_vote }, // ID du bureau trouvé
                candidat: { id_candidat: formData.candidat },          // ID du candidat
                nombre_voix: formData.voix,                            // Nombre de voix
                date_saisie: formData.date, 
                annee_election: formData.annee,                           // Date de saisie
            };
    
            const url = editId
                ? `http://localhost:8080/resultats/editResultat/${editId}`
                : "http://localhost:8080/resultats/addResultat";
    
            const method = editId ? "PUT" : "POST";
    
            await fetch(url, {
                method: method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(voteData),
            });
    
            fetchVotes(); // Recharger les résultats après sauvegarde
            setIsModalOpen(false);
            setEditId(null);
            setFormData({ bureau: "", candidat: "", date: "", voix: "", annee: new Date().getFullYear()});
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
        }
    };
    

    const handleDelete = async (id) => {
        if (!id) {
            console.error("L'ID du résultat est manquant !");
            return;
        }
        try {
            await fetch(`http://localhost:8080/resultats/deleteResultat/${id}`, {
                method: "DELETE",
            });
            console.log(`Résultat avec l'ID ${id} supprimé.`);
            fetchVotes(); // Recharger les résultats après suppression
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };
    

    const handleEdit = (item) => {
        console.log("Editing item:", item); // Pour vérifier l'objet candidat et ses champs
    
        setEditId(item.id_résultat); // Assure-toi que c'est bien id_résultat
        setFormData({
            bureau: item.bureauVote ? item.bureauVote.nom_bureau : "",
            candidat: item.candidat?.id_candidat || "",
            date: item.date_saisie ? item.date_saisie.split("T")[0] : "", // Assurez-vous du format
            voix: item.nombre_voix || "",
        });
        setIsModalOpen(true);
    };
    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            <div className="flex flex-col w-full ml-2">
                {/* Navbar */}
                <Navbar />

                {/* Contenu principal aligné à gauche */}
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Recording of votes for each candidate</h1>

                    {/* Bouton ADD */}
                    <Button
                        className="source-code-btn flex items-center gap-2 mb-4"
                        onClick={() => {
                            setEditId(null);
                            setFormData({ bureau: "", candidat: "", date: "", voix: "", annee: new Date().getFullYear(), });
                            setIsModalOpen(true);
                        }}
                    >
                        {PlusIcon} ADD
                    </Button>

                    {/* Tableau */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded">
                            <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="py-2 px-4 border-b">Name of the candidate</th>
                                    <th className="py-2 px-4 border-b">Number of votes</th>
                                    <th className="py-2 px-4 border-b">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {candidats.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{item.candidat ? item.candidat.nom_candidat : "Inconnu"}</td>
                                        <td className="py-2 px-4 border-b">{item.nombre_voix}</td>
                                        <td className="py-2 px-4 border-b flex gap-2">
                                            {/* Bouton Edit */}
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleEdit(item)}
                                            >
                                                {EditIcon}
                                            </Button>
                                            {/* Bouton Delete */}
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(item.id_résultat)}
                                            >
                                                {TrashIcon}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Modal */}
                    {isModalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
                            <div className="bg-white p-6 rounded shadow-md w-1/3">
                                <h2 className="text-xl font-bold mb-4">
                                    {editId !== null ? "Modify" : "Add Number of votes"} a candidate
                                </h2>

                                {/* Formulaire */}
                                <div className="flex flex-col gap-4">
                                    {/* Bureau de vote */}
                                    <input
                                        type="text"
                                        name="bureau"
                                        placeholder="poll station"
                                        value={formData.bureau}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />

                                    {/* Liste déroulante pour le nom */}
                                        <select
                                            name="candidat"
                                            value={formData.candidat}
                                            onChange={handleChange}
                                            className="border p-2 rounded"
                                        >
                                            <option value="" disabled>
                                                Select a candidate
                                            </option>
                                            {candidatsList.map((candidat) => (
                                                <option key={candidat.id_candidat} value={candidat.id_candidat}>
                                                    {candidat.nom_candidat}
                                                </option>
                                            ))}
                                        </select>

                                    {/* Date */}
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date_saisie}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />

                                    {/* Champ Année */}
                                        <input
                                            type="number"
                                            name="annee"
                                            placeholder="année"
                                            value={formData.annee || new Date().getFullYear()}
                                            readOnly
                                            className="border p-2 rounded bg-gray-100"
                                        />


                                    {/* Nombre de voix */}
                                    <input
                                        type="number"
                                        name="voix"
                                        placeholder="Number of votes"
                                        value={formData.nombre_voix}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />

                                    {/* Boutons */}
                                    <div className="flex justify-end gap-2 mt-4">
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsModalOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleSave}>
                                            {editId !== null ? "Modify" : "Save"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
                <Footer/>
            </div>
           
        </div>
    );
};

export default Scrutateur;
