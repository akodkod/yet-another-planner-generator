import { TreeNodeType } from "@/features/trees/tree"
import { LucideIcon, HomeIcon, GridIcon, CalendarIcon, ArrowDownFromLineIcon, ArrowRightFromLineIcon, TypeIcon, NotebookTextIcon } from "lucide-react"

export const treeIconsMap: Record<TreeNodeType, LucideIcon> = {
  [TreeNodeType.Root]: HomeIcon,
  [TreeNodeType.Year]: CalendarIcon,
  [TreeNodeType.Month]: CalendarIcon,
  [TreeNodeType.Week]: CalendarIcon,
  [TreeNodeType.Day]: CalendarIcon,
  [TreeNodeType.Page]: NotebookTextIcon,
  [TreeNodeType.ColumnBlock]: ArrowDownFromLineIcon,
  [TreeNodeType.RowBlock]: ArrowRightFromLineIcon,
  [TreeNodeType.TextBlock]: TypeIcon,
  [TreeNodeType.BackgroundGridBlock]: GridIcon,
} as const
