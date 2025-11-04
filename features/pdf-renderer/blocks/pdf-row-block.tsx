import { getBaseBlockStyle } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { RowBlockNode, TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees.module"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"
import { ReactNode } from "react"

export function PDFRowBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId, html } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.RowBlock)
  const parent = Trees.useParentNode(treeId, nodeId)

  const style: ViewStyle = {
    ...getBaseBlockStyle(node, parent),
    display: "flex",
    flexDirection: "row",
    gap: node.data.spacing,
  }

  const Content = html ? ContentHTML : ContentPDF

  return (
    <Content
      node={node}
      style={style}
    >
      <PDFRenderChildren nodeId={node.id} />
    </Content>
  )
}

type ContentProps = {
  node: RowBlockNode
  style: ViewStyle
  children: ReactNode
}

function ContentPDF({ style, children }: ContentProps) {
  return (
    <View style={style}>
      {children}
    </View>
  )
}

function ContentHTML({ node, style, children }: ContentProps) {
  const { onNodeClick } = usePDFRenderer()

  return (
    <div
      style={style}
      className="cursor-pointer"
      onClick={(event) => {
        event.stopPropagation()
        onNodeClick?.(node.id)
      }}
    >
      {children}
    </div>
  )
}
