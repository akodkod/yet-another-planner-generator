import { PDFEditor } from "@/features/pdf-editor/pdf-editor.module"
import { Button } from "@/lib/ui/button"
import { cn } from "@/lib/ui/utils"
import { ChevronDownIcon, ChevronRightIcon, LucideIcon } from "lucide-react"
import { ReactNode, useState } from "react"

export type OutlineItemProps = {
  nodeId: string
  name: ReactNode
  icon?: LucideIcon
  alwaysExpanded?: boolean
  append?: ReactNode
  className?: string
  children?: ReactNode
  onClick: () => void
}

export function OutlineItem({
  nodeId,
  name,
  icon: Icon,
  alwaysExpanded = false,
  append,
  className,
  children,
  onClick,
}: OutlineItemProps) {
  const [expanded, setExpanded] = useState(true)

  const selectedNodeId = PDFEditor.useOptionalSelectedNodeId()
  const isSelected = selectedNodeId === nodeId

  return (
    <div className={cn("relative rounded-md", className)}>
      {!!children && !alwaysExpanded && (
        <div
          data-slot="outline-visual-line"
          className="absolute top-10 bottom-0 left-[calc(0.875rem-0.5px)] w-px bg-muted"
        />
      )}

      <div className="group flex flex-row items-center gap-px">
        {!alwaysExpanded && (
          children ? (
            <Button
              data-slot="outline-expand-button"
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => setExpanded((prev) => !prev)}
            >
              {expanded ? <ChevronDownIcon /> : <ChevronRightIcon />}
            </Button>
          ) : (
            <div className="size-7" />
          )
        )}

        <Button
          data-slot={isSelected ? "outline-button-selected" : "outline-button"}
          variant={isSelected ? "default" : "ghost"}
          size="sm"
          className="flex-1 justify-start truncate"
          onClick={onClick}
        >
          {Icon && (
            <Icon
              data-slot={isSelected ? "outline-icon-selected" : "outline-icon"}
              className={cn(!isSelected && "opacity-25")}
            />
          )}

          {typeof name === "string" ? (
            <span className="truncate">
              {name}
            </span>
          ) : (
            name
          )}
        </Button>

        {append}
      </div>

      {children !== undefined && (expanded || alwaysExpanded) && (
        <div
          data-slot="outline-children"
          className={cn(!alwaysExpanded && "pl-7")}
        >
          {children}
        </div>
      )}
    </div>
  )
}
