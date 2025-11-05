// oxlint-disable rules-of-hooks
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { StoreModule } from "@/lib/modules/core/store"
import { create } from "zustand"

type Store = {
  currentTreeId: string | null
  selectedNodeId: string | null
}

class PDFEditorModule extends StoreModule<Store> {
  moduleName = "pdf-editor"

  store = create<Store>(() => ({
    currentTreeId: null,
    selectedNodeId: null,
  }))

  selectNode(nodeId: string) {
    this.set({ selectedNodeId: nodeId })
  }

  useTreeId() {
    return this.useRequired("currentTreeId")
  }

  useRootNode() {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useRootNode(treeId)
  }

  useSelectedNodeId() {
    const rootNode = this.useRootNode()
    const nodeId = this.use("selectedNodeId")

    return nodeId ?? rootNode.id
  }

  useOptionalSelectedNodeId() {
    return this.use("selectedNodeId")
  }

  useSelectedNode() {
    const treeId = this.useRequired("currentTreeId")
    const nodeId = this.useSelectedNodeId()

    return Trees.useNode(treeId, nodeId)
  }

  useOptionalSelectedNode() {
    const treeId = this.useRequired("currentTreeId")
    const nodeId = this.useOptionalSelectedNodeId()

    return Trees.useOptionalNode(treeId, nodeId)
  }

  useNodeOf<T extends TreeNodeType>(nodeId: string, type: T) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useNodeOf(treeId, nodeId, type)
  }

  useNodeAnyOf<T extends TreeNodeType[] | readonly TreeNodeType[]>(nodeId: string, types: T) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useNodeAnyOf(treeId, nodeId, types)
  }

  useNodeChildrenIdAndType(nodeId: string) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useNodeChildrenIdAndType(treeId, nodeId)
  }

  useHasChildren(nodeId: string) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useHasChildren(treeId, nodeId)
  }

  useParentNode(nodeId: string | null) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useParentNode(treeId, nodeId)
  }

  useParentNodeOfType<T extends TreeNodeType>(nodeId: string | null, type: T) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useParentNodeOfType(treeId, nodeId, type)
  }

  useParentNodes(nodeId: string | null, limit = 3) {
    const treeId = this.useRequired("currentTreeId")
    return Trees.useParentNodes(treeId, nodeId, limit)
  }
}

export const PDFEditor = new PDFEditorModule()
