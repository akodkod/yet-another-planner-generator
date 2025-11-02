// oxlint-disable rules-of-hooks
import { TreeNode } from "@/features/tree/tree"
import { findTreeNode, updateTreeNode } from "@/features/tree/tree-utils"
import { StoreModule } from "@/lib/modules/core/store"
import { DefaultTemplate } from "@/lib/templates/default/default"
import { assert } from "@/lib/utils/code-execution"
import { nanoid } from "@/lib/utils/nanoid"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { useShallow } from "zustand/react/shallow"

type Store = {
  trees: Record<string, TreeNode>
}

class TreeStoreModule extends StoreModule<Store> {
  moduleName = "app-settings"

  store = create<Store>()(
    persist(
      (_set) => ({
        trees: {},
      }),
      {
        name: "tree-store-storage",
        storage: createJSONStorage(() => localStorage),
      },
    ),
  )

  public createDefaultTree() {
    const id = nanoid()
    const tree = structuredClone(DefaultTemplate)
    this.setTree(id, tree)

    return id
  }

  public useTree(id: string) {
    return this.store(useShallow((state) => state.trees[id]))
  }

  public getTree(id: string) {
    return this.store((state) => state.trees[id])
  }

  public setTree(id: string, tree: TreeNode) {
    this.store.setState((state) => ({
      ...state,
      trees: {
        ...state.trees,
        [id]: tree,
      },
    }))
  }

  public useNode<T extends TreeNode = TreeNode>(treeId: string, nodeId: string) {
    return this.store(useShallow((state) => {
      const tree = state.trees[treeId]
      assert(tree, `Tree ${treeId} not found`)

      const node = findTreeNode(tree, nodeId)
      assert(node, `Node ${nodeId} not found in tree ${treeId}`)

      return node as T
    }))
  }

  public updateNode<T extends TreeNode>(treeId: string, node: T) {
    this.store.setState((state) => {
      const tree = state.trees[treeId]
      if (!tree) return state

      return {
        ...state,
        trees: {
          ...state.trees,
          [treeId]: updateTreeNode(tree, node),
        },
      }
    })
  }
}

export const TreeStore = new TreeStoreModule()
