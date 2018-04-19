import {Node, TopNode} from "./Node";

export class NodeUtil {
  public static getTable(topNode: TopNode, lan: string): String {
    NodeUtil.setIndex2(topNode);
    const nodes: Node[][] = NodeUtil.get2DArray(topNode);
    let s: String = '<table style="margin:0px;" class="table table-striped">';
    const nodesWith: number = NodeUtil.getWith(topNode);
    const nodesHeight: number = NodeUtil.getHeight(topNode);
    for (let i = 0; i < nodesHeight; i++) {
      s += '<tr>';
      for (let j = 0; j < nodesWith; j++) {
        if (nodes[i][j] != null) {
          s += nodes[i][j].toString(lan);
        }
      }
      s += '</tr>';
    }
    s += '</table>';
    return s;

  }
  public static setIndex1(y: number, x: number, node: Node) {
    node.y = y;
    node.x = x;
    if (node.node != null) {
      NodeUtil.setIndex1(y + node.rowNum, x, node.node);
    }


  }
  public static setIndex2(topNode: TopNode) {
    for (let i = 0; i < topNode.nodeList.length; i++) {
      NodeUtil.setIndex1(0, i, topNode.nodeList[i]);
    }
  }
  public static getHeight(topNode: TopNode): number {
    let node: Node = topNode.nodeList[0];
    let n = node.rowNum;
    while (node.node != null) {
      n += node.node.rowNum;
      node = node.node;
    }
    //  System.out.println('height '+n);
    return n;
  }
  public static getWith(topNode: TopNode): number {
    //  System.out.println('width '+topNode.nodeList.size());
    return topNode.nodeList.length;

  }
  public static get2DArray(topNode: TopNode): Node[][] {
    console.log(topNode.nodeList.length);
    const h = NodeUtil.getHeight(topNode);
    const w = NodeUtil.getWith(topNode);
    const nodes = new Array();         // 先声明一维
    for (let i = 0; i < h; i++) {          // 一维长度为5
      nodes[i] = new Array(i);    // 在声明二维
      for (let j = 0; j < w; j++) {      // 二维长度为5
        nodes[i][j] = undefined;
      }
    }
    // const nodes: Node[][] = new Node[NodeUtil.getHeight(topNode)][NodeUtil.getWith(topNode)];

    for (let i = 0; i < topNode.nodeList.length; i++) {
      NodeUtil.putNode(nodes, topNode.nodeList[i]);
    }
    return nodes;
  }
  public static putNode(nodes: Node[][], node: Node) {
    // NodeUtil.print2D(nodes);
    nodes[node.y][node.x] = node; // y涓虹旱鍧愭爣锛屼负琛屾暟
    if (node.node !== undefined) {
      NodeUtil.putNode(nodes, node.node);
    }

  }
  public static print2D(nodes: Node[][]) {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 3; j++) {
        console.log(nodes[i][j] + ' ');
      }
      console.log('\n');
    }
  }
  public static main(): String {
    const map = new Map<string, string>();
    map.set('Ch', '你好');
    map.set('En', 'hello');

    const topNode: TopNode = new TopNode();
    const node1: Node = new Node('1', 1);
    node1.Type = 1;

    node1.Value = {
      Texts: {
        'en': 'Project Closing CheckList',
        'cn': '你好'
      }

    };
    node1.Type = 1;
    const node2: Node = new Node('1', 1);
    node2.Value = node1.Value;
    node2.Type = 1;
    const node3: Node = new Node('1', 1);
    node3.Value = node1.Value;
    node3.Type = 1;

    const node4 = new Node('2', 2);
    node4.Value = node1.Value;
    node4.Type = 1;

    const node5 = new Node('2', 1);
    node5.Value = node1.Value;
    node5.Type = 1;

    const node6 = new Node('2', 1);
    node6.Value = node1.Value;
    node6.Type = 1;

    const node7 = new Node('2', 2);
    node7.Value = {
      _t: 'Field',
      Type: 'text',
      DataSource: 'hello'
    };
    node7.Type = 2;


    node1.setChildNode(node4);
    node2.setChildNode(node5).setChildNode(node6);
    node3.setChildNode(node7);
    topNode.nodeList.push(node1);
    topNode.nodeList.push(node2);
    topNode.nodeList.push(node3);
    const s: String = NodeUtil.getTable(topNode, 'en');
    console.log(s);
    return s;
    //  FileWriter fw=new FileWriter(new File('src/table.html'));
    //  fw.write(s);
    //  fw.flush();
    //  fw.close();

  }

}
