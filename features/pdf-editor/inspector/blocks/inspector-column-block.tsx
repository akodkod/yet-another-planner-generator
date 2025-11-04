import { InspectorBaseBlock } from "@/features/pdf-editor/inspector/blocks/inspector-base-block"
import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { Trees } from "@/features/trees/trees.module"
import { TreeNodeType } from "@/features/trees/tree"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { useAppForm } from "@/lib/ui/tanstack-form"
import { Any } from "@/lib/utils/types"
import { InputGroupAddon, InputGroupText } from "@/lib/ui/input-group"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/lib/ui/accordion"
import { MoveVerticalIcon } from "lucide-react"
import { InspectorHeader } from "@/features/pdf-editor/inspector/common/inspector-header"

const schema = z.object({
  spacing: z.coerce.number().min(0).max(4096),
})

export function InspectorColumnBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.ColumnBlock)

  const form = useAppForm({
    defaultValues: {
      spacing: node.data.spacing as Any,
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
            spacing: data.spacing,
          },
        }))
      },
    },
  })

  return (
    <div className="space-y-2">
      <InspectorHeader node={node} />

      <form.AppForm>
        <Accordion>
          <AccordionItem value="spacing">
            <AccordionTrigger>
              <MoveVerticalIcon />
              Spacing
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="spacing">
                  {(field) => (
                    <field.Input
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </form.AppForm>

      <InspectorBaseBlock nodeId={nodeId} />
    </div>
  )
}
