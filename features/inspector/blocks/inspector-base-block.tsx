import { InspectorNodeRendererProps } from "@/features/inspector/inspector"
import { TreeStore } from "@/features/tree-store/tree-store"
import { BlockTreeNode } from "@/features/tree/tree"
import { useDebounceFn } from "@/lib/hooks/use-debounce-fn"
import { FieldGroup, Field, FieldSet, FieldLabel } from "@/lib/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/lib/ui/input-group"
import { Transform } from "@/lib/utils/react-pdf"
import { useState } from "react"
import { match } from "ts-pattern"
import * as z from "zod"

export function InspectorBaseBlock({ treeId, nodeId }: InspectorNodeRendererProps) {
  const node = TreeStore.useNode<BlockTreeNode>(treeId, nodeId)

  const packedTransforms = typeof node.block.style.transform === "string"
    ? JSON.parse(node.block.style.transform)
    : node.block.style.transform ?? []

  const [transforms, setTransforms] = useState<ParsedTransform>(unpackTransforms(packedTransforms))

  const updateNode = useDebounceFn(TreeStore.updateNode.bind(TreeStore), 1000)

  const updateTransforms = useDebounceFn((transforms: ParsedTransform) => {
    TreeStore.updateNode(treeId, {
      ...node,
      block: {
        ...node.block,
        style: {
          ...node.block.style,
          transform: packTransforms(transforms),
        },
      },
    })
  }, 1000)

  return (
    <div>
      <FieldSet>
        <FieldGroup>
          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="translateX">Translate X</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="translateX"
                  type="number"
                  placeholder="0"
                  value={transforms.translateX ?? 0}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(0).parse(event.target.value)
                    const newTransforms = { ...transforms, translateX: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="translateY">Translate Y</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="translateY"
                  type="number"
                  placeholder="0"
                  value={transforms.translateY ?? 0}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(0).parse(event.target.value)
                    const newTransforms = { ...transforms, translateY: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>px</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="scaleX">Scale X</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="scaleX"
                  type="number"
                  placeholder="100"
                  value={transforms.scaleX ?? 100}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(100).parse(event.target.value)
                    const newTransforms = { ...transforms, scaleX: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="scaleY">Scale Y</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="scaleY"
                  type="number"
                  placeholder="100"
                  value={transforms.scaleY ?? 100}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(100).parse(event.target.value)
                    const newTransforms = { ...transforms, scaleY: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>%</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="skewX">Skew X</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="skewX"
                  type="number"
                  placeholder="0"
                  value={transforms.skewX ?? 0}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(0).parse(event.target.value)
                    const newTransforms = { ...transforms, skewX: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>deg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="skewY">Skew Y</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="skewY"
                  type="number"
                  placeholder="0"
                  value={transforms.skewY ?? 0}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(0).parse(event.target.value)
                    const newTransforms = { ...transforms, skewY: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>deg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="rotate">Rotate</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  id="rotate"
                  type="number"
                  placeholder="0"
                  value={transforms.rotate ?? 0}
                  onChange={(event) => {
                    const value = z.coerce.number().catch(0).parse(event.target.value)
                    const newTransforms = { ...transforms, rotate: value }
                    setTransforms(newTransforms)
                    updateTransforms(newTransforms)
                  }}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupText>deg</InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          </div>
        </FieldGroup>
      </FieldSet>
    </div>
  )
}

type ParsedTransform = {
  translateX?: number
  translateY?: number
  scaleX?: number
  scaleY?: number
  skewX?: number
  skewY?: number
  rotate?: number
}

function unpackTransforms(transforms: Transform[]) {
  const parsedTransforms: ParsedTransform = {}

  for (const transform of transforms) {
    match(transform)
      .with({ operation: "translate" }, (transform) => {
        parsedTransforms.translateX = transform.value[0]
        parsedTransforms.translateY = transform.value[1]
      })
      .with({ operation: "rotate" }, (transform) => {
        parsedTransforms.rotate = transform.value[0]
      })
      .with({ operation: "scale" }, (transform) => {
        parsedTransforms.scaleX = transform.value[0]
        parsedTransforms.scaleY = transform.value[1]
      })
      .with({ operation: "skew" }, (transform) => {
        parsedTransforms.skewX = transform.value[0]
        parsedTransforms.skewY = transform.value[1]
      })
  }

  return parsedTransforms
}

function packTransforms(transforms: ParsedTransform): Transform[] {
  const packedTransforms: Transform[] = []

  const { translateX = 0, translateY = 0, rotate = 0, scaleX = 0, scaleY = 0, skewX = 0, skewY = 0 } = transforms

  if (translateX !== 0 || translateY !== 0) {
    packedTransforms.push({ operation: "translate", value: [translateX, translateY] })
  }

  if (rotate !== 0) {
    packedTransforms.push({ operation: "rotate", value: [rotate] })
  }

  // if (scaleX !== 100 || scaleY !== 100) {
  //   packedTransforms.push({ operation: "scale", value: [scaleX, scaleY] })
  // }

  if (skewX !== 0 || skewY !== 0) {
    packedTransforms.push({ operation: "skew", value: [skewX, skewY] })
  }

  return packedTransforms
}
