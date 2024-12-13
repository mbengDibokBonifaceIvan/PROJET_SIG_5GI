import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { downloadIcon,lockIcon,  github } from "../utils/Icons";
import ThemeDropdown from "./ThemeDropdown/ThemeDropdown";
import SearchDialog from "./SearchDialog/SearchDialog";
import { useGlobalContext } from "../context/globalContext";
import jsPDF from "jspdf";

function generatePDF() {
  const pdf = new jsPDF();
  pdf.text("Bonjour", 10, 10); // Ajoute le texte "Bonjour" à la position (10, 10) dans le PDF
  pdf.save("document.pdf"); // Télécharge le PDF avec le nom "document.pdf"
}

function Navbar() {
  const router = useRouter();
  const { state } = useGlobalContext();

  const goToLogin = () => {
    router.push('/login');
};

  return (
    <div className="w-full py-4 flex items-center justify-between">

      <div> <p className="text-2xl">ELECAM-RESULTS.COM</p> </div>
      <div className="left"></div>
      <div className="search-container flex shrink-0 w-full gap-2 sm:w-fit">
        <SearchDialog />

        <div className="btn-group flex items-center gap-2">
          <ThemeDropdown />

          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={generatePDF}
          >
            {downloadIcon} Télécharger PDF
          </Button>
          <Button
            className="source-code-btn flex items-center gap-2"
            onClick={goToLogin}
          >
            {lockIcon} Connexion
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
