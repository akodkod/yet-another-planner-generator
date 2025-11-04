import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { TreeNodeType } from "@/features/trees/tree"
import { FieldSet } from "@/lib/ui/field"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { useAppForm } from "@/lib/ui/tanstack-form"
import { Trees } from "@/features/trees/trees.module"
import { InspectorHeader } from "@/features/pdf-editor/inspector/common/inspector-header"

const schema = z.object({
  name: z.string().min(0),
})

export function InspectorPage({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.Page)

  const form = useAppForm({
    defaultValues: {
      name: node.data.name,
    },
    validators: {
      onChange: schema,
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: ({ formApi }) => {
        const { data, success } = schema.safeParse(formApi.store.state.values)
        if (!success) return

        Trees.updateNode(treeId, node, (node) => ({
          ...node,
          data: {
            ...node.data,
            ...data,
          },
        }))
      },
    },
  })

  return (
    <div className="space-y-2">
      <InspectorHeader node={node} />

      <form.AppForm>
        <FieldSet>
          <form.AppField name="name">
            {(field) => (
              <field.Input
                label="Name"
                hint="Optional. Used for better navigation in outline view"
              />
            )}
          </form.AppField>
        </FieldSet>
      </form.AppForm>
    </div>
  )
}
