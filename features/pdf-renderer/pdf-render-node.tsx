import { PDFBackgroundGridBlock } from "@/features/pdf-renderer/blocks/pdf-background-grid-block"
import { PDFColumnBlock } from "@/features/pdf-renderer/blocks/pdf-column-block"
import { PDFRowBlock } from "@/features/pdf-renderer/blocks/pdf-row-block"
import { PDFTextBlock } from "@/features/pdf-renderer/blocks/pdf-text-block"
import { PDFDayChapter } from "@/features/pdf-renderer/chapters/pdf-day-chapter"
import { PDFMonthChapter } from "@/features/pdf-renderer/chapters/pdf-month-chapter"
import { PDFRootChapter } from "@/features/pdf-renderer/chapters/pdf-root-chapter"
import { PDFWeekChapter } from "@/features/pdf-renderer/chapters/pdf-week-chapter"
import { PDFYearChapter } from "@/features/pdf-renderer/chapters/pdf-year-chapter"
import { PDFPageChapter } from "@/features/pdf-renderer/chapters/pdf-page-chapter"
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
  [TreeNodeType.RootChapter]: PDFRootChapter,
  [TreeNodeType.YearChapter]: PDFYearChapter,
  [TreeNodeType.MonthChapter]: PDFMonthChapter,
  [TreeNodeType.WeekChapter]: PDFWeekChapter,
  [TreeNodeType.DayChapter]: PDFDayChapter,
  [TreeNodeType.PageChapter]: PDFPageChapter,
  [TreeNodeType.ColumnBlock]: PDFColumnBlock,
  [TreeNodeType.RowBlock]: PDFRowBlock,
  [TreeNodeType.TextBlock]: PDFTextBlock,
  [TreeNodeType.BackgroundGridBlock]: PDFBackgroundGridBlock,
} as const
