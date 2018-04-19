import {Step} from "./step";

export class Node {
    clazz: string;
    // value: string;
    rowNum: number;
    x: number;
    y: number;
    node: Node;
    _id: string;
    _createDateString: string;
    _createDateNum: number;
    CreatedBy: string;
    ModifiedBy: string;
    ActiveFlag: boolean;
    Key: string;
    Type: number;
    // Value: Map<string, string>;
    Value: any;

    setChildNode(node: Node): Node {
        this.node = node;
        return node;
    }
    constructor(value: string, rowNum: number) {

        // this.value = value;
        this.rowNum = rowNum;

    }

    public toString(lan: string): string {// 0
        let con = '';

        if (this.Type === 1) {
            if (lan === 'cn') {
                con = '<label>' + this.Value.Texts.cn + '</label>';
            } else if (lan === 'en') {
                con = '<label>' + this.Value.Texts.en + '</label>';
            }
        } else if (this.Type === 2) {
            if (this.Value.Type === 'text') {
                con = '<input type="text" value="' + this.Value.DataSource + '"</input>';
            } else if (this.Value.Type === 'select') {
                con = '<select></select>';
            }
        }
        return '<td  rowSpan="' + this.rowNum + '" >' + con + '</td>';
    }
}


export class TopNode {
    instanceId: number;
    createTime: number;
    modifiedTime: number;
    totalClazz: string;
    TemplateName: string;
    TemplateType: string;
    nodeList: Array<Node> = new Array<Node>();
}

