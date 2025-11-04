import { TreeNodeType } from "@/features/trees/tree"
import { nanoid } from "@/lib/utils/nanoid"

export function genTreeNodeId(type: TreeNodeType) {
  return `${prefixMap[type]}-${nanoid()}`
}

const prefixMap: Record<TreeNodeType, string> = {
  [TreeNodeType.Root]: "ch-ro",
  [TreeNodeType.Year]: "ch-ye",
  [TreeNodeType.Month]: "ch-mo",
  [TreeNodeType.Week]: "ch-we",
  [TreeNodeType.Day]: "ch-da",
  [TreeNodeType.Page]: "ch-pa",
  [TreeNodeType.ColumnBlock]: "bl-co",
  [TreeNodeType.RowBlock]: "bl-ro",
  [TreeNodeType.TextBlock]: "bl-te",
  [TreeNodeType.BackgroundGridBlock]: "bl-bgr",
} as const
