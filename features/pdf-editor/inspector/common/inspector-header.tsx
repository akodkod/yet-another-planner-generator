import { InspectorBreadcrumbs } from "@/features/pdf-editor/inspector/common/inspector-breadcrumbs"
import { TreeNode, TreeNodeType } from "@/features/trees/tree"
import { getTreeNodeName, treeNodeNamesMap } from "@/features/trees/tree-node-names"
import { Separator } from "@/lib/ui/separator"
import { cn } from "@/lib/ui/utils"
import { ComponentProps } from "react"

export type InspectorHeaderProps = ComponentProps<"div"> & {
  node: TreeNode
}

export function InspectorHeader({ node, className, ...props }: InspectorHeaderProps) {
  const name = useSimpleNameFor.includes(node.type)
    ? treeNodeNamesMap[node.type]
    : getTreeNodeName(node)

  return (
    <>
      <div
        className={cn("px-0.5 pt-2", className)}
        {...props}
      >
        <InspectorBreadcrumbs nodeId={node.id} />

        <h3 className="text-2xl font-semibold leading-tight">
          {name}
        </h3>
      </div>

      <Separator className="mt-3.5 mb-4.5 bg-border/80" />
    </>
  )
}

const useSimpleNameFor: TreeNodeType[] = [
  TreeNodeType.TextBlock,
] as const
