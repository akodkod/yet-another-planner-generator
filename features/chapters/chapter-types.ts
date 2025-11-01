import { RootBlock } from "@/features/blocks/block-types"

export enum ChapterType {
  Root = "root",
  Year = "year",
  Month = "month",
  Week = "week",
  Day = "day",
  Page = "page",
}

export type BaseChapter = {
  id: string
}

export type RootChapter = BaseChapter & {
  type: ChapterType.Root
  children: (YearChapter | PageChapter)[]
}

export type YearChapter = BaseChapter & {
  type: ChapterType.Year
  children: (MonthChapter | PageChapter)[]
}

export type MonthChapter = BaseChapter & {
  type: ChapterType.Month
  children: (WeekChapter | PageChapter)[]
}

export type WeekChapter = BaseChapter & {
  type: ChapterType.Week
  children: (DayChapter | PageChapter)[]
}

export type DayChapter = BaseChapter & {
  type: ChapterType.Day
  children: PageChapter[]
}

export type PageChapter = BaseChapter & {
  type: ChapterType.Page
  template: RootBlock
}

export type Chapter =
  | RootChapter
  | YearChapter
  | MonthChapter
  | WeekChapter
  | DayChapter
  | PageChapter
