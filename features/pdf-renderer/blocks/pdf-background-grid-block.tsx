import { getBaseBlockStyles } from "@/features/pdf-renderer/blocks/pdf-base-block"
import { PDFRenderNodeContentProps } from "@/features/pdf-renderer/pdf-render-node"
import { usePDFRenderer } from "@/features/pdf-renderer/pdf-renderer-context"
import { TreeNodeType } from "@/features/trees/tree"
import { Trees } from "@/features/trees/trees"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"

export function PDFBackgroundGridBlock({ nodeId }: PDFRenderNodeContentProps) {
  const { treeId } = usePDFRenderer()

  const node = Trees.useNodeOf(treeId, nodeId, TreeNodeType.BackgroundGridBlock)
  const parent = Trees.useParentNode(treeId, nodeId)

  const styles: ViewStyle = {
    ...getBaseBlockStyles(node, parent),
    backgroundColor: "#fafafa",
    borderRadius: 16,
  }

  return <View style={styles} />
}
