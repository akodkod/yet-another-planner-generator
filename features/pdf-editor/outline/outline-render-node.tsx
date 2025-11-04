import { OutlineAnyBlock } from "@/features/pdf-editor/outline/outline-any-block"
import { OutlineAnyTopLevel } from "@/features/pdf-editor/outline/outline-any-top-level"
import { OutlinePage } from "@/features/pdf-editor/outline/outline-page"
import { OutlineRoot } from "@/features/pdf-editor/outline/outline-root"
import { OutlineYear } from "@/features/pdf-editor/outline/outline-year"
import { TreeNode, TreeNodeType } from "@/features/trees/tree"
import { ComponentType } from "react"

export type OutlineRenderNodeProps = {
  node: Pick<TreeNode, "id" | "type">
}

export function OutlineRenderNode({ node }: OutlineRenderNodeProps) {
  const Component = componentsMap[node.type]
  return <Component nodeId={node.id} />
}

export type OutlineRenderNodeContentProps = {
  nodeId: string
}

const componentsMap: Record<
  TreeNodeType,
  ComponentType<OutlineRenderNodeContentProps>
> = {
  [TreeNodeType.Root]: OutlineRoot,
  [TreeNodeType.Year]: OutlineYear,
  [TreeNodeType.Month]: OutlineAnyTopLevel,
  [TreeNodeType.Week]: OutlineAnyTopLevel,
  [TreeNodeType.Day]: OutlineAnyTopLevel,
  [TreeNodeType.Page]: OutlinePage,
  [TreeNodeType.ColumnBlock]: OutlineAnyBlock,
  [TreeNodeType.RowBlock]: OutlineAnyBlock,
  [TreeNodeType.TextBlock]: OutlineAnyBlock,
  [TreeNodeType.BackgroundGridBlock]: OutlineAnyBlock,
} as const
