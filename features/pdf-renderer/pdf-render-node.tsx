import { PDFBackgroundGridBlock } from "@/features/pdf-renderer/blocks/pdf-background-grid-block"
import { PDFColumnBlock } from "@/features/pdf-renderer/blocks/pdf-column-block"
import { PDFRowBlock } from "@/features/pdf-renderer/blocks/pdf-row-block"
import { PDFTextBlock } from "@/features/pdf-renderer/blocks/pdf-text-block"
import { PDFDay } from "@/features/pdf-renderer/top-level/pdf-day"
import { PDFMonth } from "@/features/pdf-renderer/top-level/pdf-month"
import { PDFRoot } from "@/features/pdf-renderer/top-level/pdf-root"
import { PDFWeek } from "@/features/pdf-renderer/top-level/pdf-week"
import { PDFYear } from "@/features/pdf-renderer/top-level/pdf-year"
import { PDFPage } from "@/features/pdf-renderer/top-level/pdf-page"
import { TreeNode, TreeNodeType } from "@/features/trees/tree"
import { ComponentType } from "react"

export type PDFRenderNodeProps = {
  node: Pick<TreeNode, "id" | "type">
}

export function PDFRenderNode({ node }: PDFRenderNodeProps) {
  const Component = componentsMap[node.type]
  return <Component nodeId={node.id} />
}

export type PDFRenderNodeContentProps = {
  nodeId: string
}

const componentsMap: Record<
  TreeNodeType,
  ComponentType<PDFRenderNodeContentProps>
> = {
  [TreeNodeType.Root]: PDFRoot,
  [TreeNodeType.Year]: PDFYear,
  [TreeNodeType.Month]: PDFMonth,
  [TreeNodeType.Week]: PDFWeek,
  [TreeNodeType.Day]: PDFDay,
  [TreeNodeType.Page]: PDFPage,
  [TreeNodeType.ColumnBlock]: PDFColumnBlock,
  [TreeNodeType.RowBlock]: PDFRowBlock,
  [TreeNodeType.TextBlock]: PDFTextBlock,
  [TreeNodeType.BackgroundGridBlock]: PDFBackgroundGridBlock,
} as const
