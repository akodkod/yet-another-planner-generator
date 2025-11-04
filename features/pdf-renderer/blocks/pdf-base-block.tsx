import { BlockSizeType } from "@/features/blocks/block-types"
import { BlockNode, TreeNode, TreeNodeType } from "@/features/trees/tree"
import { isBlockNode } from "@/features/trees/tree-utils"
import { Transform, ViewStyle } from "@/lib/utils/react-pdf"
import { CSSProperties } from "react"
import { match } from "ts-pattern"

export function getBaseBlockStyle(node: BlockNode, parent: TreeNode | null): ViewStyle {
  return {
    ...getSizeStyle(node, parent && isBlockNode(parent) ? parent : null),
    ...node.data.style,
  }
}

function getSizeStyle(node: BlockNode, parent: BlockNode | null): ViewStyle {
  if (!parent) {
    return {
      width: "100%",
      height: "100%",
    }
  }

  const { data: block } = node

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

export function pdfStyleToHTML(style: ViewStyle): CSSProperties {
  const css: CSSProperties = {}

  for (const key of PassThroughStyles) {
    const keyTyped = key as keyof ViewStyle

    if (keyTyped in style && style[keyTyped] !== undefined) {
      css[key as keyof CSSProperties] = style[keyTyped]
    }
  }

  if (style.fontFamily) {
    style.fontFamily = Array.isArray(style.fontFamily) ? style.fontFamily.join(", ") : style.fontFamily
  }

  if (style.transform) {
    const transforms = Array.isArray(style.transform) ? style.transform : []
    css.transform = transforms.map(transformToString).filter(Boolean).join(", ")
  }

  return css
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
type CommonKeys = CSSKeys | PDFStyleKeys

const PassThroughStyles: CommonKeys[] = [
  "display",
  "width",
  "height",
  "minHeight",
  "maxHeight",
  "minWidth",
  "maxWidth",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "flex",
  "flexDirection",
  "flexWrap",
  "flexGrow",
  "flexShrink",
  "flexBasis",
  "gap",
  "justifyContent",
  "alignItems",
  "alignContent",
  "alignSelf",
  "fontSize",
  "fontWeight",
  "fontStyle",
] as const
