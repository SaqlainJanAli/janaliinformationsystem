import React, { useState } from "react";
import * as XLSX from "xlsx";
import FamilyTree from "./FamilyTree";

//function that will convert json to hirarecheal structure
function ConvertToTreeStructure(nodes, parentId = 0) {
  const tree = [];

  for (const node of nodes) {
    let formattedDate = "";

    if (node?.DOB !== undefined) {
      const millisecondsSinceEpoch = (node?.DOB - 25569) * 86400 * 1000;

      // Create a Date object from milliseconds since Unix epoch
      const date = new Date(millisecondsSinceEpoch);
      const options = {
        weekday: "long",
        month: "short",
        day: "2-digit",
        year: "numeric",
      };
      formattedDate = date.toLocaleDateString("en-US", options);
    }

    if (node.ParentId === parentId) {
      const newNode = {
        Id: node.Id,
        Name: node.Name,
        FatherName: node.FatherName,
        MotherName: node.MotherName,
        Gender: node.Gender,
        DOB: formattedDate,
        Age: node.Age,
        Children: ConvertToTreeStructure(nodes, node.Id),
      };
      tree.push(newNode);
    }
  }

  return tree;
}

const ExcelReader = () => {
  const [treeData, setTreeData] = useState([]);
  const [loadedJson, setLoadedJson] = useState(false);
  const [viewType, setViewType] = useState("horizontal");

  const fetchExcelData = async () => {
    try {
      const response = await fetch(
        "resources/data/JanAliFamilyDatabase.xlsx?timestamp=" +
          new Date().getTime()
      );

      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[2];
      const worksheet = workbook.Sheets[sheetName];
      const treeData = XLSX.utils.sheet_to_json(worksheet);

      const treeNodes = ConvertToTreeStructure(treeData);
      setTreeData(treeNodes);
    } catch (error) {
      console.error("Error fetching or parsing Excel file:", error);
    }
  };

  const handleClick = () => {
    fetchExcelData();
    setLoadedJson(!loadedJson);
  };
  // const toggleViewType = () => {
  //   let newViewType = viewType === "vertical" ? "horizontal" : "vertical";
  //   setViewType(newViewType);
  // };
  return (
    <div>
      <div className="flex flex-row  justify-center items-center pt-3">
        <h2 className=" text-2xl font-semibold mb-4">Jan Ali's Family Tree </h2>
      </div>
      <div className=" flex flex-row items-center justify-center  bg-black-500  ">
        <br />
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded"
          onClick={handleClick}
        >
          {loadedJson === true ? `Refresh` : `Load Data`}
        </button>

        <br />
      </div>
      <div
        className="h-screen mt-3 w-full h-full bg-gradient-to-l from-cyan-200 to-white-200"
        style={{ border: "1px solid black", borderRadius: "2%" }}
      >
        {treeData && <FamilyTree data={treeData} viewType={viewType} />}
      </div>
    </div>
  );
};

export default ExcelReader;
