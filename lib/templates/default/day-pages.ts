import { BlockSizeType, BackgroundGridType, BackgroundGridSpacing } from "@/features/blocks/block-types"
import { PageChapterTreeNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateDayPage1: PageChapterTreeNode = {
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Tasks",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      block: {
        spacing: 0,
        style: {
          padding: 96,
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
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          block: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [
            {
              id: genTreeNodeId(TreeNodeType.TextBlock),
              type: TreeNodeType.TextBlock,
              block: {
                content: "{{format-date dayDate \"do 'of' LLLL\"}}",
                style: {},
                textStyle: {
                  fontSize: 48,
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
                content: "{{format-date dayDate 'EEEE'}}",
                style: {
                  marginTop: 8,
                },
                textStyle: {
                  color: "#aaa",
                  fontSize: 24,
                  fontFamily: "Helvetica",
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
        {
          id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
          type: TreeNodeType.BackgroundGridBlock,
          block: {
            gridType: BackgroundGridType.Dots,
            gridColor: "#ccc",
            gridLineWidth: 1,
            gridSpacing: BackgroundGridSpacing.Small,
            style: {
              marginTop: 24,
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Full,
            },
          },
          children: [],
        },
      ],
    },
  ],
}

export const DefaultTemplateDayPage2: PageChapterTreeNode = {
  id: genTreeNodeId(TreeNodeType.PageChapter),
  type: TreeNodeType.PageChapter,
  chapter: {
    name: "Notes",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      block: {
        spacing: 0,
        style: {
          padding: 96,
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
          id: genTreeNodeId(TreeNodeType.RowBlock),
          type: TreeNodeType.RowBlock,
          block: {
            spacing: 16,
            style: {
              alignItems: "center",
              justifyContent: "space-between",
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Auto,
            },
          },
          children: [
            {
              id: genTreeNodeId(TreeNodeType.TextBlock),
              type: TreeNodeType.TextBlock,
              block: {
                content: "{{format-date dayDate \"do 'of' LLLL\"}}\r\nNotes",
                style: {},
                textStyle: {
                  fontSize: 48,
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
                content: "{{format-date dayDate 'EEEE'}}",
                style: {
                  marginTop: 8,
                },
                textStyle: {
                  color: "#aaa",
                  fontSize: 24,
                  fontFamily: "Helvetica",
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
        {
          id: genTreeNodeId(TreeNodeType.BackgroundGridBlock),
          type: TreeNodeType.BackgroundGridBlock,
          block: {
            gridType: BackgroundGridType.Dots,
            gridColor: "#ccc",
            gridLineWidth: 1,
            gridSpacing: BackgroundGridSpacing.Small,
            style: {
              marginTop: 24,
            },
            width: {
              type: BlockSizeType.Full,
            },
            height: {
              type: BlockSizeType.Full,
            },
          },
          children: [],
        },
      ],
    },
  ],
}
