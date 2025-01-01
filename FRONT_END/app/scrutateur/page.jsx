"use client";
import "./App.css";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon, EditIcon } from "../utils/Icons";
import Footer from "../Components/Footer/footer";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";


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

    const fetchVotes = async () => {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
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
                setBureauxOptions(data);
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
        const bureau = bureauxOptions.find(
            (b) => b.nom_bureau.toLowerCase() === formData.bureau.toLowerCase()
        );

        if (!bureau) {
            alert("Polling station not found. Please enter a valid polling station name.");
            return;
        }

        const voteData = {
            bureauVote: { id_bureau_vote: bureau.id_bureau_vote },
            candidat: { id_candidat: formData.candidat },
            nombre_voix: formData.voix,
            date_saisie: formData.date,
            annee_election: formData.annee,
        };

        const url = editId
            ? `http://localhost:8080/resultats/editResultat/${editId}`
            : "http://localhost:8080/resultats/addResultat";

        const method = editId ? "PUT" : "POST";

        try {
            await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(voteData),
            });

            fetchVotes();
            setIsModalOpen(false);
            setEditId(null);
            setFormData({ bureau: "", candidat: "", date: "", voix: "", annee: new Date().getFullYear() });
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:8080/resultats/deleteResultat/${id}`, { method: "DELETE" });
            fetchVotes();
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleEdit = (item) => {
        setEditId(item.id_résultat);
        setFormData({
            bureau: item.bureauVote ? item.bureauVote.nom_bureau : "",
            candidat: item.candidat?.id_candidat || "",
            date: item.date_saisie ? item.date_saisie.split("T")[0] : "",
            voix: item.nombre_voix || "",
            annee: new Date().getFullYear(),
        });
        setIsModalOpen(true);
    };

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex flex-col w-full ml-[5cm]"> {/* Espace de 5 cm */}
                {/* <Navbar/> */}
                <main className="flex-1 p-8">
                    <h1 className="text-2xl font-bold mb-4">Recording of votes for each candidate</h1>

                    {/* Add button */}
                    <Button
                        className="source-code-btn flex items-center gap-2 mb-4"
                        onClick={() => {
                            setEditId(null);
                            setFormData({ bureau: "", candidat: "", date: "", voix: "", annee: new Date().getFullYear() });
                            setIsModalOpen(true);
                        }}
                    >
                        {PlusIcon} ADD
                    </Button>

                    {/* Table */}
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
                                    <tr key={item.id_résultat} className="hover:bg-gray-50">
                                        <td className="py-2 px-4 border-b">{item.candidat?.nom_candidat || "Unknown"}</td>
                                        <td className="py-2 px-4 border-b">{item.nombre_voix}</td>
                                        <td className="py-2 px-4 border-b flex gap-2">
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
                                    {editId !== null ? "Modify" : "Add"} a candidate
                                </h2>
                                <div className="flex flex-col gap-4">
                                    <select
                                        name="bureau"
                                        value={formData.bureau}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    >
                                        <option value="" disabled>
                                            Select a polling station
                                        </option>
                                        {bureauxOptions.map((bureau) => (
                                            <option key={bureau.id_bureau_vote} value={bureau.nom_bureau}>
                                                {bureau.nom_bureau}
                                            </option>
                                        ))}
                                    </select>

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

                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        name="voix"
                                        placeholder="Number of votes"
                                        value={formData.voix}
                                        onChange={handleChange}
                                        className="border p-2 rounded"
                                    />

                                    <input
                                        type="number"
                                        name="annee"
                                        placeholder="Year"
                                        value={formData.annee}
                                        readOnly
                                        className="border p-2 rounded bg-gray-100"
                                    />

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
                <Footer />
            </div>
        </div>
    );
};

export default Scrutateur;
