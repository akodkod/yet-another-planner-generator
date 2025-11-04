import { TreeNode, BlockNode, Node, TreeNodeTopLevelTypes, TreeNodeSectionType, TreeNodeBlockType, TreeNodeBlockTypes, TreeNodeType, TreeNodeByType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"
import { Any } from "@/lib/utils/types"

export function isNode(node: TreeNode): node is Node {
  return TreeNodeTopLevelTypes.includes(node.type as TreeNodeSectionType)
}

export function isBlockNode(node: TreeNode): node is BlockNode {
  return TreeNodeBlockTypes.includes(node.type as TreeNodeBlockType)
}

export function findTreeNode(tree: TreeNode, id: string): TreeNode | null {
  if (tree.id === id) return tree

  for (const child of tree.children) {
    const result = findTreeNode(child, id)
    if (result) return result
  }

  return null
}

export function findParentTreeNode(tree: TreeNode, id: string): TreeNode | null {
  if (tree.id === id) return null

  for (const child of tree.children) {
    if (child.id === id) return tree

    const result = findParentTreeNode(child, id)
    if (result) return result
  }

  return null
}

export function findParentTreeNodeOfType<T extends TreeNodeType>(
  tree: TreeNode,
  currentNodeId: string,
  type: T,
): TreeNodeByType<T> | null {
  const parent = findParentTreeNode(tree, currentNodeId)
  if (!parent) return null

  if (parent.type === type) {
    return parent as TreeNodeByType<T>
  } else {
    return findParentTreeNodeOfType(tree, parent.id, type)
  }
}

export function updateTreeNode<T extends TreeNode>(tree: TreeNode, node: T, updater: (node: T) => T): TreeNode {
  if (tree.id === node.id) {
    const newNode = updater(node)

    return {
      ...newNode,
      children: tree.children,
    } as T
  }

  let changed = false

  const newChildren = tree.children.map((child) => {
    const replacedChild = updateTreeNode(child, node, updater)

    if (replacedChild !== child) {
      changed = true
    }

    return replacedChild
  })

  if (changed) {
    return {
      ...tree,
      children: newChildren as Any,
    }
  }

  return tree
}

export function dupTree<T extends TreeNode>(tree: T): T {
  let newTree = structuredClone(tree)
  return regenerateTreeIds(newTree)
}

function regenerateTreeIds<T extends TreeNode>(tree: T): T {
  tree.id = genTreeNodeId(tree.type)

  for (const child of tree.children) {
    regenerateTreeIds(child)
  }

  return tree
}
