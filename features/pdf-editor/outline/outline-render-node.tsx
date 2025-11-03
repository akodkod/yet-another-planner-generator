import { OutlineAnyBlock } from "@/features/pdf-editor/outline/outline-any-block"
import { OutlineAnyChapter } from "@/features/pdf-editor/outline/outline-any-chapter"
import { OutlinePageChapter } from "@/features/pdf-editor/outline/outline-page-chapter"
import { OutlineRootChapter } from "@/features/pdf-editor/outline/outline-root-chapter"
import { OutlineYearChapter } from "@/features/pdf-editor/outline/outline-year-chapter"
import { TreeNode, TreeNodeType } from "@/features/trees/tree"
import { ComponentType } from "react"

export type OutlineRenderNodeProps = {
  node: Pick<TreeNode, "id" | "type">
}

export function OutlineRenderNode({ node }: OutlineRenderNodeProps) {
  const Component = componentsMap[node.type]
  return <Component nodeId={node.id} />
}

export type OutlineRenderNodeContentProps = {
  nodeId: string
}

const componentsMap: Record<
  TreeNodeType,
  ComponentType<OutlineRenderNodeContentProps>
> = {
  [TreeNodeType.RootChapter]: OutlineRootChapter,
  [TreeNodeType.YearChapter]: OutlineYearChapter,
  [TreeNodeType.MonthChapter]: OutlineAnyChapter,
  [TreeNodeType.WeekChapter]: OutlineAnyChapter,
  [TreeNodeType.DayChapter]: OutlineAnyChapter,
  [TreeNodeType.PageChapter]: OutlinePageChapter,
  [TreeNodeType.ColumnBlock]: OutlineAnyBlock,
  [TreeNodeType.RowBlock]: OutlineAnyBlock,
  [TreeNodeType.TextBlock]: OutlineAnyBlock,
  [TreeNodeType.BackgroundGridBlock]: OutlineAnyBlock,
} as const
