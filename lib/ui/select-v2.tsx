import { Combobox } from "@base-ui-components/react/combobox"
import { Any, AriaProps } from "../utils/types"
import { CheckIcon, ChevronsUpDownIcon, LucideIcon, SearchIcon, XIcon } from "lucide-react"
import { cn } from "./utils"
import { Input } from "./input"
import { Fragment, ReactNode, useMemo } from "react"
import { formatList } from "../utils/string"
import { getKey } from "../utils/object"
import { Separator } from "./separator"

export type SelectOption<T = Any> = {
  value: T
  label: string
  bolder?: boolean
  separatorAfter?: boolean
}

export type RenderOptionProps<ItemValue> = {
  item: SelectOption<ItemValue>
}

export type SelectProps<
  ItemValue,
  SelectedValue = ItemValue,
  Multiple extends boolean | undefined = false,
> = Combobox.Root.Props<ItemValue, SelectedValue, Multiple> & AriaProps & {
  size?: "sm" | "md" | "lg"
  options: SelectOption<ItemValue>[]
  showSearch?: boolean
  showClearButton?: boolean
  showPickOmitButtons?: boolean
  hideEmptyMessage?: boolean
  icon?: LucideIcon
  placeholder?: string
  placeholderSearch?: string
  className?: string
  itemClassName?: string
  popupClassName?: string
  beforeTriggerContent?: ReactNode
  postListContent?: ReactNode
  renderOption?: (props: RenderOptionProps<ItemValue>) => ReactNode
}

export function Select<ItemValue, SelectedValue = ItemValue, Multiple extends boolean | undefined = false>({
  size = "md",
  options,
  showSearch = false,
  showClearButton = false,
  showPickOmitButtons = false,
  hideEmptyMessage = false,
  icon: Icon,
  placeholder,
  placeholderSearch,
  className,
  itemClassName,
  popupClassName,
  renderOption: RenderOption = DefaultRenderOption,
  beforeTriggerContent,
  postListContent,
  ...props
}: SelectProps<ItemValue, SelectedValue, Multiple>) {
  const selectedItems = useMemo(() => {
    if (Array.isArray(props.value)) {
      return props.value.map((value) => options.find((option) => option.value === value)).filter(Boolean)
    }

    const selectedItem = options.find((item) => item.value === props.value)
    return selectedItem ? [selectedItem] : []
  }, [props.value, options])

  const hasAnySelectedItems = selectedItems.length > 0
  const shouldShowPickOmitButtons = showPickOmitButtons && Array.isArray(props.value)

  const selectedListOrCount = selectedItems.length > 1
    ? `${selectedItems.length} selected`
    : formatList(selectedItems.map((item) => item.label))

  return (
    <Combobox.Root
      {...props}
      items={options as ItemValue[]}
    >
      <Combobox.Trigger
        aria-invalid={props["aria-invalid"]}
        aria-describedby={props["aria-describedby"]}
        data-size={size}
        className={cn(
          `
            relative flex h-9 w-full max-w-lg min-w-52 cursor-pointer items-center gap-0 rounded-(--input-rounding)
            border-[0.5px] border-border bg-white pr-1.5 pl-3 shadow-xs transition-all
            focus-visible:border-ring/60 focus-visible:ring-[3px] focus-visible:ring-ring/40 focus-visible:outline-0
            enabled:hover:bg-accent/50
            disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
            aria-invalid:border-destructive/75 aria-invalid:ring-destructive/20 aria-invalid:outline
            aria-invalid:-outline-offset-2 aria-invalid:outline-destructive/75
            data-[size=lg]:h-10
            data-[size=sm]:h-8 data-[size=sm]:pr-1 data-[size=sm]:pl-2.5
            dark:bg-input/30 dark:hover:bg-input/40 dark:aria-invalid:border-destructive/80
            dark:aria-invalid:ring-destructive/45
            enabled:hover:[&_[data-slot="combobox-icon"]]:bg-accent/100
            aria-invalid:[&_[data-slot="icon"]]:text-destructive/75
          `,
          className,
        )}
      >
        {beforeTriggerContent}

        {Icon && (
          <Combobox.Icon>
            <Icon
              data-slot="icon"
              className="mr-2 size-4 text-muted-foreground opacity-50"
            />
          </Combobox.Icon>
        )}

        <Combobox.Value>
          <div
            className={cn(
              `
                line-clamp-1 flex h-9 flex-1 items-center justify-start truncate text-left text-base whitespace-normal
                md:text-sm
              `,
              !hasAnySelectedItems && "text-muted-foreground/75",
            )}
          >
            {hasAnySelectedItems
              ? selectedListOrCount
              : placeholder}
          </div>
        </Combobox.Value>

        {showClearButton && (
          <Combobox.Clear
            nativeButton={false}
            render={(props) => (
              <div
                role="button"
                aria-label="Clear selection"
                className={cn(
                  `
                    flex size-6 cursor-pointer items-center justify-center
                    rounded-[calc(var(--input-rounding)-(--spacing(0.5)))]
                    hover:bg-destructive/10
                  `,
                )}
                {...props}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  props.onClick?.(event)
                }}
              >
                <XIcon className="size-4 text-destructive" />
              </div>
            )}
          />
        )}

        <Combobox.Icon
          aria-label="Open popup"
          data-slot="combobox-icon"
          className={`
            flex size-6 cursor-pointer items-center justify-center
            rounded-[calc(var(--input-rounding)-(--spacing(0.5)))]
          `}
        >
          <ChevronsUpDownIcon
            className="size-4 text-muted-foreground opacity-50"
          />
        </Combobox.Icon>
      </Combobox.Trigger>

      <Combobox.Portal>
        <Combobox.Positioner
          className="z-100 outline-none"
          sideOffset={8}
          align="start"
        >
          <Combobox.Popup
            className={cn(
              `
                max-h-[min(var(--available-height),23rem)] w-(--anchor-width) max-w-(--available-width)
                origin-(--transform-origin) scroll-py-2 overflow-y-auto overscroll-contain rounded-md bg-popover py-2
                text-popover-foreground shadow-lg outline-1 -outline-offset-1 outline-border
                transition-[transform,scale,opacity]
                data-[ending-style]:scale-95 data-[ending-style]:opacity-0
                data-[side=none]:data-[ending-style]:transition-none
                data-[starting-style]:scale-95 data-[starting-style]:opacity-0
                data-[side=none]:data-[starting-style]:scale-100 data-[side=none]:data-[starting-style]:opacity-100
                data-[side=none]:data-[starting-style]:transition-none
                dark:shadow-none
              `,
              popupClassName,
            )}
          >
            {showSearch && (
              <div className="h-(--input-container-height) p-2 pt-0 text-center">
                <Combobox.Input
                  render={(props) => (
                    <Input
                      variant="muted"
                      icon={SearchIcon}
                      placeholder={placeholderSearch ?? "Search"}
                      className={"[&_[data-slot='icon']]:ml-2 [&_[data-slot='icon']]:size-3.5"}
                      {...props}
                    />
                  )}
                />
              </div>
            )}

            {!hideEmptyMessage && (
              <Combobox.Empty
                className={`
                  px-4 py-2 text-sm leading-4 text-muted-foreground
                  empty:m-0 empty:p-0
                `}
              >
                No options available
              </Combobox.Empty>
            )}

            <Combobox.List>
              {(item: SelectOption<ItemValue>) => (
                <Fragment key={getKey(item)}>
                  <Combobox.Item
                    value={item.value}
                    title={item.label}
                    className={cn(
                      `
                        group/item grid cursor-default grid-cols-[0.875rem_1fr_auto] items-center gap-2 py-2 pr-5 pl-4
                        text-sm leading-4 outline-none select-none
                        data-[highlighted]:relative data-[highlighted]:z-0 data-[highlighted]:text-accent-foreground
                        data-[highlighted]:before:absolute data-[highlighted]:before:inset-x-2
                        data-[highlighted]:before:inset-y-0 data-[highlighted]:before:z-[-1]
                        data-[highlighted]:before:rounded-sm data-[highlighted]:before:bg-accent
                      `,
                      item.bolder && "font-medium",
                      itemClassName,
                    )}
                  >
                    <Combobox.ItemIndicator className="col-start-1">
                      <CheckIcon className="size-3.5 stroke-3 text-foreground" />
                    </Combobox.ItemIndicator>

                    <div className="col-start-2">
                      <RenderOption item={item} />
                    </div>

                    {shouldShowPickOmitButtons && (
                      <div
                        className={`
                          col-start-3 flex items-center gap-1.5 opacity-0 transition-opacity duration-150
                          group-hover/item:opacity-100
                        `}
                      >
                        <button
                          type="button"
                          className={`
                            relative cursor-pointer text-xs font-medium text-muted-foreground
                            hover:text-foreground
                          `}
                          onClick={(event) => {
                            event.stopPropagation()
                            props.onValueChange?.([item.value] as Any, undefined as Any)
                          }}
                        >
                          <span
                            className="absolute top-1/2 left-1/2 size-[max(100%,2rem)] -translate-1/2"
                            aria-hidden="true"
                          />

                          Pick
                        </button>
                        <button
                          type="button"
                          className={`
                            relative cursor-pointer text-xs font-medium text-muted-foreground
                            hover:text-foreground
                          `}
                          onClick={(event) => {
                            event.stopPropagation()

                            const values = options.map((option) => option.value).filter((value) => value !== item.value)
                            props.onValueChange?.(values as Any, undefined as Any)
                          }}
                        >
                          <span
                            className="absolute top-1/2 left-1/2 size-[max(100%,2rem)] -translate-1/2"
                            aria-hidden="true"
                          />
                          Omit
                        </button>
                      </div>
                    )}
                  </Combobox.Item>

                  {item.separatorAfter && (
                    <Combobox.Separator
                      render={
                        <Separator
                          className={`
                            my-2 h-0.5!
                            last:hidden
                          `}
                        />
                      }
                    />
                  )}
                </Fragment>
              )}
            </Combobox.List>

            {postListContent}
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  )
}

function DefaultRenderOption<T>({ item }: RenderOptionProps<T>) {
  return item.label
}

type FilterOptionsConfig<T extends string> = {
  pick?: T[]
  omit?: T[]
}

export function filterOptions<T extends string>(options: SelectOption<T>[], config: FilterOptionsConfig<T>) {
  const { pick, omit } = config

  return options.filter((option) => {
    if (pick) {
      return pick.includes(option.value)
    }

    if (omit) {
      return !omit.includes(option.value)
    }

    return true
  })
}
