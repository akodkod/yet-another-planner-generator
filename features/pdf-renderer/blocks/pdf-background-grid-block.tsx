import { getBaseBlockStyle } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { BackgroundGridBlockTreeNode, TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"

export function PDFBackgroundGridBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.BackgroundGridBlock)
  const parent = Trees.useParentNode(treeId, nodeId)

  const style: ViewStyle = {
    ...getBaseBlockStyle(node, parent),
    backgroundColor: "#fafafa",
    borderRadius: 16,
  }

  const Content = html ? ContentHTML : ContentPDF

  return (
    <Content
      node={node}
      style={style}
    />
  )
}

type ContentProps = {
  node: BackgroundGridBlockTreeNode
  style: ViewStyle
}

function ContentPDF({ style }: ContentProps) {
  return (
    <View style={style} />
  )
}

function ContentHTML({ node, style }: ContentProps) {
  const { onNodeClick } = usePDFRenderer()

  return (
    <div
      style={style}
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation()
        onNodeClick?.(node.id)
      }}
    />
  )
}
