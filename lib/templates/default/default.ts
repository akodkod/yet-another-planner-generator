import { PDFTree, TreeNodeType } from "@/features/tree/tree"
import { DefaultTemplateDayPage1, DefaultTemplateDayPage2 } from "@/lib/templates/default/day-pages"
import { DefaultTemplateMonthStartsPage, DefaultTemplateMonthEndsPage } from "@/lib/templates/default/month-pages"
import { DefaultTemplateWeekStartsPage1, DefaultTemplateWeekEndsPage, DefaultTemplateWeekStartsPage2 } from "@/lib/templates/default/week-pages"
import { DefaultTemplateYearStartsPage, DefaultTemplateYearEndsPage } from "@/lib/templates/default/year-pages"
import { genChapterId } from "@/lib/templates/template-utils"

export const DefaultTemplate: PDFTree = {
  id: genChapterId(),
  type: TreeNodeType.RootChapter,
  chapter: {
    year: 2025,
    pageWidth: 1620,
    pageHeight: 2160,
  },
  children: [
    {
      id: genChapterId(),
      type: TreeNodeType.YearChapter,
      children: [
        DefaultTemplateYearStartsPage,
        {
          id: genChapterId(),
          type: TreeNodeType.MonthChapter,
          children: [
            DefaultTemplateMonthStartsPage,
            {
              id: genChapterId(),
              type: TreeNodeType.WeekChapter,
              children: [
                DefaultTemplateWeekStartsPage1,
                DefaultTemplateWeekStartsPage2,
                {
                  id: genChapterId(),
                  type: TreeNodeType.DayChapter,
                  children: [
                    DefaultTemplateDayPage1,
                    DefaultTemplateDayPage2,
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
