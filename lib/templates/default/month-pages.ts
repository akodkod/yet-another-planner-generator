import { BlockSizeType } from "@/features/blocks/block-types"
import { genChapterId, genBlockId } from "@/lib/templates/template-utils"
import { PageChapterTreeNode, TreeNodeType } from "@/features/tree/tree"

export const DefaultTemplateMonthStartsPage: PageChapterTreeNode = {
  id: genChapterId(),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Month starts",
  },
  children: [
    {
      id: genBlockId(),
      type: TreeNodeType.ColumnBlock,
      block: {
        spacing: 0,
        style: {
          alignItems: "center",
          justifyContent: "center",
          transform: [
            { operation: "skew", value: [0, -6] },
          ],
        },
        width: {
          type: BlockSizeType.Full,
        },
        height: {
          type: BlockSizeType.Full,
        },
      },
      children: [
        {
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          block: {
            content: "{{format-date monthDate 'MMMM'}}",
            style: {},
            textStyle: {
              fontSize: 192,
              fontWeight: "bold",
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
        {
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          block: {
            content: "New month incoming!",
            style: {},
            textStyle: {
              color: "#aaa",
              fontSize: 48,
              fontFamily: "Helvetica",
              lineHeight: 1,
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
      ],
    },
  ],
}

export const DefaultTemplateMonthEndsPage: PageChapterTreeNode = {
  id: genChapterId(),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Month ends",
  },
  children: [
    {
      id: genBlockId(),
      type: TreeNodeType.ColumnBlock,
      block: {
        spacing: 0,
        style: {
          alignItems: "center",
          justifyContent: "center",
          transform: [
            { operation: "skew", value: [0, -6] },
          ],
        },
        width: {
          type: BlockSizeType.Full,
        },
        height: {
          type: BlockSizeType.Full,
        },
      },
      children: [
        {
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          block: {
            content: "Bye {{format-date monthDate 'MMMM'}}",
            style: {},
            textStyle: {
              fontSize: 192,
              fontWeight: "bold",
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
        {
          id: genBlockId(),
          type: TreeNodeType.TextBlock,
          block: {
            content: "See you next month!",
            style: {},
            textStyle: {
              color: "#aaa",
              fontSize: 48,
              fontFamily: "Helvetica",
              lineHeight: 1,
            },
            width: {
              type: BlockSizeType.Auto,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [],
        },
      ],
    },
  ],
}
