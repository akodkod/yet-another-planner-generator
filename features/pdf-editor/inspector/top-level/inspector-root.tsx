import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { InspectorTitle } from "@/features/pdf-editor/inspector/inspector-title"
import { TreeNodeType } from "@/features/trees/tree"
import { FieldSet } from "@/lib/ui/field"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { useAppForm } from "@/lib/ui/tanstack-form"
import { Any } from "@/lib/utils/types"
import { Trees } from "@/features/trees/trees.module"

const schema = z.object({
  year: z.coerce.number().min(1900).max(2100),
  pageWidth: z.coerce.number().min(1024).max(4096),
  pageHeight: z.coerce.number().min(1024).max(4096),
})

export function InspectorRoot({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.Root)

  const form = useAppForm({
    defaultValues: {
      year: node.data.year as Any,
      pageWidth: node.data.pageWidth as Any,
      pageHeight: node.data.pageHeight as Any,
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
            ...data,
          },
        }))
      },
    },
  })

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Planner Settings
      </InspectorTitle>

      <form.AppForm>
        <FieldSet>
          <div className="grid grid-cols-2 gap-4">
            <form.AppField name="year">
              {(field) => (
                <field.Input
                  label="Year"
                  hint="The year of the "
                  type="number"
                />
              )}
            </form.AppField>

            <div />

            <form.AppField name="pageWidth">
              {(field) => (
                <field.Input
                  label="Page Width"
                  hint="The width of the page"
                  type="number"
                />
              )}
            </form.AppField>

            <form.AppField name="pageHeight">
              {(field) => (
                <field.Input
                  label="Page Height"
                  hint="The height of the page"
                />
              )}
            </form.AppField>
          </div>
        </FieldSet>
      </form.AppForm>
    </div>
  )
}
