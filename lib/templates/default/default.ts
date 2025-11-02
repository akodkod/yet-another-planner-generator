import { ChapterType, RootChapter } from "@/features/chapters/chapter-types"
import { genChapterId } from "@/features/editor/editor-utils"
import { DefaultTemplateDayPage } from "@/lib/templates/default/day-pages"
import { DefaultTemplateMonthStartsPage, DefaultTemplateMonthEndsPage } from "@/lib/templates/default/month-pages"
import { DefaultTemplateWeekStartsPage, DefaultTemplateWeekEndsPage } from "@/lib/templates/default/week-pages"
import { DefaultTemplateYearStartsPage, DefaultTemplateYearEndsPage } from "@/lib/templates/default/year-pages"

export const DefaultTemplateRootChapter: RootChapter = {
  id: genChapterId(),
  type: ChapterType.Root,
  children: [
    {
      id: genChapterId(),
      type: ChapterType.Year,
      children: [
        DefaultTemplateYearStartsPage,
        {
          id: genChapterId(),
          type: ChapterType.Month,
          children: [
            DefaultTemplateMonthStartsPage,
            {
              id: genChapterId(),
              type: ChapterType.Week,
              children: [
                DefaultTemplateWeekStartsPage,
                {
                  id: genChapterId(),
                  type: ChapterType.Day,
                  children: [
                    DefaultTemplateDayPage,
                  ],
                },
                DefaultTemplateWeekEndsPage,
              ],
            },
            DefaultTemplateMonthEndsPage,
          ],
        },
        DefaultTemplateYearEndsPage,
      ],
    },
  ],
}
