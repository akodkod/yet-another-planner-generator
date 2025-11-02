import { BlockSizeType } from "@/features/blocks/block-types"
import { BlockTreeNode, TreeNode, TreeNodeType } from "@/features/tree/tree"
import { isBlockTreeNode } from "@/features/tree/tree-utils"
import { ViewStyle } from "@/lib/utils/react-pdf"
import { match } from "ts-pattern"

export function getBaseBlockStyles(node: BlockTreeNode, parent: TreeNode | null): ViewStyle {
  return {
    ...getSizeStyles(node, parent && isBlockTreeNode(parent) ? parent : null),
    ...node.block.style,
  }
}

function getSizeStyles(node: BlockTreeNode, parent: BlockTreeNode | null): ViewStyle {
  if (!parent) {
    return {
      width: "100%",
      height: "100%",
    }
  }

  const { block } = node

  return match(parent)
    .with({ type: TreeNodeType.ColumnBlock }, () => ({
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
    .with({ type: TreeNodeType.RowBlock }, () => ({
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
