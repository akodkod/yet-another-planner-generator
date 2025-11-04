import { OutlineItem } from "@/features/pdf-editor/outline/outline-item"
import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeSectionType, TreeNodeTopLevelTypes, TreeNodeType } from "@/features/trees/tree"
import { cn } from "@/lib/ui/utils"
import { twLintValues } from "@/lib/utils/tw"
import { BookOpenIcon } from "lucide-react"

export function OutlineAnyTopLevel({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeAnyOf(nodeId, TreeNodeTopLevelTypes)
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
      alwaysExpanded={type === TreeNodeType.Root}
      className={cn(
        `
          *:data-[slot=outline-children]:py-1
          [&>div>*]:data-[slot=outline-button]:hover:opacity-80
        `,
        classNamesMap[type],
      )}
      onClick={() => PDFEditor.selectNode(nodeId)}
    >
      <OutlineRenderChildren nodeId={node.id} />
    </OutlineItem>
  )
}

const namesMap: Record<TreeNodeSectionType, string> = {
  [TreeNodeType.Root]: "Root",
  [TreeNodeType.Year]: "Year",
  [TreeNodeType.Month]: "Month",
  [TreeNodeType.Week]: "Week",
  [TreeNodeType.Day]: "Day",
  [TreeNodeType.Page]: "Page",
} as const

const descriptionsMap: Record<TreeNodeSectionType, string> = {
  [TreeNodeType.Root]: "",
  [TreeNodeType.Year]: "repeats every year",
  [TreeNodeType.Month]: "repeats every month",
  [TreeNodeType.Week]: "repeats every week",
  [TreeNodeType.Day]: "repeats every day",
  [TreeNodeType.Page]: "",
} as const

const classNamesMap: Record<TreeNodeSectionType, string> = twLintValues({
  [TreeNodeType.Root]: "",
  [TreeNodeType.Year]: "",
  [TreeNodeType.Month]: `
    *:data-[slot=outline-visual-line]:bg-blue-300
    [&>div>*]:data-[slot=outline-expand-button]:text-blue-500
    [&>div>button>*]:data-[slot=outline-icon]:text-blue-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80
    [&>div>*]:data-[slot=outline-button]:bg-blue-100 [&>div>*]:data-[slot=outline-button]:text-blue-600
    dark:*:data-[slot=outline-visual-line]:bg-blue-950 dark:[&>div>*]:data-[slot=outline-button]:bg-blue-950
    dark:[&>div>button>*]:data-[slot=outline-icon]:text-blue-600 dark:[&>div>*]:data-[slot=outline-button]:text-blue-400
  `,
  [TreeNodeType.Week]: `
    *:data-[slot=outline-visual-line]:bg-green-400
    [&>div>*]:data-[slot=outline-expand-button]:text-green-500
    [&>div>button>*]:data-[slot=outline-icon]:text-green-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80
    [&>div>*]:data-[slot=outline-button]:bg-green-100 [&>div>*]:data-[slot=outline-button]:text-green-600
    dark:*:data-[slot=outline-visual-line]:bg-green-950 dark:[&>div>*]:data-[slot=outline-button]:bg-green-950
    dark:[&>div>button>*]:data-[slot=outline-icon]:text-green-600
    dark:[&>div>*]:data-[slot=outline-button]:text-green-400
  `,
  [TreeNodeType.Day]: `
    *:data-[slot=outline-visual-line]:bg-orange-300
    [&>div>*]:data-[slot=outline-expand-button]:text-orange-500
    [&>div>button>*]:data-[slot=outline-icon]:text-orange-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80
    [&>div>*]:data-[slot=outline-button]:bg-orange-100 [&>div>*]:data-[slot=outline-button]:text-orange-600
    dark:*:data-[slot=outline-visual-line]:bg-orange-950 dark:[&>div>*]:data-[slot=outline-button]:bg-orange-950
    dark:[&>div>button>*]:data-[slot=outline-icon]:text-orange-600
    dark:[&>div>*]:data-[slot=outline-button]:text-orange-400
  `,
  [TreeNodeType.Page]: `
    *:data-[slot=outline-visual-line]:bg-stone-300
    [&>div>*]:data-[slot=outline-expand-button]:text-stone-500
    [&>div>button>*]:data-[slot=outline-icon]:text-stone-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80
    [&>div>*]:data-[slot=outline-button]:bg-stone-100 [&>div>*]:data-[slot=outline-button]:text-stone-600
    dark:*:data-[slot=outline-visual-line]:bg-stone-950 dark:[&>div>*]:data-[slot=outline-button]:bg-stone-950
    dark:[&>div>button>*]:data-[slot=outline-icon]:text-stone-600
    dark:[&>div>*]:data-[slot=outline-button]:text-stone-400
  `,
} as const)
