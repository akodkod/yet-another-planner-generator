import { OutlineItem } from "@/features/pdf-editor/outline/outline-item"
import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeType } from "@/features/trees/tree"
import { treeIconsMap } from "@/features/trees/tree-icons"
import { treeNodeNamesMap } from "@/features/trees/tree-node-names"
import { Button } from "@/lib/ui/button"
import { PlusIcon } from "lucide-react"

export function OutlineColumnBlock({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.ColumnBlock)
  const hasChildren = PDFEditor.useHasChildren(nodeId)

  return (
    <OutlineItem
      nodeId={nodeId}
      name={treeNodeNamesMap[node.type]}
      icon={treeIconsMap[node.type]}
      append={(
        <Button
          variant="ghost"
          size="icon-sm"
          className={`
            group-hover:opacity-100
            opacity-0 transition-opacity duration-200
            [&_svg]:text-muted-foreground
          `}
        >
          <PlusIcon />
        </Button>
      )}
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
