import { InspectorRootChapter } from "@/features/pdf-editor/inspector/chapters/inspector-root-chapter"
import { TreeNodeType } from "@/features/trees/tree"
import { Fragment } from "react/jsx-runtime"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { ComponentType } from "react"
import { InspectorColumnBlock } from "@/features/pdf-editor/inspector/blocks/inspector-column-block"
import { InspectorTextBlock } from "@/features/pdf-editor/inspector/blocks/inspector-text-block"

export function Inspector() {
  const node = PDFEditor.useSelectedNode()
  const Component = componentMap[node.type]

  return (
    <Fragment key={node.id}>
      {Component ? (
        <Component nodeId={node.id} />
      ) : (
        <div>{node.type}</div>
      )}
    </Fragment>
  )
}

export type InspectorRenderNodeProps = {
  nodeId: string
}

const componentMap: Partial<
  Record<
    TreeNodeType,
    ComponentType<InspectorRenderNodeProps>>
> = {
  [TreeNodeType.RootChapter]: InspectorRootChapter,
  [TreeNodeType.ColumnBlock]: InspectorColumnBlock,
  [TreeNodeType.TextBlock]: InspectorTextBlock,
} as const
