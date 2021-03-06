export interface TreeData {
  title: string;
  key: string;
  children?: TreeData[];
}

export interface TreeOwnProps {
  data: TreeData[];
  title?: string; 
  className?: string;
}

export interface TreeNodeOwnProps {
  node: TreeData;
  setNodeId: (nodeId: string) => void;
  nodeId: string;
  style?: string;
}
