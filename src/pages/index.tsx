import G6 from '@antv/g6';
import React, { useEffect } from 'react'

type Props = {}

export default function index({ }: Props) {
  let a = 400
  const response_status = [
    ['400', '请求错误(400)'],
    ['401', '没有权限(401)'],
    ['403', '拒绝访问(403)'],
    ['404', '请求出错(404)'],
    ['408', '请求服务超时(408)'],
    ['500', '服务器错误(500)'],
    ['501', '服务器为实现(501)'],
    ['502', '网络错误(502)'],
    ['503', '服务器不可用(503)'],
    ['504', '网络超时(504)'],
    ['505', 'HTTP版本不受支持(505)']
  ] 
  let msg = new Map(response_status)

  console.log(msg, 'msg')

  console.log(msg.get(a.toString()), 'msg.get(a.toString())')
  const {
    Util,
    registerBehavior,
    registerEdge,
    registerNode
  } = G6;

  const rawData = [{
    "id": "info",
    "label": "Employee",
    "attrs": [{
      "key": "id",
      "type": "number(6)"
    },
    {
      "key": "key",
      "type": "varchar(255)"
    },
    {
      "key": "gender",
      "type": "enum(M, F)"
    },
    {
      "key": "birthday",
      "type": "date"
    },
    {
      "key": "hometown",
      "type": "varchar(255)"
    },
    {
      "key": "country",
      "type": "varchar(255)"
    },
    {
      "key": "nation",
      "type": "varchar(255)"
    },
    {
      "key": "jobId",
      "type": "number(3)",
      "relation": [{
        "key": "id",
        "nodeId": "job"
      }]
    },
    {
      "key": "phone",
      "type": "varchar(255)"
    },
    {
      "key": "deptId",
      "type": "number(6)",
      "relation": [{
        "key": "id",
        "nodeId": "dept"
      }]
    },
    {
      "key": "startTime",
      "type": "date"
    },
    {
      "key": "leaveTime",
      "type": "date"
    }
    ]
  },
  {
    "id": "dept",
    "label": "Department",
    "attrs": [{
      "key": "id",
      "type": "number(6)"
    },
    {
      "key": "title",
      "type": "varchar(255)"
    },
    {
      "key": "desc",
      "type": "text"
    },
    {
      "key": "parent",
      "type": "number(6)",
      "relation": [{
        "key": "id",
        "nodeId": "dept"
      }]
    },
    {
      "key": "manager",
      "type": "number(6)"
    }]
  },
  {
    "id": "dep",
    "label": "Department",
    "attrs": [{
      "key": "id",
      "type": "number(6)"
    },
    {
      "key": "title",
      "type": "varchar(255)"
    },
    {
      "key": "desc",
      "type": "text"
    },
    {
      "key": "parent",
      "type": "number(6)",
      "relation": [{
        "key": "id",
        "nodeId": "dept"
      }]
    },
    {
      "key": "manager",
      "type": "number(6)"
    }
    ]
  }
  ]

  const itemHeight = 20;


  registerEdge("dice-er-edge", {
    draw(cfg, group) {
      const edge = group.cfg.item;
      const sourceNode = edge.getSource().getModel();
      const targetNode = edge.getTarget().getModel();

      const sourceIndex = sourceNode.attrs.findIndex(
        (e) => e.key === cfg.sourceKey
      );

      const sourceStartIndex = sourceNode.startIndex || 0;

      let sourceY = 15;

      if (!sourceNode.collapsed && sourceIndex > sourceStartIndex - 1) {
        sourceY = 30 + (sourceIndex - sourceStartIndex + 0.5) * 30;
        sourceY = Math.min(sourceY, 80);
      }

      const targetIndex = targetNode.attrs.findIndex(
        (e) => e.key === cfg.targetKey
      );

      const targetStartIndex = targetNode.startIndex || 0;

      let targetY = 15;

      if (!targetNode.collapsed && targetIndex > targetStartIndex - 1) {
        targetY = (targetIndex - targetStartIndex + 0.5) * 30 + 30;
        targetY = Math.min(targetY, 80);
      }

      const startPoint = {
        ...cfg.startPoint
      };
      const endPoint = {
        ...cfg.endPoint
      };

      startPoint.y = startPoint.y + sourceY;
      endPoint.y = endPoint.y + targetY;

      let shape;
      if (sourceNode.id !== targetNode.id) {
        shape = group.addShape("path", {
          attrs: {
            stroke: "#5B8FF9",
            path: [
              ["M", startPoint.x, startPoint.y],
              [
                "C",
                endPoint.x / 3 + (2 / 3) * startPoint.x,
                startPoint.y,
                endPoint.x / 3 + (2 / 3) * startPoint.x,
                endPoint.y,
                endPoint.x,
                endPoint.y,
              ],
            ],
            endArrow: true,
          },
          name: "path-shape",
        });
      } else if (!sourceNode.collapsed) {
        // let gap = Math.abs((startPoint.y - endPoint.y) / 3);
        // if (startPoint["index"] === 1) {
        //   gap = -gap;
        // }
        shape = group.addShape("path", {
          attrs: {
            stroke: "#5B8FF9",
            path: [
              ["M", startPoint.x, startPoint.y],
              [
                "C",
                // startPoint.x - gap,
                startPoint.y,
                // startPoint.x - gap,
                endPoint.y,
                startPoint.x,
                endPoint.y,
              ],
            ],
            endArrow: true,
          },
          name: "path-shape",
        });
      }

      return shape;
    },
    afterDraw(cfg, group) {
      const labelCfg = cfg.labelCfg || {};
      const edge = group.cfg.item;
      const sourceNode = edge.getSource().getModel();
      const targetNode = edge.getTarget().getModel();
      if (sourceNode.collapsed && targetNode.collapsed) {
        return;
      }
      const path = group.find(
        (element) => element.get("name") === "path-shape"
      );

      const labelStyle = Util.getLabelPosition(path, 0.5, 0, 0, true);
      const label = group.addShape("text", {
        attrs: {
          // ...labelStyle,
          text: cfg.label || '',
          fill: "#000",
          textAlign: "center",
          stroke: "#fff",
          lineWidth: 1,
        },
      });
      label.rotateAtStart(labelStyle.rotate);
    },
  });

  registerNode("dice-er-box", {
    draw(cfg, group) {
      const width = 250;
      const height = 300;
      const itemCount = 10;
      
      const boxStyle = {
        stroke: "#096DD9",
        radius: 4,
      };

      const {
        attrs = [],
        startIndex = 0,
        selectedIndex,
        collapsed,
        icon,
      } = cfg;
      const list = attrs;
      const afterList = list.slice(
        Math.floor(startIndex),
        Math.floor(startIndex + itemCount - 1)
      );
      const offsetY = (0.5 - (startIndex % 1)) * itemHeight + 30;
      // 表头样式
      group.addShape("rect", {
        attrs: {
          fill: boxStyle.stroke,
          height: 30,
          width,
          radius: [boxStyle.radius, boxStyle.radius, 0, 0],
        },
        draggable: true,
      });

      let fontLeft = 12;
      // 表头
      group.addShape("text", {
        attrs: {
          y: 22,
          x: fontLeft,
          fill: "#fff",
          text: cfg.label,
          fontSize: 12,
          fontWeight: 500,
        },
      });

      const keyshape = group.addShape("rect", {
        attrs: {
          x: 0,
          y: 0,
          width,
          height: collapsed ? 45 : height,
          ...boxStyle,
        },
        draggable: true,
      });

      if (collapsed) {
        return keyshape;
      }

      const listContainer = group.addGroup({});

      if (afterList) {
        afterList.forEach((e, i) => {
          const isSelected =
            Math.floor(startIndex) + i === Number(selectedIndex);
          let {
            key = "", type
          } = e;
          if (type) {
            key += " - " + type;
          }
          const label = key.length > 26 ? key.slice(0, 24) + "..." : key;

          // listContainer.addShape("rect", {
          //   attrs: {
          //     x: 1,
          //     y: i * itemHeight - itemHeight / 2 + offsetY,
          //     width: width - 4,
          //     height: itemHeight,
          //     radius: 2,
          //     lineWidth: 1,
          //     cursor: "pointer",
          //   },
          //   name: `item-${Math.floor(startIndex) + i}-content`,
          //   draggable: true,
          // });

          if (!cfg.hideDot) {
            // 左边的节点圆圈
            listContainer.addShape("circle", {
              attrs: {
                x: 0,
                y: i * itemHeight + offsetY,
                r: 3,
                stroke: boxStyle.stroke,
                fill: "white",
                radius: 2,
                lineWidth: 1,
                cursor: "pointer",
              },
            });
            // 右边的节点圆圈
            listContainer.addShape("circle", {
              attrs: {
                x: width,
                y: i * itemHeight + offsetY,
                r: 3,
                stroke: boxStyle.stroke,
                fill: "white",
                radius: 2,
                lineWidth: 1,
                cursor: "pointer",
              },
            });
          }

          // 卡片里面的属性列表
          listContainer.addShape("text", {
            attrs: {
              x: 12,
              y: i * itemHeight + offsetY + 6,
              text: label,
              fontSize: 12,
              fill: "#000",
              fontFamily: "Avenir,-apple-system,BlinkMacSystemFont,Segoe UI,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol",
              full: e,
              fontWeight: isSelected ? 500 : 100,
              cursor: "pointer",
            },
            name: `item-${Math.floor(startIndex) + i}`,
          });
        });
      }



      return keyshape;
    },
    getAnchorPoints() {
      return [
        [0, 0],
        [1, 0],
      ];
    },
  });

  const dataTransform = (data) => {
    const nodes = [];
    const edges = [];

    data.map((node) => {
      nodes.push({
        ...node
      });
      if (node.attrs) {
        node.attrs.forEach((attr) => {
          if (attr.relation) {
            attr.relation.forEach((relation) => {
              edges.push({
                source: node.id,
                target: relation.nodeId,
                sourceKey: attr.key,
                targetKey: relation.key,
                label: relation.label,
              });
            });
          }

        });
      }
    });

    return {
      nodes,
      edges,
    };
  }

  useEffect(() => {
    const container = document.getElementById('container');

    const width = container.scrollWidth;
    const height = (container.scrollHeight || 500) - 20;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      defaultNode: {
        size: [300, 200],
        type: 'dice-er-box',
        color: '#5B8FF9',
        style: {
          fill: '#9EC9FF',
          lineWidth: 3,
        },
        labelCfg: {
          style: {
            fill: 'black',
            fontSize: 20,
          },
        },
      },
      defaultEdge: {
        type: 'dice-er-edge',
        style: {
          stroke: '#e2e2e2',
          lineWidth: 4,
          // endArrow: true,
        },
      },
      modes: {
        default: ['drag-node', 'drag-canvas'],
      },
      layout: {
        type: 'dagre',
        rankdir: 'LR',
        align: 'UL',
        controlPoints: true,
        nodesepFunc: () => 0.2,
        ranksepFunc: () => 0.5,
      },
      animate: true,
      // fitView: true
    })

    graph.data(dataTransform(rawData));

    graph.render();
  }, [])



  return (
    <div id={'container'}></div>
  )

}




