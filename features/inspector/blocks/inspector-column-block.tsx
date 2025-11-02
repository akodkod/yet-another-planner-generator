import { InspectorBaseBlock } from "@/features/inspector/blocks/inspector-base-block"
import { InspectorNodeRendererProps } from "@/features/inspector/inspector"
import { InspectorTitle } from "@/features/inspector/inspector-title"
import { TreeStore } from "@/features/tree-store/tree-store"
import { ColumnBlockTreeNode } from "@/features/tree/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldSet, FieldLabel } from "@/lib/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/lib/ui/input-group"
import { Separator } from "@/lib/ui/separator"
import { useState } from "react"
import * as z from "zod"

export function InspectorColumnBlock({ treeId, nodeId }: InspectorNodeRendererProps) {
  const node = TreeStore.useNode<ColumnBlockTreeNode>(treeId, nodeId)

  const [spacing, setSpacing] = useState(node.block.spacing)

  const updateNode = useDebounceFn(TreeStore.updateNode.bind(TreeStore), 1000)

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

      <InspectorBaseBlock
        treeId={treeId}
        nodeId={nodeId}
      />
    </div>
  )
}
