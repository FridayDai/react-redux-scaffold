/**
 * Created by yi.dai on 2019/1/21.
 */
class Node {
	constructor(value) {
		this.left = null;
		this.right = null;
		this.value = value;
	}
}

// 二分搜索树
export default class BSTree {
	constructor() {
		this.rootNode = null;
	}

	findNode(value) {
		if(this.rootNode !== null) {
			let currentNode = this.rootNode;
			if(currentNode.value === value) return currentNode;

			while(currentNode.value !== value) {
				if(currentNode.value > value) {
					currentNode = currentNode.left;
				} else if(currentNode.value < value) {
					currentNode = currentNode.right;
				}

				if(currentNode.value = value) {
					return currentNode;
				}
			}
		}

		return null;
	}

	getMax() {
		if(this.rootNode !== null) {
			let currentNode = this.rootNode;
			while (currentNode.right) {
				currentNode = currentNode.right;
			}
			return currentNode.value;
		}

		return null;
	}

	getMin() {
		if(this.rootNode !== null) {
			let currentNode = this.rootNode;
			while (currentNode.left) {
				currentNode = currentNode.left;
			}
			return currentNode.value;
		}

		return null;
	}

	add(value) {
		if(this.rootNode === null) {
			this.rootNode = new Node(value);
		} else {
			let currentNode = this.rootNode;
			while(currentNode) {
				if(currentNode.value === value) {
					return false;
				}

				if(currentNode.value > value) {
					if(!currentNode.left) {
						currentNode.left = new Node(value);
						return;
					} else {
						currentNode = currentNode.left;
					}
				} else if(currentNode.value < value) {
					if(!currentNode.right) {
						currentNode.right = new Node(value);
						return;
					} else {
						currentNode = currentNode.right;
					}
				}
			}
		}
	}




}