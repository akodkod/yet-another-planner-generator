import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { InspectorTitle } from "@/features/pdf-editor/inspector/inspector-title"
import { Trees } from "@/features/trees/trees"
import { TreeNodeType } from "@/features/trees/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldLabel, FieldSet } from "@/lib/ui/field"
import { Input } from "@/lib/ui/input"
import { InputGroup, InputGroupAddon, InputGroupText, InputGroupInput } from "@/lib/ui/input-group"
import { useState } from "react"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"

export function InspectorRootChapter({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeOf(nodeId, TreeNodeType.RootChapter)

  const [year, setYear] = useState(node.chapter.year)
  const [pageWidth, setPageWidth] = useState(node.chapter.pageWidth)
  const [pageHeight, setPageHeight] = useState(node.chapter.pageHeight)

  const updateNode = useDebounceFn(Trees.updateNode.bind(Trees), 1000)

  return (
    <div className="space-y-4">
      <InspectorTitle>
        Planner Settings
      </InspectorTitle>

      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="year">Year</FieldLabel>
              <Input
                id="year"
                type="number"
                placeholder="2025"
                value={year}
                onChange={(event) => {
                  const value = z.coerce.number().parse(event.target.value)
                  setYear(value)

                  updateNode(treeId, {
                    ...node,
                    chapter: {
                      ...node.chapter,
                      year: value,
                    },
                  })
                }}
              />
            </Field>

            <div />

            <Field>
              <FieldLabel htmlFor="pageWidth">Page Width</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="pageWidth"
                  type="number"
                  placeholder="1620"
                  value={pageWidth}
                  onChange={(event) => {
                    const value = z.coerce.number().parse(event.target.value)
                    setPageWidth(value)

                    updateNode(treeId, {
                      ...node,
                      chapter: {
                        ...node.chapter,
                        pageWidth: value,
                      },
                    })
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
            <Field>
              <FieldLabel htmlFor="pageHeight">Page Height</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="pageHeight"
                  type="number"
                  placeholder="2160"
                  value={pageHeight}
                  onChange={(event) => {
                    const value = z.coerce.number().parse(event.target.value)
                    setPageHeight(value)

                    updateNode(treeId, {
                      ...node,
                      chapter: {
                        ...node.chapter,
                        pageWidth: value,
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
    </div>
  )
}
