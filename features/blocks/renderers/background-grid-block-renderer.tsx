import { BackgroundGridBlock, BackgroundGridSpacing, BackgroundGridType } from "@/features/blocks/block-types"
import { BlockRendererProps } from "@/features/blocks/blocks-renderer"
import { getBaseBlockStyles } from "@/features/blocks/renderers/base-block-renderer"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { View } from "@react-pdf/renderer"
import { match } from "ts-pattern"

export function BackgroundGridBlockRenderer({ block, parent }: BlockRendererProps<BackgroundGridBlock>) {
  const styles: ViewStyle = {
    ...getBaseBlockStyles(block, parent),
    ...getBackgroundGridStyles(block),
  }

  return <View style={styles} />
}

// Properly align the background grid with the content
export function getBackgroundGridStyles(block: BackgroundGridBlock): ViewStyle {
  const { gridColor, gridLineWidth: lineWidth, gridSpacing } = block

  const spacing = match(gridSpacing)
    .with(BackgroundGridSpacing.Small, () => 20)
    .with(BackgroundGridSpacing.Medium, () => 40)
    .with(BackgroundGridSpacing.Large, () => 60)
    .exhaustive()

  const halfSpacing = spacing / 2
  const halfLineWidth = lineWidth / 2

  return match<BackgroundGridType, ViewStyle>(block.gridType)
    .with(BackgroundGridType.Dots, () => ({
      backgroundImage: `radial-gradient(${gridColor} ${lineWidth}px, transparent 0)`,
      backgroundSize: `${spacing}px ${spacing}px`,
      backgroundPosition: `-${halfSpacing - halfLineWidth}px -${halfSpacing - halfLineWidth}px`,
      backgroundRepeat: "space",
    }))
    .with(BackgroundGridType.Lines, () => ({
      backgroundImage: `linear-gradient(to bottom, ${gridColor} ${lineWidth}px, transparent 0)`,
      backgroundSize: `${spacing}px ${spacing}px`,
      backgroundPosition: `0 -${halfSpacing - halfLineWidth}px`,
      backgroundRepeat: "space",
    }))
    .with(BackgroundGridType.Squares, () => ({
      backgroundImage: `linear-gradient(to right, ${gridColor} ${lineWidth}px, transparent 0), linear-gradient(to bottom, ${gridColor} ${lineWidth}px, transparent 0)`,
      backgroundSize: `${spacing}px ${spacing}px`,
      backgroundPosition: `-${halfSpacing - halfLineWidth}px -${halfSpacing - halfLineWidth}px`,
      backgroundRepeat: "space",
    }))
    .exhaustive()
}
