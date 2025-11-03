// oxlint-disable rules-of-hooks
import { TreeNode, TreeNodeByType, TreeNodeType } from "@/features/trees/tree"
import { dupTree, findParentTreeNode, findParentTreeNodeOfType, findTreeNode, updateTreeNode } from "@/features/trees/tree-utils"
import { StoreModule } from "@/lib/modules/core/store"
import { DefaultTemplate } from "@/lib/templates/default/default"
import { assert } from "@/lib/utils/code-execution"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

type Store = {
  trees: Record<string, TreeNode>
}

class TreesModule extends StoreModule<Store> {
  moduleName = "trees"

  store = create<Store>()(
    // persist(
    devtools((_set) => ({
      trees: {},
    })),
    // {
    // name: "trees-storage",
    // storage: createJSONStorage(() => localStorage),
    // },
    // ),
  )

  createDefaultTree() {
    const tree = dupTree(DefaultTemplate)
    this.setTree(tree.id, tree)

    return tree
  }

  getTree(id: string) {
    return this.get("trees")[id]
  }

  setTree(id: string, tree: TreeNode) {
    this.store.setState((state) => ({
      ...state,
      trees: {
        ...state.trees,
        [id]: tree,
      },
    }))
  }

  useTree(treeId: string) {
    return this.useDeepShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      return tree
    })
  }

  useRootNode(treeId: string) {
    return this.useDeepShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      return {
        ...tree,
        children: [],
      }
    })
  }

  useNode(treeId: string, nodeId: string): TreeNode {
    return this.useDeepShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      const node = findTreeNode(tree, nodeId)
      assert(node, `Node "${nodeId}" not found in tree ${treeId}`)

      return {
        ...node,
        children: [],
      }
    })
  }

  useNodeOf<
    T extends TreeNodeType,
    R extends TreeNode = TreeNodeByType<T>,
  >(treeId: string, nodeId: string, type: T): R {
    const node = this.useNode(treeId, nodeId)
    assert(node.type === type, `Node with id ${nodeId} is not of type ${type}`)

    return node as R
  }

  useNodeAnyOf<
    T extends TreeNodeType[] | readonly TreeNodeType[],
    R extends TreeNode = TreeNodeByType<T[number]>,
  >(treeId: string, nodeId: string, types: T): R {
    const node = this.useNode(treeId, nodeId)
    assert(types.includes(node.type as T[number]), `Node with id ${nodeId} is not of types ${types.join(", ")}`)

    return node as R
  }

  useNodeChildrenIdAndType(treeId: string, nodeId: string) {
    return this.useDeepShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      const node = findTreeNode(tree, nodeId)
      assert(node, `Node "${nodeId}" not found in tree ${treeId}`)

      return node.children.map((child) => ({
        id: child.id,
        type: child.type as TreeNodeType,
      }))
    })
  }

  useParentNode(treeId: string, nodeId: string) {
    return this.useDeepShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      const node = findParentTreeNode(tree, nodeId)
      if (!node) return null

      return {
        ...node,
        children: [],
      }
    })
  }

  useParentNodeOfType<T extends TreeNodeType>(treeId: string, nodeId: string | null, type: T) {
    return this.useDeepShallow((state) => {
      if (!nodeId) return null

      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      const node = findParentTreeNodeOfType(tree, nodeId, type)
      if (!node) return null

      return {
        ...node,
        children: [],
      }
    })
  }

  useHasChildren(treeId: string, nodeId: string) {
    return this.store((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      const node = findTreeNode(tree, nodeId)
      if (!node) return false

      return node.children.length > 0
    })
  }

  updateNode<T extends TreeNode>(treeId: string, node: T, updater: (node: T) => T) {
    this.store.setState((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree "${treeId}" not found`)

      return {
        ...state,
        trees: {
          ...state.trees,
          [treeId]: updateTreeNode(tree, node, updater),
        },
      }
    })
  }
}

export const Trees = new TreesModule()
