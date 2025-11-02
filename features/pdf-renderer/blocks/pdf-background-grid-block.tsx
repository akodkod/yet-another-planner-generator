import { getBaseBlockStyles } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFNodeRendererProps } from "@/features/pdf-renderer/pdf-renderer"
import { BackgroundGridBlockTreeNode } from "@/features/tree/tree"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"

export function PDFBackgroundGridBlock({ node, parent }: PDFNodeRendererProps<BackgroundGridBlockTreeNode>) {
  const styles: ViewStyle = {
    ...getBaseBlockStyles(node, parent),
    backgroundColor: "#fafafa",
    borderRadius: 16,
  }

  return <View style={styles} />
}
