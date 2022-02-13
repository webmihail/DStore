import { FC, useState } from "react";
import { TreeNodeOwnProps, TreeOwnProps } from "./types";
import styles from "./styles/tree.module.scss";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const AppTree: FC<TreeOwnProps> = ({ data, title, style }): JSX.Element => {
  const [visible, setVisible] = useState(false);
  const [nodeId, setNodeId] = useState("");
  const firstNode = data[0];
  const isChildVisible = firstNode.children && visible;
  const setNodeStyle = isChildVisible ? styles.firstVisible : styles.firstHide;
  const setRotateIconStyle = visible
    ? styles.titleIconForvard
    : styles.titleIconReverse;

  return (
    <div className={styles.wrapper}>
      {title && (
        <div className={styles.mainTitle} onClick={() => setVisible(!visible)}>
          <span>{title}</span>
          <span className={setRotateIconStyle}>
            {visible ? <MinusOutlined /> : <PlusOutlined />}
          </span>
        </div>
      )}
      <ul className={`${styles.treeNodeList} ${setNodeStyle} ${style}`}>
        {data.map((child) => (
          <TreeNode
            key={child.key}
            node={child}
            nodeId={nodeId}
            setNodeId={setNodeId}
          />
        ))}
      </ul>
    </div>
  );
};

const TreeNode: FC<TreeNodeOwnProps> = ({
  node,
  nodeId,
  setNodeId,
}): JSX.Element => {
  const isEquals = nodeId === node.key;
  const setNode = isEquals ? "" : node.key;
  const setNodeStyle = isEquals ? styles.secondVisible : styles.secondHide;
  const setRotateIconStyle = isEquals
    ? styles.titleIconForvard
    : styles.titleIconReverse;

  const titleWithChildren = (
    <div className={styles.nodeTitle} onClick={() => setNodeId(setNode)}>
      <span>{node.title}</span>
      <span className={setRotateIconStyle}>
        {nodeId === node.key ? <MinusOutlined /> : <PlusOutlined />}
      </span>
    </div>
  );

  const titleWithoutChild = (
    <span className={styles.lastNodeTitle}>{node.title}</span>
  );

  return (
    <li className={styles.treeNodeListItem}>
      {node.children ? titleWithChildren : titleWithoutChild}
      {node.children && <AppTree data={node.children} style={setNodeStyle} />}
    </li>
  );
};

export default AppTree;
