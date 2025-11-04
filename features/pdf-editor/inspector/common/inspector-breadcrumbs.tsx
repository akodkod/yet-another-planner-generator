import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { TreeNode } from "@/features/trees/tree"
import { getTreeNodeName } from "@/features/trees/tree-node-names"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/lib/ui/breadcrumb"
import { Fragment } from "react/jsx-runtime"

export type InspectorBreadcrumbsProps = {
  nodeId: string
}

export function InspectorBreadcrumbs({ nodeId }: InspectorBreadcrumbsProps) {
  const parentNodes = PDFEditor.useParentNodes(nodeId)
  const reversedParentNodes = [...parentNodes].reverse()

  const lastIndex = parentNodes.length - 1
  if (lastIndex === -1) return null

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {reversedParentNodes.map((node, index) => (
          <Fragment key={node.id}>
            <InspectorBreadcrumbsItem node={node} />

            {index < lastIndex && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

type InspectorBreadcrumbsItemProps = {
  node: TreeNode
}

function InspectorBreadcrumbsItem({ node }: InspectorBreadcrumbsItemProps) {
  const handleClick = () => {
    PDFEditor.selectNode(node.id)
  }

  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <button
          className="cursor-pointer"
          onClick={handleClick}
        >
          {getTreeNodeName(node)}
        </button>
      </BreadcrumbLink>
    </BreadcrumbItem>
  )
}
