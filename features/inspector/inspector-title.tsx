import { cn } from "@/lib/ui/utils"
import { ComponentProps } from "react"

export type InspectorTitleProps = ComponentProps<"h6">

export function InspectorTitle({ className, children, ...props }: InspectorTitleProps) {
  return (
    <p
      className={cn("text-muted-foreground font-medium", className)}
      {...props}
    >
      {children}
    </p>
  )
}
