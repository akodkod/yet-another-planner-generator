import { Button } from "@/lib/ui/button"
import { cn } from "@/lib/ui/utils"
import { ChevronDownIcon, ChevronRightIcon, LucideIcon } from "lucide-react"
import { ReactNode, useState } from "react"

export type OutlineItemProps = {
  name: ReactNode
  icon?: LucideIcon
  alwaysExpanded?: boolean
  selected?: boolean
  className?: string
  children?: ReactNode
  onClick: () => void
}

export function OutlineItem({
  name,
  icon: Icon,
  alwaysExpanded = false,
  selected = undefined,
  className,
  children,
  onClick,
}: OutlineItemProps) {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className={cn("relative rounded-md", className)}>
      {!!children && !alwaysExpanded && (
        <div
          data-slot="outline-visual-line"
          className="absolute top-10 bottom-0 left-[calc(0.875rem-0.5px)] w-px bg-muted"
        />
      )}

      <div className="flex flex-row items-center gap-px">
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
          data-slot="outline-button"
          data-selected={selected}
          variant="ghost"
          size="sm"
          className="flex-1 justify-start truncate"
          onClick={onClick}
        >
          {Icon && (
            <Icon
              data-slot="outline-icon"
              className="opacity-25"
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
