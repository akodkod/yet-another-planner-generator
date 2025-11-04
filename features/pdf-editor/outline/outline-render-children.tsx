import { OutlineRenderNode } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"

export type OutlineRenderChildrenProps = {
  nodeId: string
}

export function OutlineRenderChildren({ nodeId }: OutlineRenderChildrenProps) {
  const children = PDFEditor.useNodeChildrenIdAndType(nodeId)

  return children.map((node) => (
    <OutlineRenderNode
      key={node.id}
      node={node}
    />
  ))
}
