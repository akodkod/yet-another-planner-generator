import { InspectorBaseBlock } from "@/features/inspector/blocks/inspector-base-block"
import { InspectorNodeRendererProps } from "@/features/inspector/inspector"
import { InspectorTitle } from "@/features/inspector/inspector-title"
import { TreeStore } from "@/features/tree-store/tree-store"
import { TextBlockTreeNode } from "@/features/tree/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldSet } from "@/lib/ui/field"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupTextarea } from "@/lib/ui/input-group"
import { Separator } from "@/lib/ui/separator"
import { useState } from "react"

export function InspectorTextBlock({ treeId, nodeId }: InspectorNodeRendererProps) {
  const node = TreeStore.useNode<TextBlockTreeNode>(treeId, nodeId)

  const [content, setContent] = useState(node.block.content)

  const updateNode = useDebounceFn(TreeStore.updateNode.bind(TreeStore), 1000)

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

      <InspectorBaseBlock
        treeId={treeId}
        nodeId={nodeId}
      />
    </div>
  )
}
