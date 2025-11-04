import { PDFTree, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"
import { DefaultTemplateDayPage1, DefaultTemplateDayPage2 } from "@/lib/templates/default/day-pages"
import { DefaultTemplateMonthStartsPage, DefaultTemplateMonthEndsPage } from "@/lib/templates/default/month-pages"
import { DefaultTemplateWeekStartsPage1, DefaultTemplateWeekEndsPage, DefaultTemplateWeekStartsPage2 } from "@/lib/templates/default/week-pages"
import { DefaultTemplateYearStartsPage, DefaultTemplateYearEndsPage } from "@/lib/templates/default/year-pages"

export const DefaultTemplate: PDFTree = {
  id: genTreeNodeId(TreeNodeType.Root),
  type: TreeNodeType.Root,
  data: {
    year: 2025,
    pageWidth: 1620,
    pageHeight: 2160,
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.Year),
      type: TreeNodeType.Year,
      children: [
        DefaultTemplateYearStartsPage,
        {
          id: genTreeNodeId(TreeNodeType.Month),
          type: TreeNodeType.Month,
          children: [
            DefaultTemplateMonthStartsPage,
            {
              id: genTreeNodeId(TreeNodeType.Week),
              type: TreeNodeType.Week,
              children: [
                DefaultTemplateWeekStartsPage1,
                DefaultTemplateWeekStartsPage2,
                {
                  id: genTreeNodeId(TreeNodeType.Day),
                  type: TreeNodeType.Day,
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
