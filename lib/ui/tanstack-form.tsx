import { Any } from "@/lib/utils/types"
import { createFormHook, createFormHookContexts, FormApi, useStore } from "@tanstack/react-form"
import { ReactNode } from "react"
import { Input, InputProps } from "./input"
import { LucideIcon } from "lucide-react"
import { FieldLabel, FieldDescription, FieldError, Field, FieldProps, FieldContent } from "@/lib/ui/field"
import { Textarea, TextareaProps } from "@/lib/ui/textarea"
import { Checkbox, CheckboxProps } from "@/lib/ui/checkbox"
import { Switch, SwitchProps } from "@/lib/ui/switch"
import { Select, SelectProps } from "@/lib/ui/select-v2"
import { getErrorMessage } from "@/lib/utils/error"
import { formatList } from "@/lib/utils/string"
import { cn } from "@/lib/ui/utils"
import { InputGroup, InputGroupInput } from "@/lib/ui/input-group"

const {
  fieldContext,
  formContext,
  useFieldContext,
} = createFormHookContexts()

export const { useAppForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    Input: InputField,
    File: FileField,
    Textarea: TextareaField,
    Checkbox: CheckboxField,
    Switch: SwitchField,
    Select: SelectField,
  },
  formComponents: {},
})

export type FormApiAny = FormApi<Any, Any, Any, Any, Any, Any, Any, Any, Any, Any, Any, Any>

export type FieldWrapperProps = FieldProps & {
  label?: ReactNode
  hint?: ReactNode
}

function FieldWrapper({ label, hint, className, children, ...props }: FieldWrapperProps) {
  const field = useFieldContext<string>()
  const meta = useStore(field.store, (state) => state.meta)

  const formattedErrors = meta.errors.map((error) => getErrorMessage(error))
  const hasErrors = formattedErrors.length > 0

  return (
    <Field
      className={cn("gap-1", className)}
      {...props}
    >
      <FieldLabel htmlFor={field.name}>
        {label}
      </FieldLabel>

      {children}

      {hint && (
        <FieldDescription className="mt-0!">
          {hint}
        </FieldDescription>
      )}

      {hasErrors && (
        <FieldError className="-mt-1">
          {formatList(formattedErrors)}
        </FieldError>
      )}
    </Field>
  )
}

export type InputFieldProps = InputProps & {
  label?: ReactNode
  hint?: ReactNode
  prependAddon?: ReactNode
  appendAddon?: ReactNode
}

function InputField({ label, hint, className, prependAddon, appendAddon, ...props }: InputFieldProps) {
  const field = useFieldContext<string>()

  return (
    <FieldWrapper
      label={label}
      hint={hint}
      className={className}
    >
      <InputGroup>
        {prependAddon}

        <InputGroupInput
          id={field.name}
          name={field.name}
          value={field.state.value}
          aria-describedby={field.name}
          aria-invalid={!field.state.meta.isValid}
          onBlur={field.handleBlur}
          onChange={(event) => field.handleChange(event.target.value)}
          {...props}
        />

        {appendAddon}
      </InputGroup>
    </FieldWrapper>
  )
}

export type FileFieldProps = InputProps & {
  label?: ReactNode
  hint?: ReactNode
}

function FileField({ label, hint, className, ...props }: FileFieldProps) {
  const field = useFieldContext<File | FileList | null>()

  return (
    <FieldWrapper
      label={label}
      hint={hint}
      className={className}
    >
      <Input
        id={field.name}
        name={field.name}
        type="file"
        aria-describedby={field.name}
        aria-invalid={!field.state.meta.isValid}
        onBlur={field.handleBlur}
        onChange={(event) => {
          field.handleChange(
            props.multiple
              ? event.target.files
              : event.target.files?.[0] ?? null,
          )
        }}
        {...props}
      />
    </FieldWrapper>
  )
}

export type TextareaFieldProps = TextareaProps & {
  label?: ReactNode
  hint?: ReactNode
}

function TextareaField({ label, hint, className, ...props }: TextareaFieldProps) {
  const field = useFieldContext<string>()

  return (
    <FieldWrapper
      label={label}
      hint={hint}
      className={className}
    >
      <Textarea
        id={field.name}
        name={field.name}
        value={field.state.value}
        aria-describedby={field.name}
        aria-invalid={!field.state.meta.isValid}
        onBlur={field.handleBlur}
        onChange={(event) => field.handleChange(event.target.value)}
        {...props}
      />
    </FieldWrapper>
  )
}

export type CheckboxFieldProps = CheckboxProps & {
  label?: ReactNode
  description?: ReactNode
}

function CheckboxField({ label, description, className, ...props }: CheckboxFieldProps) {
  const field = useFieldContext<boolean>()

  return (
    <Field
      orientation="horizontal"
      className={className}
    >
      <Checkbox
        id={field.name}
        name={field.name}
        checked={field.state.value}
        aria-describedby={field.name}
        aria-invalid={!field.state.meta.isValid}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
        onBlur={field.handleBlur}
        {...props}
      />

      <FieldContent>
        <FieldLabel htmlFor={field.name}>
          {label}
        </FieldLabel>
        <FieldDescription>{description}</FieldDescription>
        <FieldError>Validation message.</FieldError>
      </FieldContent>
    </Field>
  )
}

export type SwitchFieldProps = SwitchProps & {
  label?: ReactNode
  description?: ReactNode
}

function SwitchField({ label, description, className, ...props }: SwitchFieldProps) {
  const field = useFieldContext<boolean>()

  return (
    <Field
      orientation="horizontal"
      className={className}
    >
      <FieldContent>
        <FieldLabel htmlFor={field.name}>
          {label}
        </FieldLabel>
        <FieldDescription>{description}</FieldDescription>
        <FieldError>Validation message.</FieldError>
      </FieldContent>

      <Switch
        id={field.name}
        name={field.name}
        checked={field.state.value}
        className="mt-px"
        aria-describedby={field.name}
        aria-invalid={!field.state.meta.isValid}
        onCheckedChange={(checked) => field.handleChange(!!checked)}
        onBlur={field.handleBlur}
        {...props}
      />
    </Field>
  )
}

export type SelectFieldProps<
  ItemValue,
  SelectedItem = ItemValue,
  Multiple extends boolean | undefined = false,
> = SelectProps<ItemValue, SelectedItem, Multiple> & {
  label?: ReactNode
  hint?: ReactNode
  icon?: LucideIcon
  className?: string
  selectClassName?: string
}

function SelectField<
  ItemValue,
  SelectedItem = ItemValue,
  Multiple extends boolean | undefined = false,
>({
  label,
  hint,
  className,
  selectClassName,
  ...props
}: SelectFieldProps<ItemValue, SelectedItem, Multiple>) {
  const field = useFieldContext<Any>()

  return (
    <FieldWrapper
      label={label}
      hint={hint}
      className={className}
    >
      <Select
        id={field.name}
        name={field.name}
        value={field.state.value}
        aria-describedby={field.name}
        aria-invalid={!field.state.meta.isValid}
        className={selectClassName}
        onValueChange={(value) => field.handleChange(value)}
        {...props}
      />
    </FieldWrapper>
  )
}
