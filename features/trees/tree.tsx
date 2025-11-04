import { BackgroundGridBlock, ColumnBlock, RowBlock, TextBlock } from "@/features/blocks/block-types"
import { ViewStyle } from "@/lib/utils/react-pdf"

export enum TreeNodeType {
  Root = "root",
  Year = "year",
  Month = "month",
  Week = "week",
  Day = "day",
  Page = "page",

  ColumnBlock = "column-block",
  RowBlock = "row-block",
  TextBlock = "text-block",
  BackgroundGridBlock = "background-grid-block",
}

export const TreeNodeTopLevelTypes = [
  TreeNodeType.Root,
  TreeNodeType.Year,
  TreeNodeType.Month,
  TreeNodeType.Week,
  TreeNodeType.Day,
  TreeNodeType.Page,
] as const

export const TreeNodeBlockTypes = [
  TreeNodeType.ColumnBlock,
  TreeNodeType.RowBlock,
  TreeNodeType.TextBlock,
  TreeNodeType.BackgroundGridBlock,
] as const

export type TreeNodeSectionType = (typeof TreeNodeTopLevelTypes)[number]
export type TreeNodeBlockType = (typeof TreeNodeBlockTypes)[number]

type BaseTreeNode = {
  id: string
}

export type TreeNode =
  | Node
  | BlockNode

export type PDFTree = RootNode

export type TreeNodeByType<T extends TreeNodeType> = Extract<TreeNode, { type: T }>

//
// MARK: - Data Types
//

export type Root = {
  year: number
  pageWidth: number
  pageHeight: number
}

export type Page = {
  name: string
  style: ViewStyle
}

//
// MARK: - Top Level Nodes
//

type BaseNode = BaseTreeNode

export type RootNode = BaseNode & {
  type: TreeNodeType.Root
  data: Root
  children: (YearNode | PageNode)[]
}

export type YearNode = BaseNode & {
  type: TreeNodeType.Year
  children: (MonthNode | PageNode)[]
}

export type MonthNode = BaseNode & {
  type: TreeNodeType.Month
  children: (WeekNode | PageNode)[]
}

export type WeekNode = BaseNode & {
  type: TreeNodeType.Week
  children: (DayNode | PageNode)[]
}

export type DayNode = BaseNode & {
  type: TreeNodeType.Day
  children: PageNode[]
}

export type PageNode = BaseNode & {
  type: TreeNodeType.Page
  data: Page
  children: BlockNode[]
}

export type Node =
  | RootNode
  | YearNode
  | MonthNode
  | WeekNode
  | DayNode
  | PageNode

//
// MARK: - Block Nodes
//

type BaseBlockNode = BaseTreeNode

export type ColumnBlockNode = BaseBlockNode & {
  type: TreeNodeType.ColumnBlock
  data: ColumnBlock
  children: BlockNode[]
}

export type RowBlockNode = BaseBlockNode & {
  type: TreeNodeType.RowBlock
  data: RowBlock
  children: BlockNode[]
}

export type TextBlockNode = BaseBlockNode & {
  type: TreeNodeType.TextBlock
  data: TextBlock
  children: never[]
}

export type BackgroundGridBlockNode = BaseBlockNode & {
  type: TreeNodeType.BackgroundGridBlock
  data: BackgroundGridBlock
  children: never[]
}

export type BlockNode =
  | ColumnBlockNode
  | RowBlockNode
  | TextBlockNode
  | BackgroundGridBlockNode
