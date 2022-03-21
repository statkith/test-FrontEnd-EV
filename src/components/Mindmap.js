import React, { useState } from "react";
import ReactFlow, { addEdge, Handle } from "react-flow-renderer/nocss";
import "react-flow-renderer/dist/style.css";
import "react-flow-renderer/dist/theme-default.css";
import "../App.css";
import Card from "../components/Card";
import Card2 from "../components/Card2";
import Chart from "./Charts/Doughnut";

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const onConnectStart = (event, { nodeId, handleType }) =>
  console.log("on connect start", { nodeId, handleType });
const onConnectStop = (event) => console.log("on connect stop", event);
const onConnectEnd = (event) => console.log("on connect end", event);

let pointDataArray = [];

const DefaultNode = (startingPoints) => {
  if (Array.isArray(startingPoints)) {
    startingPoints.map((point_array) => {
      point_array.map((point_obj) => {
        if (point_obj.id !== "default") {
          pointDataArray.push(point_obj);
        }

        return null;
      });

      return null;
    });
  }

  return (
    <>
      {pointDataArray.map((i) => (
        <>
          <Handle
            key={i}
            id={i.id}
            type={i.type}
            style={i.style[0]}
            position={i.position}
          />
        </>
      ))}
      <Card />
    </>
  );
};

const CustomOutput = () => (
  <>
    <Handle
      type="target"
      position="top"
      style={{ top: "30%", borderRadius: 0 }}
    />
    <Card2 />
  </>
);

const ChartOutput = () => (
  <>
    <Handle
      type="target"
      position="top"
      style={{ top: "30%", borderRadius: 0 }}
    />
    <Chart />
  </>
);

const Mindmap = (props) => {
  let mindMapData = props.mindMapData;

  let [elements, setElements] = useState([]);

  const onConnect = (params) => {
    setElements((els) => addEdge(params, els));
  };

  const nodeArray = [];
  const edgeArray = [];
  const startingPoints = [];

  mindMapData.map((mind_map_data) => {
    edgeArray.push(mind_map_data.edges);
    nodeArray.push(mind_map_data.nodes);
    startingPoints.push(mind_map_data.startingPoints);

    return null;
  });

  DefaultNode(startingPoints);

  const jsxFixedNodeDataArray = [];
  nodeArray.map((node_data) => {
    node_data.map((data_object) => {
      data_object.data.map((topic_data, index) => {
        data_object.style.map((style) => {
          jsxFixedNodeDataArray.push({
            id: data_object.id,
            position: data_object.position,
            type: data_object.type,
            data: {
              label: (
                <Card2
                  title={topic_data.topic}
                  subTitle={topic_data.topic1}
                  imageLink={topic_data.image}
                  summary={topic_data.summery}
                />
              ),
            },
            style: style,
          });

          return null;
        });

        return null;
      });

      return null;
    });

    return null;
  });

  edgeArray.map((edge_array) => {
    edge_array.map((edge_data_obj) => {
      jsxFixedNodeDataArray.push(edge_data_obj);

      return null;
    });

    return null;
  });

  elements = jsxFixedNodeDataArray;

  const nodeTypes = {
    chartoutput: ChartOutput,
    customoutput: CustomOutput,
    defaultnode: DefaultNode,
  };

  return (
    <ReactFlow
      defaultZoom={0.5}
      elements={elements}
      onConnect={onConnect}
      selectNodesOnDrag={false}
      onLoad={onLoad}
      className="validationflow"
      nodeTypes={nodeTypes}
      onConnectStart={onConnectStart}
      onConnectStop={onConnectStop}
      onConnectEnd={onConnectEnd}
      snapToGrid={true}
    />
  );
};

export default Mindmap;
