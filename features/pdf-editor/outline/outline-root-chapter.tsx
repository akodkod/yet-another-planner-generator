import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNodeType } from "@/features/trees/tree"
import { Button } from "@/lib/ui/button"
import { ChevronsUpDownIcon, Settings2Icon } from "lucide-react"

export function OutlineRootChapter({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.RootChapter)

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
          onClick={() => PDFEditor.selectNode(nodeId)}
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
          onClick={() => PDFEditor.selectNode(nodeId)}
        >
          <Settings2Icon />
        </Button>
      </div>

      <div className="mt-1">
        <OutlineRenderChildren nodeId={node.id} />
      </div>
    </>
  )
}
