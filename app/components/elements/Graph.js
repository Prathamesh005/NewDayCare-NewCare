import * as React from "react";
// import Graph1 from './Graph1';
import { RecursivePartial, NodeOptions, EdgeOptions, DagreReact } from "dagre-reactjs";

export const CircleMarker = ({ edgeMeta, markerId }) => {
    return ( 
      <marker id={markerId} markerWidth="14" markerHeight="14" refX="5" refY="5">
        <circle cx="5" cy="5" r="3" style={edgeMeta.styles.marker.styles} />
      </marker>
    );
  }
function App(){
const  nodes= [
        {
          id: "0",
          label: "Start",
        },
        {
          id: "1",
          label: "Node Status",
        },
        {
            id: "2",
            label: "Tumor Size",
        },
        {
            id: "3",
            label: "Chemotherapy TCH AC + TH",
        },
        {
            id: "4",
            label: "Chemotherapy TH Weekly",
        },
        {
            id: "5",
            label: "Post-Chemotherapy Trastuzumab Request",
        },
        {
            id: "6",
            label: "ER Status",
        },
        {
            id: "7",
            label: "Endocrine Therapy",
        }

      ];

const  edges = [
    {
      from: "0",
      to: "1",
    },
    {
        from: "1",
        to: "2", 
        label: "No"
    },
    {
        from: "1",
        to: "3", 
        label: 'N+',
    },
    {
        from: "2",
        to: "3",
        label: 'To'
    },
    {
        from: "3",
        to: "4",
        label: 'T <= 2cm'
    },
    {
        from: "3",
        to: "5"
    },
    {
        from: "4",
        to: "5"
    },
    {
        from: "5",
        to: "6"
    },
    {
        from: "6",
        to: "7"
    }
  ];

  const DEFAULT_NODE_CONFIG = {
    styles: {
      node: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10
        },
      },
      shape: {
        styles: { fill: "#845" }
      }
    }
  };

  const DEFAULT_EDGE_CONFIG = {
    styles: {
      edge: {
        styles: { fillOpacity: 0, stroke: "#000", strokeWidth: "1px" },
      },
      label: {
        labelPos:  "c"
      },
    },
    
      
  };

    return (
    <>
      <svg id="schedule" width={1000} height={1000}>
        <DagreReact
          nodes={nodes}
          edges={edges}
          defaultNodeConfig={DEFAULT_NODE_CONFIG}
          defaultEdgeConfig={DEFAULT_EDGE_CONFIG}
        />
      </svg>
      {/* <Graph1 /> */}
      </>
    );
}

export default App;