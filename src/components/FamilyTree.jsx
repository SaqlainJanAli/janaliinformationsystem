import React from "react";
import { Tree as D3Tree } from "react-d3-tree";
import malepng from "../resources/data/image/malepng.png";
import femalepng from "../resources/data/image/femalepng.png";
import treeStyle from "../css/tree.module.scss";

const convertToTreeData = (data) => {
  let result = {
    name: data?.Name,
    attributes: {
      Gender: data?.Gender,
      "Father Name": data?.FatherName,
      "Mother Name": data?.MotherName,
      DOB: data?.DOB,
    },
    children: data?.Children ? data?.Children.map(convertToTreeData) : null,
  };
  return result;
};
const NodeComponent = ({ nodeData }) => (
  <div className="bg-green-300">
    <h2>{nodeData.name}</h2>
    <div className="black">ID: {nodeData.attributes.Id}</div>
    <div className="black">Father: {nodeData.attributes.FatherName}</div>
    <div className="black">Mother: {nodeData.attributes.MotherName}</div>
    <div className="black">Gender: {nodeData.attributes.Gender}</div>
    <div className="black">DOB: {nodeData.attributes.DOB}</div>
  </div>
);

function CustomLabelComponent({ nodeData }) {
  const backgroundColor =
    nodeData.attributes.Gender === "Male" ? "#4682B4" : "#FF69B4";
  const textColor = "#FFFFFF"; // White text color

  // Conditional styles for specific attributes
  const fatherNameColor =
    nodeData.attributes.Gender === "Male" ? "#FFFFFF" : "#000000"; // White for males, black for females
  const motherNameColor =
    nodeData.attributes.Gender === "Male" ? "#FFFFFF" : "#000000"; // White for males, black for females
  const genderColor = "#FFFFFF"; // White text color for gender

  // Define custom colors for males and females
  // const backgroundColor =
  //   nodeData.attributes.Gender === "Male" ? "#4682B4" : "#FF69B4";
  // const textColor = "#000"; // White text color

  return (
    <>
      <div
        className={`rd3t-label__attributes`}
        style={{
          backgroundColor,
          color: textColor,
          padding: "8px",
          borderRadius: "5px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {nodeData.attributes.Gender === "Male" ? (
            <img
              src={malepng}
              alt="male pic"
              size={20}
              style={{ marginRight: "5px" }}
            />
          ) : (
            <img
              src={femalepng}
              alt="female pic"
              size={20}
              style={{ marginRight: "5px" }}
            />
          )}
          <div>{nodeData.name}</div>
        </div>
        <p style={{ color: fatherNameColor }}>
          Father: {nodeData.attributes.FatherName}
        </p>
        <p style={{ color: motherNameColor }}>
          Mother: {nodeData.attributes.MotherName}
        </p>
        <p style={{ color: genderColor }}>
          Gender: {nodeData.attributes.Gender}
        </p>
        <p className="black">DOB: {nodeData.attributes.DOB}</p>{" "}
      </div>
    </>
  );
}
const pathFunction = () => {
  // return <path fill="#FFFFFF" stroke="black" strokewidth="2px" />;
};
const FamilyTree = (data, viewType) => {
  const treeData = convertToTreeData(data.data[0]);
  let noTreeData = treeData.name === null || treeData.name === undefined;
  console.log("treeData Final: ", treeData);
  return (
    noTreeData === false && (
      <div style={{ width: "100%", height: "2000px" }}>
        <D3Tree
          collapsible={false}
          // className={}
          key={"Id"}
          data={treeData}
          orientation="vertical"
          translate={{ x: 50, y: 50 }}
          // nodeSvgShape={{ shape: "circle", shapeProps: { r: 10 } }}
          nodeLabelComponent={{
            render: <CustomLabelComponent />,
            foreignObjectWrapper: {
              width: 150,
              height: 30,
              x: -75,
              y: -15,
            },
          }}
          nodeSize={{ x: 100, y: 500 }} // Adjust the node size for better spacing
          separation={{ siblings: 3, nonSiblings: 3 }} // Adjust the separation between nodes
          allowForeignObjects={true} // Enable the use of foreignObjects for custom label rendering
          pathFunc="diagonal" // Specify the path function for connecting nodes
          branchNodeClassName="bg-blue-400"
        />
      </div>
    )
  );
};

export default FamilyTree;
