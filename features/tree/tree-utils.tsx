import { TreeNode, BlockTreeNode, ChapterTreeNode, TreeNodeChapterTypes, TreeNodeChapterType, TreeNodeBlockType, TreeNodeBlockTypes } from "@/features/tree/tree"
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
