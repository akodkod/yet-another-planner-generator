import { OutlineItem } from "@/features/pdf-editor/outline/outline-item"
import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeBlockTypes, TreeNodeType } from "@/features/trees/tree"
import { treeIconsMap } from "@/features/trees/tree-icons"
import { truncate } from "@/lib/utils/string"
import { match } from "ts-pattern"

export function OutlineAnyBlock({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeAnyOf(nodeId, TreeNodeBlockTypes)
  const hasChildren = PDFEditor.useHasChildren(nodeId)

  const name = match(node)
    .with({ type: TreeNodeType.ColumnBlock }, () => "Vertical Blocks")
    .with({ type: TreeNodeType.RowBlock }, () => "Horizontal Blocks")
    .with({ type: TreeNodeType.TextBlock }, (node) => truncate(node.data.content, 40).trim())
    .with({ type: TreeNodeType.BackgroundGridBlock }, () => "Background Grid")
    .exhaustive()

  return (
    <OutlineItem
      nodeId={nodeId}
      name={name}
      icon={treeIconsMap[node.type]}
      // oxlint-disable-next-line no-children-prop
      children={(
        hasChildren ? (
          <OutlineRenderChildren nodeId={node.id} />
        ) : (
          undefined
        )
      )}
      onClick={() => PDFEditor.selectNode(nodeId)}
    />
  )
}
