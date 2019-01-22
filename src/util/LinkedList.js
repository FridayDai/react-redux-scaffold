/**
 * Created by yi.dai on 2019/1/21.
 */
export class Node {
  constructor(data) {
    this.next = null;
    this.data = data;
  }
}

export default class LinkedList {
  constructor() {
    this.header = new Node('header');
  }

  indexOf(data) {
    let currentNode = this.header;
    let i = -1;
    while (currentNode.data !== data) {
      currentNode = currentNode.next;
      i++;
    }
    return i;
  }

  findNode(data) {
    let currentNode = this.header;
    while (currentNode.data !== data) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }

  insert(data) {
    const node = new Node(data);

    let lastNode = this.header;
    while (lastNode.next !== null) {
      lastNode = lastNode.next;
    }
    lastNode.next = node;
  }

  remove(data) {
    const currentNode = this.findNode(data);

    let preNode = this.header;
    while (preNode.next !== currentNode) {
      preNode = preNode.next;
    }

    preNode.next = currentNode.next;
  }

  reverse() {

  }
}
