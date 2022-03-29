import React, { useEffect } from 'react';
import ReactFlow, { ReactFlowProvider, useNodesState, useEdgesState, addEdge, Controls, Background,  } from 'react-flow-renderer';

import Sidebar from './Sidebar'

import './index.css';
Background
const title = {
  height: '30px',
  background: 'green',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  paddingLeft: '10px'
}

const titleStyle = {
  textAlign: 'start',
  padding: '0 0 10px 0'
}

const keyName = {
  padding: '10px 0 0 10px'
}

const initialNodes = [
  {
    id: 'provider-1',
    type: "list",
    data: { 
      title: 'node 1',
      list: []
    },
    position: { x: 250, y: 5 },
  },
  {
    id: 'provider-2', data: {
      label: <div>
        <div style={{ ...title }}>User</div>
        <div style={{ ...keyName }}>key-data(6)</div>
        <div style={{ ...keyName }}>id-num(1)</div>
      </div>
    },
    position: { x: 100, y: 100 }, 
    style: { ...titleStyle },
  },
  { id: 'provider-3', data: { label: 'Node 3' }, position: { x: 400, y: 100 } },
  { id: 'provider-4', data: { label: 'Node 4' }, position: { x: 400, y: 200 } },
];

const initialEdges = [
  {
    id: 'provider-1-2',
    source: 'provider-1',
    target: 'provider-2',
    animated: true
  },
  { 
    id: 'provider-1-3',
    source: 'provider-1',
    target: 'provider-3' 
  },
  { 
    id: 'provider-1-4',
    source: 'provider-1',
    target: 'provider-4' 
  },
];

const ProviderFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes as any);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = (params) => setEdges((eds) => addEdge(params, eds));

  useEffect(() => { }, [])

  return (
    <div className="providerflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
          >
            <Background variant={"lines" as any} gap={12} size={1} />
            <Controls showZoom={false} />
          </ReactFlow>
        </div>
        {/* <Sidebar nodes={nodes} setNodes={setNodes} /> */}
      </ReactFlowProvider>
    </div>
  );
};

export default ProviderFlow;
