import { BaseBlock, Block, BlockSizeType, BlockType } from "@/features/blocks/block-types"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { match } from "ts-pattern"

export function getBaseBlockStyles(block: BaseBlock, parent: Block | null): ViewStyle {
  return {
    ...getSizeStyles(block, parent),
    ...block.style,
  }
}

function getSizeStyles(block: BaseBlock, parent: Block | null): ViewStyle {
  if (!parent) {
    return {
      width: "100%",
      height: "100%",
    }
  }

  return match(parent)
    .with({ type: BlockType.Column }, () => ({
      ...match(block.width)
        .with({ type: BlockSizeType.Auto }, () => ({ width: "auto" }))
        .with({ type: BlockSizeType.Full }, () => ({ width: "100%" }))
        .with({ type: BlockSizeType.Percentage }, (width) => ({ width: `${width.percentage}%` }))
        .with({ type: BlockSizeType.Pixels }, (width) => ({ width: `${width.pixels}px` }))
        .exhaustive(),

      ...match(block.height)
        .with({ type: BlockSizeType.Auto }, () => ({ height: "auto" }))
        .with({ type: BlockSizeType.Full }, () => ({ flex: 1 }))
        .with({ type: BlockSizeType.Percentage }, (height) => ({ height: `${height.percentage}%` }))
        .with({ type: BlockSizeType.Pixels }, (height) => ({ height: `${height.pixels}px` }))
        .exhaustive(),
    }))
    .with({ type: BlockType.Row }, () => ({
      ...match(block.width)
        .with({ type: BlockSizeType.Auto }, () => ({ width: "auto" }))
        .with({ type: BlockSizeType.Full }, () => ({ flex: 1 }))
        .with({ type: BlockSizeType.Percentage }, (width) => ({ width: `${width.percentage}%` }))
        .with({ type: BlockSizeType.Pixels }, (width) => ({ width: `${width.pixels}px` }))
        .exhaustive(),

      ...match(block.height)
        .with({ type: BlockSizeType.Auto }, () => ({ height: "auto" }))
        .with({ type: BlockSizeType.Full }, () => ({ height: "100%" }))
        .with({ type: BlockSizeType.Percentage }, (height) => ({ height: `${height.percentage}%` }))
        .with({ type: BlockSizeType.Pixels }, (height) => ({ height: `${height.pixels}px` }))
        .exhaustive(),
    }))
    .otherwise(() => {
      throw new Error("Parent is not a column or row")
    })
}
