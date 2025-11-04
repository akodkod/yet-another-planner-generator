import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeType } from "@/features/trees/tree"

export function OutlineYear({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.Year)
  return <OutlineRenderChildren nodeId={node.id} />
}
