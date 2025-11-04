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
import { InputGroupAddon, InputGroupText } from "@/lib/ui/input-group"

const schema = z.object({
  spacing: z.coerce.number(),
})

export function InspectorColumnBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.ColumnBlock)

  const form = useAppForm({
    defaultValues: {
      spacing: node.block.spacing as Any,
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
          block: {
            ...node.block,
            spacing: data.spacing,
          },
        }))
      },
    },
  })

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Column
      </InspectorTitle>

      <form.AppForm>
        <FieldSet>
          <div className="grid grid-cols-2 gap-4">
            <form.AppField name="spacing">
              {(field) => (
                <field.Input
                  label="Spacing"
                  type="number"
                  placeholder="0"
                  min={0}
                  max={4096}
                  appendAddon={(
                    <InputGroupAddon align="inline-end">
                      <InputGroupText>px</InputGroupText>
                    </InputGroupAddon>
                  )}
                />
              )}
            </form.AppField>
          </div>
        </FieldSet>
      </form.AppForm>

      <Separator />

      <InspectorBaseBlock nodeId={nodeId} />
    </div>
  )
}
