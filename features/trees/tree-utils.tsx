import { TreeNode, BlockTreeNode, ChapterTreeNode, TreeNodeChapterTypes, TreeNodeChapterType, TreeNodeBlockType, TreeNodeBlockTypes } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"
import { Any } from "@/lib/utils/types"

export function isChapterTreeNode(node: TreeNode): node is ChapterTreeNode {
  return TreeNodeChapterTypes.includes(node.type as TreeNodeChapterType)
}

export function isBlockTreeNode(node: TreeNode): node is BlockTreeNode {
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

export function updateTreeNode<T extends TreeNode>(tree: TreeNode, node: T): TreeNode {
  if (tree.id === node.id) return node

  let changed = false

  const newChildren = tree.children.map((child) => {
    const replacedChild = updateTreeNode(child, node)

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
