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
import { TreeNode, TreeNodeType } from "@/features/tree/tree"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export type PDFRendererProps = {
  nodes: TreeNode[]
  parent: TreeNode | null
}

export function PDFRenderer({ nodes, parent }: PDFRendererProps) {
  return nodes.map((node) => (
    <Fragment key={node.id}>
      {match(node)
        .with({ type: TreeNodeType.RootChapter }, (node) => (
          <PDFRootChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.YearChapter }, (node) => (
          <PDFYearChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.MonthChapter }, (node) => (
          <PDFMonthChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.WeekChapter }, (node) => (
          <PDFWeekChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.DayChapter }, (node) => (
          <PDFDayChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.PageChapter }, (node) => (
          <PDFPageChapter
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.ColumnBlock }, (node) => (
          <PDFColumnBlock
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.RowBlock }, (node) => (
          <PDFRowBlock
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.TextBlock }, (node) => (
          <PDFTextBlock
            node={node}
            parent={parent}
          />
        ))
        .with({ type: TreeNodeType.BackgroundGridBlock }, (node) => (
          <PDFBackgroundGridBlock
            node={node}
            parent={parent}
          />
        ))
        .exhaustive()}
    </Fragment>
  ))
}

export type PDFNodeRendererProps<T extends TreeNode = TreeNode> = {
  node: T
  parent: TreeNode | null
}
