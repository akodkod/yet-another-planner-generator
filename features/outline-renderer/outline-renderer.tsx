import { TreeNode, TreeNodeBlockTypes, TreeNodeChapterTypes, TreeNodeType } from "@/features/tree/tree"
import { Fragment } from "react/jsx-runtime"
import { match, P } from "ts-pattern"
import { OutlineChapter } from "@/features/outline-renderer/outline-chapter"
import { OutlineBlock } from "@/features/outline-renderer/outline-block"
import { OutlineRootChapter } from "@/features/outline-renderer/outline-root-chapter"
import { OutlineYearChapter } from "@/features/outline-renderer/outline-year-chapter"
import { OutlinePageChapter } from "@/features/outline-renderer/outline-page-chapter"

export type OutlineRendererProps = {
  nodes: TreeNode[]
  parent: TreeNode | null
  onNodeSelect: (node: TreeNode) => void
}

export function OutlineRenderer({ nodes, parent, onNodeSelect }: OutlineRendererProps) {
  return nodes.map((node) => (
    <Fragment key={node.id}>
      {match(node)
        .with({ type: P.union(...TreeNodeChapterTypes) }, (node) => (
          match(node)
            .with({ type: TreeNodeType.RootChapter }, (node) => (
              <OutlineRootChapter
                node={node}
                parent={parent}
                onNodeSelect={onNodeSelect}
              />
            ))
            .with({ type: TreeNodeType.YearChapter }, (node) => (
              <OutlineYearChapter
                node={node}
                parent={parent}
                onNodeSelect={onNodeSelect}
              />
            ))
            .with({ type: TreeNodeType.PageChapter }, (node) => (
              <OutlinePageChapter
                node={node}
                parent={parent}
                onNodeSelect={onNodeSelect}
              />
            ))
            .otherwise(() => (
              <OutlineChapter
                node={node}
                parent={parent}
                onNodeSelect={onNodeSelect}
              />
            ))
        ))
        .with({ type: P.union(...TreeNodeBlockTypes) }, (node) => (
          <OutlineBlock
            node={node}
            parent={parent}
            onNodeSelect={onNodeSelect}
          />
        ))
        .exhaustive()}
    </Fragment>
  ))
}

export type OutlineNodeRendererProps<T extends TreeNode = TreeNode> = {
  node: T
  parent: TreeNode | null
  onNodeSelect: (node: TreeNode) => void
}
