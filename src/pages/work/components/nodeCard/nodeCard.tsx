import { useCallback, useState, useEffect } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { createFromIconfontCN } from '@ant-design/icons';
import './styles.less'

interface NodeList {
  keyName: string
  type: string
  size: number
}

interface Props {
  selected: boolean
  data: {
    list: [],
    title: string
  }
}

const nodeBaseStyle = {
  background: "#0FA9CC",
  width: '8px',
  height: '8px',
};

const nodeLeftTopStyle = {
  ...nodeBaseStyle,
};

const cstyle = '1px solid red';

function TextUpdaterNode(props: Props) {
  console.log(props, 'props')
  const { selected } = props || {};
  const { list, title } = props?.data || {};

  // 设置图标
  const iconNode = (iconName: string, color: string) => {
    const IconFont = createFromIconfontCN({
      scriptUrl: '//at.alicdn.com/t/font_3285779_7xo6oyeck8.js',
    });
    return <IconFont type={iconName} style={{ color: `${color}` }} />;
  };

  // 判断变量是否为数组
  const isArray = (obj) => {
    return obj instanceof Array;
  };

  // 判断点击的哪个节点
  const onChange = useCallback((evt) => {
    let arr = evt.target.className.split(/\s+/); // 以空格为分割线切成数组
  }, []);

  return (
    <div className={`nodeCard`}
      style={{ border: selected ? cstyle : '1px solid #4ba7c8' }}
      onClick={(evt) => { onChange(evt) }}>
      <div className="nodeCard_title">
        <span className="nodeCard_title__inner">{title}</span>
        <div className="nodeCard_title_options" onClick={() => { console.log(8888888) }}>{iconNode('icon-shezhi', '#fff')}</div>
      </div>
      <div className="nodeCard_content_list">
        {
          isArray(list) && list.map((item: NodeList, i: number) => (
            <div className="nodeCard_content_list__item" key={i}>
              <span className="nodeCard_content_list_label">{item?.keyName}</span>
              <span className="nodeCard_content_list_type">{item?.type}{`(${item?.size})`}</span>
            </div>
          ))
        }
      </div>
      <div className="nodeCard_footer">
        <span className="nodeCard_footer__inner">More Fields</span>
      </div>
      <Handle type="target" position={Position.Left} style={nodeLeftTopStyle} />
      <Handle type="source" position={Position.Right} style={nodeLeftTopStyle} id="a" />
    </div>
  );
}

export default TextUpdaterNode;