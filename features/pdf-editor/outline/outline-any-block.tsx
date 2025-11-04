import { OutlineItem } from "@/features/pdf-editor/outline/outline-item"
import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeBlockType, TreeNodeBlockTypes, TreeNodeType } from "@/features/trees/tree"
import { truncate } from "@/lib/utils/string"
import { ColumnsIcon, GridIcon, LucideIcon, RowsIcon, TypeIcon } from "lucide-react"
import { match } from "ts-pattern"

export function OutlineAnyBlock({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeAnyOf(nodeId, TreeNodeBlockTypes)
  const hasChildren = PDFEditor.useHasChildren(nodeId)

  const name = match(node)
    .with({ type: TreeNodeType.ColumnBlock }, () => "Horizontal Stack")
    .with({ type: TreeNodeType.RowBlock }, () => "Vertical Stack")
    .with({ type: TreeNodeType.TextBlock }, (node) => truncate(node.data.content, 40).trim())
    .with({ type: TreeNodeType.BackgroundGridBlock }, () => "Background Grid")
    .exhaustive()

  return (
    <OutlineItem
      name={name}
      icon={blockIconMap[node.type]}
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

const blockIconMap: Record<TreeNodeBlockType, LucideIcon> = {
  [TreeNodeType.ColumnBlock]: RowsIcon,
  [TreeNodeType.RowBlock]: ColumnsIcon,
  [TreeNodeType.TextBlock]: TypeIcon,
  [TreeNodeType.BackgroundGridBlock]: GridIcon,
}
