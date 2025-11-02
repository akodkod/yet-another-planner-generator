import { OutlineItem } from "@/features/outline-renderer/outline-item"
import { OutlineRenderer, OutlineNodeRendererProps } from "@/features/outline-renderer/outline-renderer"
import { ChapterTreeNode, TreeNodeType } from "@/features/tree/tree"
import { cn } from "@/lib/ui/utils"
import { BookOpenIcon } from "lucide-react"

export function OutlineChapter({ node, onNodeSelect }: OutlineNodeRendererProps<ChapterTreeNode>) {
  const { type } = node

  return (
    <OutlineItem
      icon={BookOpenIcon}
      name={(
        <>
          <span className="flex-1 text-left">
            {namesMap[type]}
          </span>
          <span className="text-xs opacity-75 font-normal">
            {descriptionsMap[type]}
          </span>
        </>
      )}
      alwaysExpanded={type === TreeNodeType.RootChapter}
      className={cn(
        `
          *:data-[slot=outline-children]:py-1
          [&>div>*]:data-[slot=outline-button]:hover:opacity-80
        `,
        classNamesMap[type],
      )}
      onClick={() => onNodeSelect(node)}
    >
      <OutlineRenderer
        nodes={node.children}
        parent={node}
        onNodeSelect={onNodeSelect}
      />
    </OutlineItem>
  )
}

const namesMap: Record<ChapterTreeNode["type"], string> = {
  [TreeNodeType.RootChapter]: "",
  [TreeNodeType.YearChapter]: "Year",
  [TreeNodeType.MonthChapter]: "Month",
  [TreeNodeType.WeekChapter]: "Week",
  [TreeNodeType.DayChapter]: "Day",
  [TreeNodeType.PageChapter]: "Page",
} as const

const descriptionsMap: Record<ChapterTreeNode["type"], string> = {
  [TreeNodeType.RootChapter]: "",
  [TreeNodeType.YearChapter]: "repeats every year",
  [TreeNodeType.MonthChapter]: "repeats every month",
  [TreeNodeType.WeekChapter]: "repeats every week",
  [TreeNodeType.DayChapter]: "repeats every day",
  [TreeNodeType.PageChapter]: "",
} as const

const classNamesMap: Record<ChapterTreeNode["type"], string> = {
  [TreeNodeType.RootChapter]: "",
  [TreeNodeType.YearChapter]: "",
  [TreeNodeType.MonthChapter]: "*:data-[slot=outline-visual-line]:bg-blue-300 [&>div>*]:data-[slot=outline-expand-button]:text-blue-500 [&>div>button>*]:data-[slot=outline-icon]:text-blue-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80 [&>div>*]:data-[slot=outline-button]:bg-blue-100 [&>div>*]:data-[slot=outline-button]:text-blue-600",
  [TreeNodeType.WeekChapter]: "*:data-[slot=outline-visual-line]:bg-green-400 [&>div>*]:data-[slot=outline-expand-button]:text-green-500 [&>div>button>*]:data-[slot=outline-icon]:text-green-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80 [&>div>*]:data-[slot=outline-button]:bg-green-100 [&>div>*]:data-[slot=outline-button]:text-green-600",
  [TreeNodeType.DayChapter]: "*:data-[slot=outline-visual-line]:bg-orange-300 [&>div>*]:data-[slot=outline-expand-button]:text-orange-500 [&>div>button>*]:data-[slot=outline-icon]:text-orange-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80 [&>div>*]:data-[slot=outline-button]:bg-orange-100 [&>div>*]:data-[slot=outline-button]:text-orange-600",
  [TreeNodeType.PageChapter]: "*:data-[slot=outline-visual-line]:bg-stone-300 [&>div>*]:data-[slot=outline-expand-button]:text-stone-500 [&>div>button>*]:data-[slot=outline-icon]:text-stone-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80 [&>div>*]:data-[slot=outline-button]:bg-stone-100 [&>div>*]:data-[slot=outline-button]:text-stone-600",
} as const
