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

  const { list, title } = data || {}

  return (
    <div className={`nodeCard`}>
      <div className="nodeCard_title">
        <span className="nodeCard_title__inner">{title}</span>
        <div className="nodeCard_title_options" onClick={() => { console.log(8888888) }}>{iconNode('icon-shezhi', '#fff')}</div>
      </div>
      <div className="nodeCard_content_list">
        {
          list.length > 0 && list.map((item: { keyName: string, type: string, size: number }, i) => (
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
    // <div className="text-updater-node">
    //   <Handle type="target" position={Position.Top} />
    //   <div>
    //     <label htmlFor="text">Text:</label>
    //     <input id="text" name="text" onChange={onChange} />
    //   </div>
    //   <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
    //   <Handle type="source" position={Position.Bottom} id="b" />
    // </div>
  );
}

export default TextUpdaterNode;