import { OutlineRenderer, OutlineNodeRendererProps } from "@/features/outline-renderer/outline-renderer"
import { RootChapterTreeNode } from "@/features/tree/tree"
import { Button } from "@/lib/ui/button"
import { ChevronsUpDownIcon, Settings2Icon } from "lucide-react"

export function OutlineRootChapter({ node, onNodeSelect }: OutlineNodeRendererProps<RootChapterTreeNode>) {
  return (
    <>
      <div className="flex flex-row items-center gap-px w-full">
        <Button
          variant="ghost"
          className={`
            flex-1 justify-start text-base
            hover:bg-transparent hover:opacity-80
            p-0
          `}
          onClick={() => onNodeSelect(node)}
        >
          Planner {node.chapter.year}
        </Button>

        <Button
          variant="ghost"
          size="icon"
        >
          <ChevronsUpDownIcon />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onNodeSelect(node)}
        >
          <Settings2Icon />
        </Button>
      </div>

      <div className="mt-1">
        <OutlineRenderer
          nodes={node.children}
          parent={node}
          onNodeSelect={onNodeSelect}
        />
      </div>
    </>
  )
}
