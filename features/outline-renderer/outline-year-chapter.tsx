import { OutlineRenderer, OutlineNodeRendererProps } from "@/features/outline-renderer/outline-renderer"
import { YearChapterTreeNode } from "@/features/tree/tree"

export function OutlineYearChapter({ node, onNodeSelect }: OutlineNodeRendererProps<YearChapterTreeNode>) {
  return (
    <OutlineRenderer
      nodes={node.children}
      parent={node}
      onNodeSelect={onNodeSelect}
    />
  )
}
