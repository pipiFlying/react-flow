import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { createFromIconfontCN } from '@ant-design/icons';
import './styles.less'

const handleStyle = { left: 10 };

const nodeBaseStyle = {
  background: "#0FA9CC",
  width: '8px',
  height: '8px',
};

const nodeLeftTopStyle = {
  ...nodeBaseStyle,
  // top: 60,
};

function TextUpdaterNode({ data }) {

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

  const { list, title } = data || {};

  console.log(isArray(list), 'isArray')

  return (
    <div className={`nodeCard`}>
      <div className="nodeCard_title">
        <span className="nodeCard_title__inner">{title}</span>
        <div className="nodeCard_title_options" onClick={() => { console.log(8888888) }}>{iconNode('icon-shezhi', '#fff')}</div>
      </div>
      <div className="nodeCard_content_list">
        {
          isArray(list) && list.map((item: { keyName: string, type: string, size: number }, i) => (
            <div className="nodeCard_content_list__item" key={i}>
              <span className="nodeCard_content_list_label">{item?.keyName}</span>
              <span className="nodeCard_content_list_type">{item?.type}{`(${item.size})`}</span>
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