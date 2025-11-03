import { BackgroundGridBlock, ColumnBlock, RowBlock, TextBlock } from "@/features/blocks/block-types"
import { PageChapter, RootChapter } from "@/features/chapters/chapter-types"

export enum TreeNodeType {
  RootChapter = "root-chapter",
  YearChapter = "year-chapter",
  MonthChapter = "month-chapter",
  WeekChapter = "week-chapter",
  DayChapter = "day-chapter",
  PageChapter = "page-chapter",

  ColumnBlock = "column-block",
  RowBlock = "row-block",
  TextBlock = "text-block",
  BackgroundGridBlock = "background-grid-block",
}

export const TreeNodeChapterTypes = [
  TreeNodeType.RootChapter,
  TreeNodeType.YearChapter,
  TreeNodeType.MonthChapter,
  TreeNodeType.WeekChapter,
  TreeNodeType.DayChapter,
  TreeNodeType.PageChapter,
] as const

export const TreeNodeBlockTypes = [
  TreeNodeType.ColumnBlock,
  TreeNodeType.RowBlock,
  TreeNodeType.TextBlock,
  TreeNodeType.BackgroundGridBlock,
] as const

export type TreeNodeChapterType = (typeof TreeNodeChapterTypes)[number]
export type TreeNodeBlockType = (typeof TreeNodeBlockTypes)[number]

type BaseTreeNode = {
  id: string
}

export type TreeNode =
  | ChapterTreeNode
  | BlockTreeNode

export type PDFTree = RootChapterTreeNode

export type TreeNodeByType<T extends TreeNodeType> = Extract<TreeNode, { type: T }>

//
// MARK: - Chapters
//

type BaseChapterTreeNode = BaseTreeNode

export type RootChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.RootChapter
  chapter: RootChapter
  children: (YearChapterTreeNode | PageChapterTreeNode)[]
}

export type YearChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.YearChapter
  children: (MonthChapterTreeNode | PageChapterTreeNode)[]
}

export type MonthChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.MonthChapter
  children: (WeekChapterTreeNode | PageChapterTreeNode)[]
}

export type WeekChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.WeekChapter
  children: (DayChapterTreeNode | PageChapterTreeNode)[]
}

export type DayChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.DayChapter
  children: PageChapterTreeNode[]
}

export type PageChapterTreeNode = BaseChapterTreeNode & {
  type: TreeNodeType.PageChapter
  chapter: PageChapter
  children: BlockTreeNode[]
}

export type ChapterTreeNode =
  | RootChapterTreeNode
  | YearChapterTreeNode
  | MonthChapterTreeNode
  | WeekChapterTreeNode
  | DayChapterTreeNode
  | PageChapterTreeNode

//
// MARK: - Blocks
//

type BaseBlockTreeNode = BaseTreeNode

export type ColumnBlockTreeNode = BaseBlockTreeNode & {
  type: TreeNodeType.ColumnBlock
  block: ColumnBlock
  children: BlockTreeNode[]
}

export type RowBlockTreeNode = BaseBlockTreeNode & {
  type: TreeNodeType.RowBlock
  block: RowBlock
  children: BlockTreeNode[]
}

export type TextBlockTreeNode = BaseBlockTreeNode & {
  type: TreeNodeType.TextBlock
  block: TextBlock
  children: never[]
}

export type BackgroundGridBlockTreeNode = BaseBlockTreeNode & {
  type: TreeNodeType.BackgroundGridBlock
  block: BackgroundGridBlock
  children: never[]
}

export type BlockTreeNode =
  | ColumnBlockTreeNode
  | RowBlockTreeNode
  | TextBlockTreeNode
  | BackgroundGridBlockTreeNode
