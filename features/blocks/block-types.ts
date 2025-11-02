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

type BaseBlock = {
  width: BlockSize
  height: BlockSize
  style: ViewStyle
}

export type EmptySpaceBlock = BaseBlock

export type ColumnBlock = BaseBlock & {
  spacing: number
}

export type RowBlock = BaseBlock & {
  spacing: number
}

export type TextBlock = BaseBlock & {
  content: string
  textStyle: ViewStyle
}

export type BackgroundGridBlock = BaseBlock & {
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
