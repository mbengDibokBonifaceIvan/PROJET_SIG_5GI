import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Setting from "./pages/Setting";
import Candidats from "./pages/Candidat/Candidats";
import Strutateurs from "./pages/Scrutateur/Scrutateurs";
import Region from "./pages/Region/Region";
import Departement from "./pages/Departement/Departement";
import Arrondissement from "./pages/Arrondissement/Arrondissement";
import CentreVote from "./pages/CentreVote/CentreVote";
import BureauVote from "./pages/BureauVote/BureauVote";
import Electeur from "./pages/Electeur/Electeur";
function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/strutateurs" element={<Strutateurs />} />
           <Route path="/region" element={<Region />} /> 
           <Route path="/departement" element={<Departement />} /> 
          <Route path="/arrondissement" element={<Arrondissement />} /> 
           <Route path="/centrevote" element={<CentreVote />} /> 
           <Route path="/bureauvote" element={<BureauVote />} /> 
           <Route path="/electeur" element={<Electeur />} /> 
          <Route path="/settings" element={<Setting />} />

          {/* <Route path="*" element={<> not found</>} /> */}
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
