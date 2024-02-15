import React from "react";
import { Tree } from "react-d3-tree";

// Function to convert the JSON data into the format expected by react-d3-tree
const convertData = (inputJson) => {
  const treeData = {
    name: "Family Tree",
    children: [],
  };

  const idToNodeMap = {};
  console.log("input JSON inside family tree");
  console.log(inputJson.data);
  inputJson.data.forEach((person) => {
    const newNode = {
      name: person.Name,
      attributes: {
        Id: person.Id,
        FatherName: person.FatherName,
        MotherName: person.MotherName,
        Gender: person.Gender,
      },
      children: [],
    };
    idToNodeMap[person.Id] = newNode;

    if (person.Children) {
      person.Children.forEach((child) => {
        newNode.children.push(idToNodeMap[child.Id]);
      });
    }

    if (!person.FatherName && !person.MotherName) {
      treeData.children.push(newNode);
      console.log("treeData node to push ", newNode);
    }
    console.log("treeData node after push ", treeData.children);
  });
  console.log("treeData");
  console.log(treeData.children);
  return treeData;
};

const NodeComponent = ({ nodeData }) => (
  <div>
    <h2>{nodeData.name}</h2>
    <p>ID: {nodeData.attributes.Id}</p>
    <p>Father: {nodeData.attributes.FatherName}</p>
    <p>Mother: {nodeData.attributes.MotherName}</p>
    <p>Gender: {nodeData.attributes.Gender}</p>
  </div>
);

const FamilyTree = (data) => {
  const treeData = convertData(data);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <Tree
        data={treeData}
        orientation="vertical"
        translate={{ x: 300, y: 50 }}
        nodeSvgShape={{ shape: "none" }}
        separation={{ siblings: 1.5, nonSiblings: 2 }}
        allowForeignObjects
        nodeLabelComponent={{
          render: <NodeComponent />,
        }}
      />
    </div>
  );
};

export default FamilyTree;
