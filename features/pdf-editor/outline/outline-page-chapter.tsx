import { OutlineItem } from "@/features/pdf-editor/outline/outline-item"
import { OutlineRenderChildren } from "@/features/pdf-editor/outline/outline-render-children"
import { OutlineRenderNodeContentProps } from "@/features/pdf-editor/outline/outline-render-node"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"
import { TreeNodeType } from "@/features/trees/tree"
import { NotebookTextIcon } from "lucide-react"

export function OutlinePageChapter({ nodeId }: OutlineRenderNodeContentProps) {
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.PageChapter)

  return (
    <OutlineItem
      icon={NotebookTextIcon}
      name={(
        <>
          <span className="flex-1 text-left">
            {node.chapter.name || "Page"}
          </span>
          <span className="text-xs opacity-60 font-normal">
            {node.chapter.name ? "page" : ""}
          </span>
        </>
      )}
      className={`
        *:data-[slot=outline-children]:py-1 *:data-[slot=outline-visual-line]:bg-stone-300
        [&>div>*]:data-[slot=outline-expand-button]:text-stone-500
        [&>div>button>*]:data-[slot=outline-icon]:text-stone-500 [&>div>button>*]:data-[slot=outline-icon]:opacity-80
        [&>div>*]:data-[slot=outline-button]:bg-stone-100 [&>div>*]:data-[slot=outline-button]:text-stone-600
        [&>div>*]:data-[slot=outline-button]:hover:opacity-80
        dark:[&>div>*]:data-[slot=outline-button]:bg-stone-900 dark:[&>div>*]:data-[slot=outline-button]:text-stone-300
        dark:*:data-[slot=outline-visual-line]:bg-stone-700
      `}
      onClick={() => PDFEditor.selectNode(nodeId)}
    >
      <OutlineRenderChildren nodeId={node.id} />
    </OutlineItem>
  )
}
