import { getBaseBlockStyles } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFRenderChildren } from "@/features/pdf-renderer/pdf-render-children"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"
import { Trees } from "@/features/trees/trees"

export function PDFColumnBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.ColumnBlock)
  const parent = Trees.useParentNode(treeId, nodeId)

  const styles: ViewStyle = {
    ...getBaseBlockStyles(node, parent),
    display: "flex",
    flexDirection: "column",
    gap: node.block.spacing,
  }

  return (
    <View style={styles}>
      <PDFRenderChildren nodeId={node.id} />
    </View>
  )
}
