import { InspectorBaseBlock } from "@/features/pdf-editor/inspector/blocks/inspector-base-block"
import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { InspectorTitle } from "@/features/pdf-editor/inspector/inspector-title"
import { Trees } from "@/features/trees/trees.module"
import { TreeNodeType } from "@/features/trees/tree"
import { FieldSet } from "@/lib/ui/field"
import { Separator } from "@/lib/ui/separator"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { useAppForm } from "@/lib/ui/tanstack-form"
import { Any } from "@/lib/utils/types"

const schema = z.object({
  content: z.string(),
})

export function InspectorTextBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.TextBlock)

  const form = useAppForm({
    defaultValues: {
      content: node.data.content as Any,
    },
    validators: {
      onChange: schema,
    },
    listeners: {
      onChangeDebounceMs: 1000,
      onChange: ({ formApi }) => {
        const { data, success } = schema.safeParse(formApi.store.state.values)
        if (!success) return

        Trees.updateNode(treeId, node, (node) => ({
          ...node,
          data: {
            ...node.data,
            content: data.content,
          },
        }))
      },
    },
  })

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Text
      </InspectorTitle>

      <form.AppForm>
        <FieldSet>
          <form.AppField name="content">
            {(field) => (
              <field.Textarea
                placeholder="Enter your text here..."
              />
            )}
          </form.AppField>
        </FieldSet>
      </form.AppForm>

      <Separator />

      <InspectorBaseBlock nodeId={nodeId} />
    </div>
  )
}
