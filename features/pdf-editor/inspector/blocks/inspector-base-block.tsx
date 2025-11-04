import { InspectorRenderNodeProps } from "@/features/pdf-editor/inspector/inspector"
import { Trees } from "@/features/trees/trees.module"
import { BlockNode, TreeNodeBlockTypes } from "@/features/trees/tree"
import { InputGroupAddon, InputGroupButton, InputGroupText } from "@/lib/ui/input-group"
import { Transform } from "@/lib/utils/react-pdf"
import { match } from "ts-pattern"
import * as z from "zod"
import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { FormApiAny, useAppForm } from "@/lib/ui/tanstack-form"
import { Any } from "@/lib/utils/types"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/lib/ui/accordion"
import { MoveIcon, RotateCwIcon, ScalingIcon, SquareIcon, XIcon } from "lucide-react"
import { useCreateOnce } from "@/lib/hooks/use-create-once"

enum Sections {
  Translate = "translate",
  Scale = "scale",
  Rotate = "rotate",
  Skew = "skew",
}

const schema = z.object({
  translateX: z.coerce.number().min(-4096).max(4096),
  translateY: z.coerce.number().min(-4096).max(4096),
  scaleX: z.coerce.number().min(0).max(100),
  scaleY: z.coerce.number().min(0).max(100),
  skewX: z.coerce.number().min(-180).max(180),
  skewY: z.coerce.number().min(-180).max(180),
  rotate: z.coerce.number().min(-360).max(360),
})

export function InspectorBaseBlock({ nodeId }: InspectorRenderNodeProps) {
  const treeId = PDFEditor.useTreeId()
  const node = PDFEditor.useNodeAnyOf(nodeId, TreeNodeBlockTypes)

  const packedTransforms = Array.isArray(node.data.style.transform)
    ? node.data.style.transform
    : []

  const unpackedTransforms = unpackTransforms(packedTransforms)
  const initialOpenSections = useCreateOnce(() => getVisibleSections(unpackedTransforms))

  const submitForm = ({ formApi }: { formApi: FormApiAny }) => {
    const { data, error } = schema.safeParse(formApi.store.state.values)
    if (error) return

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
    Trees.updateNode(treeId, node as BlockNode, (node) => ({
      ...node,
      data: {
        ...node.data,
        style: {
          ...node.data.style,
          transform: packTransforms(transforms),
        },
      },
    }))
  }

  const form = useAppForm({
    defaultValues: {
      translateX: (unpackedTransforms.translateX ?? 0) as Any,
      translateY: (unpackedTransforms.translateY ?? 0) as Any,
      scaleX: (unpackedTransforms.scaleX ?? 1) as Any,
      scaleY: (unpackedTransforms.scaleY ?? 1) as Any,
      skewX: (unpackedTransforms.skewX ?? 0) as Any,
      skewY: (unpackedTransforms.skewY ?? 0) as Any,
      rotate: (unpackedTransforms.rotate ?? 0) as Any,
    },
    validators: {
      onChange: schema,
    },
    listeners: {
      onChangeDebounceMs: 500,
      onChange: submitForm,
      onSubmit: submitForm,
    },
  })

  return (
    <>
      <form.AppForm>
        <Accordion defaultValue={initialOpenSections}>
          <AccordionItem value={Sections.Translate}>
            <AccordionTrigger>
              <MoveIcon />
              Translate
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="translateX">
                  {(field) => (
                    <field.Input
                      type="number"
                      placeholder="0"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>X</InputGroupText>
                        </InputGroupAddon>
                      )}
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
                      type="number"
                      placeholder="0"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>Y</InputGroupText>
                        </InputGroupAddon>
                      )}
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
          <AccordionItem value={Sections.Scale}>
            <AccordionTrigger>
              <ScalingIcon />
              Scale
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="scaleX">
                  {(field) => (
                    <field.Input
                      type="number"
                      placeholder="1"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>X</InputGroupText>
                        </InputGroupAddon>
                      )}
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
                      type="number"
                      placeholder="1"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>Y</InputGroupText>
                        </InputGroupAddon>
                      )}
                      appendAddon={(
                        <InputGroupAddon align="inline-end">
                          <InputGroupText>%</InputGroupText>
                        </InputGroupAddon>
                      )}
                    />
                  )}
                </form.AppField>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={Sections.Rotate}>
            <AccordionTrigger>
              <RotateCwIcon />
              Rotate
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="rotate">
                  {(field) => (
                    <field.Input
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
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value={Sections.Skew}>
            <AccordionTrigger>
              <SquareIcon className="-skew-x-8" />
              Skew
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4">
                <form.AppField name="skewX">
                  {(field) => (
                    <field.Input
                      type="number"
                      placeholder="0"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>X</InputGroupText>
                        </InputGroupAddon>
                      )}
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
                      type="number"
                      placeholder="0"
                      prependAddon={(
                        <InputGroupAddon align="inline-start">
                          <InputGroupText>Y</InputGroupText>
                        </InputGroupAddon>
                      )}
                      appendAddon={(
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            size="icon-xs"
                            onClick={async () => {
                              field.setValue(0, { dontRunListeners: true })
                              field.form.handleSubmit()
                            }}
                          >
                            <XIcon />
                          </InputGroupButton>
                          <InputGroupText>deg</InputGroupText>
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
    </>
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

  if (hasTranslate(transforms)) {
    packedTransforms.push({ operation: "translate", value: [translateX, translateY] })
  }

  if (hasRotate(transforms)) {
    packedTransforms.push({ operation: "rotate", value: [rotate] })
  }

  if (hasScale(transforms)) {
    packedTransforms.push({ operation: "scale", value: [scaleX, scaleY] })
  }

  if (hasSkew(transforms)) {
    packedTransforms.push({ operation: "skew", value: [skewX, skewY] })
  }

  return packedTransforms
}

function hasTranslate(transforms: ParsedTransform) {
  return (transforms.translateX !== undefined && transforms.translateX !== 0) || (transforms.translateY !== undefined && transforms.translateY !== 0)
}

function hasScale(transforms: ParsedTransform) {
  return (transforms.scaleX !== undefined && transforms.scaleX !== 1) || (transforms.scaleY !== undefined && transforms.scaleY !== 1)
}

function hasRotate(transforms: ParsedTransform) {
  return transforms.rotate !== undefined && transforms.rotate !== 0
}

function hasSkew(transforms: ParsedTransform) {
  return (transforms.skewX !== undefined && transforms.skewX !== 0) || (transforms.skewY !== undefined && transforms.skewY !== 0)
}

function getVisibleSections(transforms: ParsedTransform) {
  const sections: Sections[] = []

  if (hasTranslate(transforms)) {
    sections.push(Sections.Translate)
  }

  if (hasScale(transforms)) {
    sections.push(Sections.Scale)
  }

  if (hasRotate(transforms)) {
    sections.push(Sections.Rotate)
  }

  if (hasSkew(transforms)) {
    sections.push(Sections.Skew)
  }

  return sections
}
