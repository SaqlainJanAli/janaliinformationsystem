// ExcelReader.js
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import FamilyTree from "./FamilyTree";
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
        Children: buildTree(nodes, node.Id),
      };
      tree.push(newNode);
    }
  }

  return tree;
}

const ExcelReader = () => {
  const [treeData, setTreeData] = useState([]);

  const fetchExcelData = async () => {
    // Adjust the path to your Excel file
    try {
      console.log("inside fetch excel data");
      let filepath = "resources/data/excel/JanAlisRelativesDetails.xlsx";
      const response = await fetch(filepath);
      const data = await response.arrayBuffer();

      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const treeData = XLSX.utils.sheet_to_json(worksheet);
      // console.log("Json data", treeData);
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

  useEffect(() => {
    fetchExcelData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-semibold mb-4">Excel Tree Viewer</h2>
      <div>
        {console.log("Before calling tree json", treeData)}
        {treeData && <FamilyTree data={treeData} />}
      </div>
    </div>
  );
};

export default ExcelReader;
