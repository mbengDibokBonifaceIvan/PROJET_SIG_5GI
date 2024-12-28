// "use client";
// import { Button } from "@/components/ui/button";
// import Sidebar from "../Components/Sidebar/SideBar";
// import Navbar from "../Components/Navbar";
// import {  useNavigate } from "react-router-dom";


 


// const Logout = () => {
//   const navigate = useNavigate();
//   const onConfirm = () => {
//     console.log("Confirmer");
//     navigate("/");
//   };

//   const onCancel = () => {
//     console.log("Annuler...");
//     //navigate("/");
//   };
//     return (
//       <div className="flex">
//         {/** <Sidebar /> */}
//         <div className="flex flex-col w-full ml-2">
//           {/*  <Navbar /> */}

//           <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
//             <h2 className="text-xl font-bold mb-4">
//               Confirmer votre deconnexion
//             </h2>
//             <p className="mb-4">Voulez-vous vraiment vous deconnecter?</p>
//             <div className="flex justify-end gap-4">
//               <Button variant="outline" onClick={onCancel}>
//                 Annuler
//               </Button>
//               <Button variant="destructive" onClick={onConfirm}>
//                 Valider
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
// };

// export default Logout;









import { Button } from "@/components/ui/button";
import Sidebar from "../Components/Sidebar/SideBar";
import Navbar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const onConfirm = () => {
    console.log("Confirmer");
    navigate("/");
  };

  const onCancel = () => {
    console.log("Annuler...");
    //navigate("/");
  };

  return (
    <div className="flex bg-white dark:bg-gray-800 text-gray-800 dark:text-white">
      {/* <Sidebar /> */}
      <div className="flex flex-col w-full ml-2">
        {/* <Navbar /> */}

        <div className="max-w-md mx-auto p-6 bg-white dark:black shadow-md rounded-lg border border-gray-300 dark:border-gray-600">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Confirmer votre déconnexion
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Voulez-vous vraiment vous déconnecter?
          </p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onCancel} className="text-blue-600 dark:text-blue-400">
              Annuler
            </Button>
            <Button variant="destructive" onClick={onConfirm}>
              Valider
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;