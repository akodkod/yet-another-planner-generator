import { OutlineRenderNode } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"
import { Trees } from "@/features/trees/trees"

export function Outline() {
  const treeId = PDFEditor.useTreeId()
  const rootNode = Trees.useRootNode(treeId)

  return <OutlineRenderNode node={rootNode} />
}
