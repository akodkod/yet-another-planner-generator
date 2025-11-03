import { BlockSizeType } from "@/features/blocks/block-types"
import { BlockTreeNode, TreeNode, TreeNodeType } from "@/features/trees/tree"
import { isBlockTreeNode } from "@/features/trees/tree-utils"
import { Transform, ViewStyle } from "@/lib/utils/react-pdf"
import { CSSProperties } from "react"
import { match } from "ts-pattern"

export function getBaseBlockStyle(node: BlockTreeNode, parent: TreeNode | null): ViewStyle {
  return {
    ...getSizeStyle(node, parent && isBlockTreeNode(parent) ? parent : null),
    ...node.block.style,
  }
}

function getSizeStyle(node: BlockTreeNode, parent: BlockTreeNode | null): ViewStyle {
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

export function convertPDFStyleToHTMLStyle(style: ViewStyle): CSSProperties {
  const fontFamily = Array.isArray(style.fontFamily) ? style.fontFamily.join(", ") : style.fontFamily

  const transforms = Array.isArray(style.transform) ? style.transform : []
  const transform = transforms.map(transformToString).filter(Boolean).join(", ")

  return {
    display: style.display,
    width: style.width,
    height: style.height,
    minHeight: style.minHeight,
    maxHeight: style.maxHeight,
    minWidth: style.minWidth,
    maxWidth: style.maxWidth,
    padding: style.padding,
    paddingTop: style.paddingTop,
    paddingRight: style.paddingRight,
    paddingBottom: style.paddingBottom,
    paddingLeft: style.paddingLeft,
    margin: style.margin,
    marginTop: style.marginTop,
    marginRight: style.marginRight,
    marginBottom: style.marginBottom,
    marginLeft: style.marginLeft,
    flex: style.flex,
    flexDirection: style.flexDirection,
    flexWrap: style.flexWrap,
    flexGrow: style.flexGrow,
    flexShrink: style.flexShrink,
    flexBasis: style.flexBasis,
    gap: style.gap,
    justifyContent: style.justifyContent,
    alignItems: style.alignItems,
    alignContent: style.alignContent,
    alignSelf: style.alignSelf,
    fontFamily,
    fontSize: style.fontSize,
    fontWeight: style.fontWeight,
    fontStyle: style.fontStyle,
    transform,
  }
}

function transformToString(transform: Transform): string | null {
  return match(transform)
    .with({ operation: "translate" }, (transform) => `translate(${transform.value[0]}px, ${transform.value[1]}px)`)
    .with({ operation: "rotate" }, (transform) => `rotate(${transform.value[0]}deg)`)
    .with({ operation: "scale" }, (transform) => `scale(${transform.value[0]}, ${transform.value[1]})`)
    .with({ operation: "skew" }, (transform) => `skew(${transform.value[0]}deg, ${transform.value[1]}deg)`)
    .otherwise(() => null)
}

type CSSKeys = keyof CSSProperties
type PDFStyleKeys = keyof ViewStyle

// TODO: Use it
const PassThroughCSSProperties: (CSSKeys | PDFStyleKeys)[] = [
  "display",
  "width",
  "height",
  "minHeight",
  "maxHeight",
  "minWidth",
  "maxWidth",
] as const
