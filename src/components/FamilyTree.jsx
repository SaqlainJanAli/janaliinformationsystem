import React from "react";
import { Tree } from "react-d3-tree";

const convertToTreeData = (data) => {
  let formattedDate = "";
  if (data?.data !== undefined) {
    const millisecondsSinceEpoch = (data?.DOB - 25569) * 86400 * 1000;

    // Create a Date object from milliseconds since Unix epoch
    const date = new Date(millisecondsSinceEpoch);

    // Format the date as "MMM DD, YYYY"
    formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  }

  let result = {
    name: data?.Name,
    attributes: {
      Gender: data?.Gender,
      "Father Name": data?.FatherName,
      "Mother Name": data?.MotherName,
      DOB: formattedDate,
    },
    children: data?.Children ? data?.Children.map(convertToTreeData) : null,
  };
  return result;
};
const NodeComponent = ({ nodeData }) => (
  <div className="bg-green-300">
    <h2>{nodeData.name}</h2>
    <p>ID: {nodeData.attributes.Id}</p>
    <p>Father: {nodeData.attributes.FatherName}</p>
    <p>Mother: {nodeData.attributes.MotherName}</p>
    <p>Gender: {nodeData.attributes.Gender}</p>
    <p>DOB: {nodeData.attributes.DOB}</p>
  </div>
);

const FamilyTree = (data, viewType) => {
  const treeData = convertToTreeData(data.data[0]);
  let noTreeData = treeData.name === null || treeData.name === undefined;
  console.log("treeData Final: ", treeData);
  return (
    noTreeData === false && (
      <div style={{ width: "100%", height: "600px" }}>
        <Tree
          data={treeData}
          orientation={viewType}
          translate={{ x: 300, y: 80 }}
          nodeSvgShape={{ shape: "none" }}
          separation={{ siblings: 2, nonSiblings: 2 }}
          allowForeignObjects
          nodeLabelComponent={{
            render: <NodeComponent />,
          }}
        />
      </div>
    )
  );
};

export default FamilyTree;
