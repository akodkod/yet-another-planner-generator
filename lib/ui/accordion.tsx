import * as React from "react"
import { Accordion as AccordionPrimitive } from "@base-ui-components/react/accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/ui/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(`
        mb-2
        last:mb-0
      `, className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          `
            focus-visible:border-ring
            cursor-pointer
            focus-visible:ring-ring/50
            flex flex-1 items-center justify-start gap-2 rounded-md px-3 py-2 text-left text-sm font-medium
            transition-all outline-none
            focus-visible:ring-[3px]
            disabled:pointer-events-none disabled:opacity-50
            [&_svg]:size-4 [&_svg]:text-muted-foreground [&_svg]:opacity-75
            [&[data-panel-open]>[data-slot=indicator-icon]]:rotate-180
            hover:bg-accent
            bg-accent/75
          `,
          className,
        )}
        {...props}
      >
        {children}

        <ChevronDownIcon
          data-slot="indicator-icon"
          className="pointer-events-none shrink-0 transition-transform duration-200 ml-auto"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Panel>) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={`
        h-(--accordion-panel-height) text-sm transition-[height,opacity] ease-out opacity-100
        data-ending-style:h-0
        data-starting-style:h-0
        data-ending-style:opacity-0
        data-starting-style:opacity-0
      `}
      {...props}
    >
      <div className={cn("pt-1 pb-3 px-1", className)}>
        {children}
      </div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
