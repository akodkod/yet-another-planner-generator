import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { Trees } from "@/features/trees/trees"
import { BlockTreeNode, TreeNodeBlockTypes } from "@/features/trees/tree"
import { FieldSet } from "@/lib/ui/field"
import { InputGroupAddon, InputGroupText } from "@/lib/ui/input-group"
import { Transform } from "@/lib/utils/react-pdf"
import { match } from "ts-pattern"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor"
import { useAppForm } from "@/lib/ui/tanstack-form"
import { Any } from "@/lib/utils/types"

const schema = z.object({
  translateX: z.coerce.number(),
  translateY: z.coerce.number(),
  scaleX: z.coerce.number(),
  scaleY: z.coerce.number(),
  skewX: z.coerce.number(),
  skewY: z.coerce.number(),
  rotate: z.coerce.number(),
})

export function InspectorBaseBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeAnyOf(nodeId, TreeNodeBlockTypes)

  const packedTransforms = Array.isArray(node.block.style.transform)
    ? node.block.style.transform
    : []

  const initialTransforms = unpackTransforms(packedTransforms)

  const form = useAppForm({
    defaultValues: {
      translateX: (initialTransforms.translateX ?? 0) as Any,
      translateY: (initialTransforms.translateY ?? 0) as Any,
      scaleX: (initialTransforms.scaleX ?? 1) as Any,
      scaleY: (initialTransforms.scaleY ?? 1) as Any,
      skewX: (initialTransforms.skewX ?? 0) as Any,
      skewY: (initialTransforms.skewY ?? 0) as Any,
      rotate: (initialTransforms.rotate ?? 0) as Any,
    },
    validators: {
      onChange: schema,
    },
    listeners: {
      onChangeDebounceMs: 1000,
      onChange: ({ formApi }) => {
        const { data, success } = schema.safeParse(formApi.store.state.values)
        if (!success) return

        const transforms: ParsedTransform = {
          translateX: data.translateX,
          translateY: data.translateY,
          scaleX: data.scaleX,
          scaleY: data.scaleY,
          skewX: data.skewX,
          skewY: data.skewY,
          rotate: data.rotate,
        }

        // @ts-expect-error -- TODO: Fix this
        Trees.updateNode(treeId, node as BlockTreeNode, (node) => ({
          ...node,
          block: {
            ...node.block,
            style: {
              ...node.block.style,
              transform: packTransforms(transforms),
            },
          },
        }))
      },
    },
  })

  return (
    <form.AppForm>
      <FieldSet>
        <div className="grid grid-cols-2 gap-4">
          <form.AppField name="translateX">
            {(field) => (
              <field.Input
                label="Translate X"
                type="number"
                placeholder="0"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>px</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="translateY">
            {(field) => (
              <field.Input
                label="Translate Y"
                type="number"
                placeholder="0"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>px</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="scaleX">
            {(field) => (
              <field.Input
                label="Scale X"
                type="number"
                placeholder="1"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="scaleY">
            {(field) => (
              <field.Input
                label="Scale Y"
                type="number"
                placeholder="1"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>%</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="skewX">
            {(field) => (
              <field.Input
                label="Skew X"
                type="number"
                placeholder="0"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>deg</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="skewY">
            {(field) => (
              <field.Input
                label="Skew Y"
                type="number"
                placeholder="0"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>deg</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>

          <form.AppField name="rotate">
            {(field) => (
              <field.Input
                label="Rotate"
                type="number"
                placeholder="0"
                appendAddon={(
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>deg</InputGroupText>
                  </InputGroupAddon>
                )}
              />
            )}
          </form.AppField>
        </div>
      </FieldSet>
    </form.AppForm>
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
  const {
    translateX = 0,
    translateY = 0,
    rotate = 0,
    scaleX = 1,
    scaleY = 1,
    skewX = 0,
    skewY = 0,
  } = transforms

  const packedTransforms: Transform[] = []

  if (translateX !== 0 || translateY !== 0) {
    packedTransforms.push({ operation: "translate", value: [translateX, translateY] })
  }

  if (rotate !== 0) {
    packedTransforms.push({ operation: "rotate", value: [rotate] })
  }

  if (scaleX !== 1 || scaleY !== 1) {
    packedTransforms.push({ operation: "scale", value: [scaleX, scaleY] })
  }

  if (skewX !== 0 || skewY !== 0) {
    packedTransforms.push({ operation: "skew", value: [skewX, skewY] })
  }

  return packedTransforms
}
