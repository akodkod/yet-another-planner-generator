import { InspectorRootChapter } from "@/features/inspector/chapters/inspector-root-chapter"
import { InspectorTextBlock } from "@/features/inspector/blocks/inspector-text-block"
import { TreeStore } from "@/features/tree-store/tree-store"
import { TreeNodeType } from "@/features/tree/tree"
import { findTreeNode } from "@/features/tree/tree-utils"
import { match } from "ts-pattern"
import { InspectorColumnBlock } from "@/features/inspector/blocks/inspector-column-block"
import { Fragment } from "react/jsx-runtime"

export type InspectorProps = {
  treeId: string
  nodeId: string | null
}

export function Inspector({ treeId, nodeId }: InspectorProps) {
  const tree = TreeStore.useTree(treeId)
  if (!nodeId) return null

  const node = findTreeNode(tree, nodeId)
  if (!node) return null

  return (
    <Fragment key={`${treeId}-${nodeId}`}>
      {match(node)
        .with({ type: TreeNodeType.RootChapter }, () => (
          <InspectorRootChapter
            treeId={treeId}
            nodeId={nodeId}
          />
        ))
        .with({ type: TreeNodeType.ColumnBlock }, () => (
          <InspectorColumnBlock
            treeId={treeId}
            nodeId={nodeId}
          />
        ))
        .with({ type: TreeNodeType.TextBlock }, () => (
          <InspectorTextBlock
            treeId={treeId}
            nodeId={nodeId}
          />
        ))
        .otherwise((node) => node.type)}
    </Fragment>
  )
}

export type InspectorNodeRendererProps = {
  treeId: string
  nodeId: string
}
