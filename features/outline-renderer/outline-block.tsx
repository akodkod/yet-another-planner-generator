import { OutlineItem } from "@/features/outline-renderer/outline-item"
import { OutlineRenderer, OutlineNodeRendererProps } from "@/features/outline-renderer/outline-renderer"
import { BlockTreeNode, TreeNodeType } from "@/features/tree/tree"
import { truncate } from "@/lib/utils/string"
import { ColumnsIcon, GridIcon, LucideIcon, RowsIcon, TypeIcon } from "lucide-react"
import { match } from "ts-pattern"

export function OutlineBlock({ node, onNodeSelect }: OutlineNodeRendererProps<BlockTreeNode>) {
  const { type } = node

  const name = match(node)
    .with({ type: TreeNodeType.ColumnBlock }, () => "Horizontal Stack")
    .with({ type: TreeNodeType.RowBlock }, () => "Vertical Stack")
    .with({ type: TreeNodeType.TextBlock }, (node) => truncate(node.block.content, 40).trim())
    .with({ type: TreeNodeType.BackgroundGridBlock }, () => "Background Grid")
    .exhaustive()

  return (
    <OutlineItem
      name={name}
      icon={blockIconMap[type]}
      // oxlint-disable-next-line no-children-prop
      children={(
        node.children.length > 0 ? (
          <OutlineRenderer
            nodes={node.children}
            parent={node}
            onNodeSelect={onNodeSelect}
          />
        ) : (
          undefined
        )
      )}
      onClick={() => onNodeSelect(node)}
    />
  )
}

const blockIconMap: Record<BlockTreeNode["type"], LucideIcon> = {
  [TreeNodeType.ColumnBlock]: RowsIcon,
  [TreeNodeType.RowBlock]: ColumnsIcon,
  [TreeNodeType.TextBlock]: TypeIcon,
  [TreeNodeType.BackgroundGridBlock]: GridIcon,
}
