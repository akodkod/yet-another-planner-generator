import { BlockSizeType } from "@/features/blocks/block-types"
import { PageChapterTreeNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateMonthStartsPage: PageChapterTreeNode = {
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Month starts",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
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
          id: genTreeNodeId(TreeNodeType.TextBlock),
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
          id: genTreeNodeId(TreeNodeType.TextBlock),
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
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Month ends",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
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
          id: genTreeNodeId(TreeNodeType.TextBlock),
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
          id: genTreeNodeId(TreeNodeType.TextBlock),
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
