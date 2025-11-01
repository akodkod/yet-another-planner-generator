import { TextBlock } from "@/features/blocks/block-types"
import { BlockRendererProps } from "@/features/blocks/blocks-renderer"
import { getBaseBlockStyles } from "@/features/blocks/renderers/base-block-renderer"
import { useRootChapterContext, useOptionalYearChapterContext, useOptionalDayChapterContext, useOptionalMonthChapterContext, useOptionalPageChapterContext, useOptionalWeekChapterContext } from "@/features/chapters/chapter-contexts"
import { ViewStyle } from "@/lib/utils/react-pdf"
import Handlebars from "handlebars"
import { format } from "date-fns"
import { Text, View } from "@react-pdf/renderer"

export function TextBlockRenderer({ block, parent }: BlockRendererProps<TextBlock>) {
  const variables = useVariables()

  const styles: ViewStyle = {
    ...getBaseBlockStyles(block, parent),
  }

  return (
    <View style={styles}>
      <Text style={block.textStyle}>
        {renderContent(block.content, variables)}
      </Text>
    </View>
  )
}

function useVariables() {
  const rootContext = useRootChapterContext()
  const yearContext = useOptionalYearChapterContext()
  const monthContext = useOptionalMonthChapterContext()
  const weekContext = useOptionalWeekChapterContext()
  const dayContext = useOptionalDayChapterContext()
  const pageContext = useOptionalPageChapterContext()

  return {
    ...rootContext,
    ...yearContext,
    ...monthContext,
    ...weekContext,
    ...dayContext,
    ...pageContext,
  }
}

function renderContent(text: string, variables: Record<string, unknown>) {
  if (!text.includes("{")) return text

  const template = Handlebars.compile(text)
  return template(variables)
}

Handlebars.registerHelper("format-date", (date: unknown, dateFormat: string) => {
  if (date instanceof Date) {
    return format(date, dateFormat)
  }

  return date
})
