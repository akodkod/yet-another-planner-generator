import { TreeNodeType } from "@/features/trees/tree"
import { nanoid } from "@/lib/utils/nanoid"

export function genTreeNodeId(type: TreeNodeType) {
  return `${prefixMap[type]}-${nanoid()}`
}

const prefixMap: Record<TreeNodeType, string> = {
  [TreeNodeType.RootChapter]: "ch-ro",
  [TreeNodeType.YearChapter]: "ch-ye",
  [TreeNodeType.MonthChapter]: "ch-mo",
  [TreeNodeType.WeekChapter]: "ch-we",
  [TreeNodeType.DayChapter]: "ch-da",
  [TreeNodeType.PageChapter]: "ch-pa",
  [TreeNodeType.ColumnBlock]: "bl-co",
  [TreeNodeType.RowBlock]: "bl-ro",
  [TreeNodeType.TextBlock]: "bl-te",
  [TreeNodeType.BackgroundGridBlock]: "bl-bgr",
} as const
