"use client";




import { useState } from "react";

import DataViewer from "../Components/DataViewer/DataViewer";


import Header from "../Components/Header/header";


export default function Home() {
    const [csvData, setCsvData] = useState();

    const [editingRowIndex, setEditingRowIndex] = useState(null);

    const [editingRowData, setEditingRowData] = useState(null);

    const onUpdateCSVDataHandler = (data) => {
      if (data) {
        setCsvData(data);
      }
    };

    const onDeleteCSVRowHandler = (rowIndex) => {
      let updatedCSVData = [...csvData];

      updatedCSVData.splice(rowIndex, 1);

      setCsvData(updatedCSVData);
    };

    const onEditCSVRowHandler = (rowIndex) => {
      if (rowIndex >= 0) {
        setEditingRowIndex(rowIndex);

        let cloneCSVRowData = csvData.find(
          (value, index) => index === rowIndex
        );

        if (cloneCSVRowData) {
          setEditingRowData({ ...cloneCSVRowData });
        }
      }
    };

    const onEditRowDataInputHandler = (event) => {
      let updatedRowData = {
        ...editingRowData,

        Annee: event.target.value,
      };

      setEditingRowData(updatedRowData);
    };

    const onCancleEditingRowHandler = () => {
      setEditingRowIndex(null);

      setEditingRowData(null);
    };

    const onSaveEditingRowDataHandler = () => {
      let updatedCSVData = csvData.map((row, rowIndex) => {
        if (rowIndex === editingRowIndex) {
          return { ...editingRowData };
        }

        return row;
      });

      setCsvData(updatedCSVData);

      setEditingRowIndex(null);

      setEditingRowData(null);
    };


   return (
     <div>
       <Header onUpdateCSVDataHandler={onUpdateCSVDataHandler} />

       <DataViewer
         onDeleteCSVRowHandler={onDeleteCSVRowHandler}
         onEditCSVRowHandler={onEditCSVRowHandler}
         onEditRowDataInputHandler={onEditRowDataInputHandler}
         onCancleEditingRowHandler={onCancleEditingRowHandler}
         onSaveEditingRowDataHandler={onSaveEditingRowDataHandler}
         editingRowIndex={editingRowIndex}
         editingRowData={editingRowData}
         csvData={csvData}
       />
     </div>
   );
}


