import { InspectorBaseBlock } from "@/features/pdf-editor/inspector/blocks/inspector-base-block"
import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { InspectorTitle } from "@/features/pdf-editor/inspector/inspector-title"
import { Trees } from "@/features/trees/trees"
import { TreeNodeType } from "@/features/trees/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldSet } from "@/lib/ui/field"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/lib/ui/input-group"
import { Separator } from "@/lib/ui/separator"
import { useState } from "react"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"

export function InspectorTextBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.TextBlock)

  const [content, setContent] = useState(node.block.content)

  const updateNode = useDebounceFn(Trees.updateNode.bind(Trees), 1000)

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Text
      </InspectorTitle>

      <FieldSet>
        <FieldGroup>
          <Field>
            <InputGroup>
              <InputGroupTextarea
                id="content"
                placeholder="Enter your text here..."
                value={content}
                onChange={(event) => {
                  setContent(event.target.value)

                  updateNode(treeId, {
                    ...node,
                    block: {
                      ...node.block,
                      content: event.target.value,
                    },
                  })
                }}
              />
              <InputGroupAddon align="block-end">
                <InputGroupText className="text-muted-foreground text-xs">
                  <span>{content.length}</span> characters
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </FieldGroup>
      </FieldSet>

      <Separator />

      <InspectorBaseBlock nodeId={nodeId} />
    </div>
  )
}
