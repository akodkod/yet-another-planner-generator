import { ViewStyle } from "@/lib/utils/react-pdf"

export enum BlockType {
  Column = "column",
  Row = "row",
  EmptySpace = "empty-space",
  Text = "text",
  BackgroundGrid = "background-grid",
}

export enum BackgroundGridType {
  Dots = "dots",
  Lines = "lines",
  Squares = "squares",
}

export enum BackgroundGridSpacing {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum BlockSizeType {
  Auto = "auto",
  Full = "full",
  Percentage = "percentage",
  Pixels = "pixels",
}

export type BlockSize = {
  type: BlockSizeType.Auto
} | {
  type: BlockSizeType.Full
} | {
  type: BlockSizeType.Percentage
  percentage: number
} | {
  type: BlockSizeType.Pixels
  pixels: number
}

export type SidesNumbers = number | {
  top: number
  right: number
  bottom: number
  left: number
}

export type BaseBlock = {
  id: string
  width: BlockSize
  height: BlockSize
  style: ViewStyle
}

export type ColumnBlock = BaseBlock & {
  type: BlockType.Column
  spacing: number
  children: Block[]
}

export type RowBlock = BaseBlock & {
  type: BlockType.Row
  spacing: number
  children: Block[]
}

export type EmptySpaceBlock = BaseBlock & {
  type: BlockType.EmptySpace
}

export type TextBlock = BaseBlock & {
  type: BlockType.Text
  content: string
  textStyle: ViewStyle
}

export type BackgroundGridBlock = BaseBlock & {
  type: BlockType.BackgroundGrid
  gridType: BackgroundGridType
  gridColor: ViewStyle["backgroundColor"]
  gridSpacing: BackgroundGridSpacing
  gridLineWidth: number
}

export type Block =
  | ColumnBlock
  | RowBlock
  | TextBlock
  | BackgroundGridBlock

export type RootBlock =
  | ColumnBlock
  | RowBlock
