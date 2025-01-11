import "./Dashboard.css";
import Card from "../../Components/Card";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer/footer";

function Dashboard() {
  return (
    // <div className="Dashboard">

    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-screen-lg text-center ml-600">
        <h1 className="text-3xl font-bold mb-2">
          BIENVENUE CHER ADMINISTRATEUR
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-300">
          Veuillez charger les parametres l'application afin que les
          utilisateurs puissent voir les résultats. Merci!{" "}
        </p>
        <div className="w-full max-w-screen-lg">
          {/** <Navbar/> */}

          <div className="grid-container">
            <Card />
            <Footer />
          </div>
        </div>
      </div>

    </div>
    
  );
}

export default Dashboard;




