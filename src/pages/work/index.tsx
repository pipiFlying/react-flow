import { useCallback, useState } from 'react';
import ReactFlow, { ReactFlowProvider, MiniMap, Controls, addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'react-flow-renderer';

import TextUpdaterNode from './components/nodeCard/nodeCard';

import './styles.less';

const rfStyle = {
  backgroundColor: '#fff',
};

const initialNodes = [
  { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
  {
    id: 'node-2',
    type: 'output',
    targetPosition: 'top',
    position: { x: 0, y: 200 },
    data: { label: 'node 2' },
  },
  {
    id: 'node-3',
    type: 'output',
    targetPosition: 'top',
    position: { x: 200, y: 200 },
    data: { label: 'node 3' },
  },
];

const elements: {
  id: string,
  type: string,
  data: {
    title: string,
    list: any[],
  },
  position: {
    x: number,
    y: number,
  },
  targetPosition: string,
  sourcePosition: string,
}[] = [
    // nodes
    {
      id: 'node-1',
      type: "textUpdater",// 声明节点类型
      // data 会作为 props 传给节点
      data: {
        title: 'User',
        list: [
          {
            keyName: 'name',
            type: 'Name',
            size: 64
          },
          {
            keyName: 'project',
            type: 'Text',
            size: 255
          },
          {
            keyName: 'FileName',
            type: 'Text',
            size: 255
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
          {
            keyName: 'version',
            type: 'Number',
            size: 20
          },
        ],
      },
      position: { x: 220, y: 50 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: 'node-2',
      type: "textUpdater",
      data: {
        title: 'Role',
        list: [],
      },
      position: { x: 250, y: 100 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    {
      id: 'node-3',
      type: "textUpdater",
      data: {
        title: 'acounnt',
        list: [],
      },
      position: { x: 190, y: 100 },
      targetPosition: 'top',
      sourcePosition: 'bottom'
    },
    // // edges
    // {
    //   id: "egde1-2",
    //   type: "textUpdater",
    //   // 起始节点 id
    //   source: "1",
    //   // 起点 Handle id
    //   sourceHandle: "b",
    //   // 结束节点 id
    //   target: "2",
    //   // 终点 Handle id
    //   targetHandle: "lt",
    // },
  ];

const initialEdges: {
  id: string,
  source: string,
  target: string,
  sourceHandle: string,
  animated?: boolean
}[] = [
    { id: 'node-1-2', source: 'node-1', target: 'node-2', sourceHandle: 'a', animated: true },
    { id: 'node-1-3', source: 'node-1', target: 'node-3', sourceHandle: 'b', animated: true },
  ];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { textUpdater: TextUpdaterNode };

function Flow() {
  // const [nodes, setNodes] = useState(initialNodes);
  const [nodes, setNodes] = useState<any[]>(elements);
  const [edges, setEdges] = useState<any[]>(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div style={{ height: '100vh' }}>
        <ReactFlow
          nodes={nodes as any}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          zoomOnScroll={false} // 使用滚轮需禁用父元素缩放
          preventScrolling={false} // 使超出内容使用滚轮
          fitView
          style={rfStyle}
        />
        <Controls showZoom={true} showInteractive={false} />
        <Background variant={"lines" as any} gap={12} size={1} />
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
