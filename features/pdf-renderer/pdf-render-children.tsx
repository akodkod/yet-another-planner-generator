import { PDFRenderNode } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { Trees } from "@/features/trees/trees"

export type PDFRenderChildrenProps = {
  nodeId: string
}

export function PDFRenderChildren({ nodeId }: PDFRenderChildrenProps) {
  const { treeId } = usePDFRenderer()
  const children = Trees.useNodeChildrenIdAndType(treeId, nodeId)

  return children.map((node) => (
    <PDFRenderNode
      key={node.id}
      node={node}
    />
  ))
}
