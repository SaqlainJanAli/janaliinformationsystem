// ExcelReader.js
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FamilyTree from "./FamilyTree";
import familyInfoJson from "../resources/data/familyinfojson";
function buildTree(nodes, parentId = 0) {
  const tree = [];

  for (const node of nodes) {
    if (node.ParentId === parentId) {
      const newNode = {
        Id: node.Id,
        Name: node.Name,
        FatherName: node.FatherName,
        MotherName: node.MotherName,
        Gender: node.Gender,
        DOB: node.DOB,
        Children: buildTree(nodes, node.Id),
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
    // Adjust the path to your Excel file
    try {
      // console.log("inside fetch excel data");
      // let filepath = "resources/data/excel/familyinfo.xlsx";
      // const response = await fetch(filepath);
      // const data = await response.arrayBuffer();

      // const workbook = XLSX.read(data);
      // const sheetName = workbook.SheetNames[0];
      // const worksheet = workbook.Sheets[sheetName];
      // const treeData = XLSX.utils.sheet_to_json(worksheet);
      const treeData = familyInfoJson;

      const treeNodes = buildTree(treeData);
      setTreeData(treeNodes);
      console.log("Tree Nodes after building");
      console.log(treeNodes);
      // Convert array to hierarchical JSON
      // const tree = convertToTree(treeData);
      // setTreeData(tree);
    } catch (error) {
      console.error("Error fetching or parsing Excel file:", error);
    }
  };

  const handleClick = () => {
    if (loadedJson === false) {
      fetchExcelData();
      setLoadedJson(true);
    }
  };
  const toggleViewType = () => {
    let newViewType = viewType === "vertical" ? "horizontal" : "vertical";
    setViewType(newViewType);
  };
  return (
    <div>
      <h2 className="flex flex-row  justify-center items-center text-2xl font-semibold mb-4">
        Excel Tree Viewer
      </h2>
      <div className=" flex flex-row items-center justify-center  bg-black-500  ">
        <br />
        <button
          className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleClick}
        >
          {loadedJson === true ? `Refresh` : `Load Data`}
        </button>
        <button
          className="bg-blue-500 ml-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={toggleViewType}
        >
          {viewType === "vertical" ? `Vertical ` : `Horizontal `}View
        </button>
        <br />
      </div>
      <div className="flex flex-col h-screen">
        {console.log("Before calling tree json", treeData)}
        {treeData && <FamilyTree data={treeData} viewType={viewType} />}
      </div>
    </div>
  );
};

export default ExcelReader;
