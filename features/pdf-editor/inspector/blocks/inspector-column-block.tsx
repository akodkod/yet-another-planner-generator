import { InspectorBaseBlock } from "@/features/pdf-editor/inspector/blocks/inspector-base-block"
import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { InspectorTitle } from "@/features/pdf-editor/inspector/inspector-title"
import { Trees } from "@/features/trees/trees"
import { TreeNodeType } from "@/features/trees/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldSet, FieldLabel } from "@/lib/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/lib/ui/input-group"
import { Separator } from "@/lib/ui/separator"
import { useState } from "react"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"

export function InspectorColumnBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.ColumnBlock)

  const [spacing, setSpacing] = useState(node.block.spacing)

  const updateNode = useDebounceFn(Trees.updateNode.bind(Trees), 1000)

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Column
      </InspectorTitle>

      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="spacing">Spacing</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="spacing"
                  type="number"
                  placeholder="0"
                  value={spacing}
                  onChange={(event) => {
                    const value = z.coerce.number().parse(event.target.value)
                    setSpacing(value)

                    updateNode(treeId, {
                      ...node,
                      block: {
                        ...node.block,
                        spacing: value,
                      },
                    })
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>

      <Separator />

      <InspectorBaseBlock nodeId={nodeId} />
    </div>
  )
}
