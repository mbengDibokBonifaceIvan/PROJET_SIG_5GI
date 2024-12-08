import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";

import Setting from "./pages/Setting";
import Candidats from "./pages/Candidat/Candidats";
import Strutateurs from "./pages/Scrutateur/Scrutateurs";
function App() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidats" element={<Candidats />} />
          <Route path="/strutateurs" element={<Strutateurs />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          {/* <Route path="/analytics" element={<Analytics />} /> */}
          {/* <Route path="/file-manager" element={<FileManager />} /> */}
          {/* <Route path="/order" element={<Order />} /> */}
          {/* <Route path="/saved" element={<Saved />} /> */}
          <Route path="/settings" element={<Setting />} />

          {/* <Route path="*" element={<> not found</>} /> */}
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
