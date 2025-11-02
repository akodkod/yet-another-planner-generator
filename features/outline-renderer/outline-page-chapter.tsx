import { OutlineItem } from "@/features/outline-renderer/outline-item"
import { OutlineRenderer, OutlineNodeRendererProps } from "@/features/outline-renderer/outline-renderer"
import { PageChapterTreeNode } from "@/features/tree/tree"
import { NotebookTextIcon } from "lucide-react"

export function OutlinePageChapter({ node, onNodeSelect }: OutlineNodeRendererProps<PageChapterTreeNode>) {
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
      `}
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
