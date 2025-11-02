import { getBaseBlockStyles } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFNodeRendererProps, PDFRenderer } from "@/features/pdf-renderer/pdf-renderer"
import { RowBlockTreeNode } from "@/features/tree/tree"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"

export function PDFRowBlock({ node, parent }: PDFNodeRendererProps<RowBlockTreeNode>) {
  const styles: ViewStyle = {
    ...getBaseBlockStyles(node, parent),
    display: "flex",
    flexDirection: "row",
    gap: node.block.spacing,
  }

  return (
    <View style={styles}>
      <PDFRenderer
        nodes={node.children}
        parent={node}
      />
    </View>
  )
}
