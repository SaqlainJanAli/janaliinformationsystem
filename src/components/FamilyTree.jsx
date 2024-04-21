import React from "react";
import { Tree as D3Tree } from "react-d3-tree";
import MaleImage from "../resources/data/image/malepng.png";
import FemaleImage from "../resources/data/image/femalepng.png";

const convertToTreeData = (data) => {
  let result = {
    name: data?.Name,
    attributes: {
      Gender: data?.Gender,
      FatherName: data?.FatherName,
      MotherName: data?.MotherName,
      DOB: data?.DOB,
      Age: data?.Age,
    },
    children: data?.Children ? data?.Children.map(convertToTreeData) : null,
  };
  return result;
};

function CustomLabelComponent({ nodeDatum, foreignObjectProps }) {
  const nameColor =
    nodeDatum.attributes.Gender === "Male" ? "darkgreen" : "red";

  return (
    <>
      <svg width="600" height="600" stroke="black" strokeWidth={1}>
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="20%" stopColor={"cyan"} />
            <stop offset="80%" stopColor={"white"} />
          </linearGradient>
        </defs>
        <rect
          width="300"
          height="300"
          fill={"url(#gradient)"}
          x="0"
          y="2"
          rx="10"
          ry="10"
        />
        <circle cx="0" cy="0" r="20" fill="green" stroke="none" />
        {/* <polygon points="100,50 150,150 50,150" fill="blue" /> */}

        <g transform="translate(20, 8)" x="20" y="20">
          {nodeDatum.attributes.Gender === "Male" ? (
            <image href={MaleImage} alt="Male pic" width="80" height="80" />
          ) : (
            <image href={FemaleImage} alt="Female pic" width="80" height="80" />
          )}
        </g>
        <br />
        <text
          x="110"
          y="80"
          fill={nameColor}
          fontStyle={"italic"}
          fontWeight={"bold"}
          fontFamily="cursive"
          fontSize={"20"}
          stroke="none"
        >
          {`${nodeDatum.name}`}{" "}
        </text>
        <text
          x="20"
          y="120"
          fill={"black"}
          stroke="none"
          fontFamily="cursive"
          // fontSize="40"
        >{`Father: ${nodeDatum.attributes.FatherName}`}</text>
        <text
          x="20"
          y="160"
          stroke="none"
          fontFamily="cursive"
          fill={"black"}
        >{`Mother: ${nodeDatum.attributes.MotherName}`}</text>
        <text
          x="20"
          y="200"
          stroke="none"
          fontFamily="cursive"
          fill={"black"}
        >{`Gender: ${nodeDatum.attributes.Gender}`}</text>
        <text
          x="20"
          y="240"
          stroke="none"
          fontFamily="cursive"
          fill="black"
        >{`DOB: ${nodeDatum.attributes.DOB}`}</text>
        <text
          x="20"
          y="280"
          fill="black"
          stroke="none"
          fontFamily="cursive"
        >{`Age: ${nodeDatum.attributes.Age}`}</text>
      </svg>
    </>
  );
}
const FamilyTree = (props) => {
  const treeData = convertToTreeData(props.data[0]);
  let viewType = "vertical"; //"props.viewType";
  // let xNodesize = viewType === "horizontal" ? "900" : "400";
  // let yNodesize = viewType === "horizontal" ? "900" : "400";
  let noTreeData = treeData.name === null || treeData.name === undefined;
  console.log("treeData Final: ", treeData);
  return (
    noTreeData === false && (
      <div style={{ width: "100%", height: "100vh" }}>
        <D3Tree
          collapsible={false}
          data={treeData}
          orientation={viewType}
          translate={{ x: 50, y: 50 }}
          renderCustomNodeElement={(rd3tProps) =>
            CustomLabelComponent({ ...rd3tProps })
          }
          nodeSize={{ x: 100, y: 900 }} // Adjust the node size for better spacing
          separation={{ siblings: 4, nonSiblings: 4 }} // Adjust the separation between nodes
          allowForeignObjects={true} // Enable the use of foreignObjects for custom label rendering
          pathFunc="diagonal" // Specify the path function for connecting nodes
        />
      </div>
    )
  );
};

export default FamilyTree;
