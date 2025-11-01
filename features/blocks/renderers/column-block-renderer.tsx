import { ColumnBlock } from "@/features/blocks/block-types"
import { BlockRendererProps, BlocksRenderer } from "@/features/blocks/blocks-renderer"
import { getBaseBlockStyles } from "@/features/blocks/renderers/base-block-renderer"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"

export function ColumnBlockRenderer({ block, parent }: BlockRendererProps<ColumnBlock>) {
  const styles: ViewStyle = {
    ...getBaseBlockStyles(block, parent),
    display: "flex",
    flexDirection: "column",
    gap: block.spacing,
  }

  return (
    <View style={styles}>
      <BlocksRenderer
        blocks={block.children}
        parent={block}
      />
    </View>
  )
}
