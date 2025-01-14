"use client";
import "./App.css";
import SideBar from "../Components/Sidebar1/SideBar";
import "./pages/Dashboard.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Candidats from "./pages/Candidat/Candidats";
import SuperAdmin from "./pages/SuperAdministrateurs/SuperAdmin";
import Scrutateurs from "./pages/Scrutateurs/Scrutateurs";
import Region from "./pages/Region/Region";
import Departement from "./pages/Departement/Departement";
import Arrondissement from "./pages/Arrondissement/Arrondissement";
import CentreVote from "./pages/CentreVote/CentreVote";
import BureauVote from "./pages/BureauVote/BureauVote";
import Electeur from "./pages/Electeur/Electeur";
import Utilisateurs from "./pages/Utilisateurs/Utilisateurs";
import ProcesVerbaux from "./pages/ProcesVerbaux/ProcesVerbaux";
function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/AdminUI" element={<Dashboard />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/utilisateurs" element={<Utilisateurs />} />
          <Route path="/region" element={<Region />} />
          <Route path="/departement" element={<Departement />} />
          <Route path="/arrondissement" element={<Arrondissement />} />
          <Route path="/centrevote" element={<CentreVote />} />
          <Route path="/bureauvote" element={<BureauVote />} />
          <Route path="/electeur" element={<Electeur />} />
          <Route path="/pv" element={<ProcesVerbaux />} />
          <Route path="/scrutateurs" element={<Scrutateurs />} />
          <Route path="/superAdministrateur" element={<SuperAdmin />} />

          {/* <Route path="*" element={<> not found</>} /> */}
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
