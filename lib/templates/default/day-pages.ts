import { BlockSizeType, BackgroundGridType, BackgroundGridSpacing } from "@/features/blocks/block-types"
import { PageNode, TreeNodeType } from "@/features/trees/tree"
import { genTreeNodeId } from "@/features/trees/tree-gen"

export const DefaultTemplateDayPage1: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Tasks",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
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
          data: {
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
              data: {
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
              data: {
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
          data: {
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

export const DefaultTemplateDayPage2: PageNode = {
  id: genTreeNodeId(TreeNodeType.Page),
  type: TreeNodeType.Page,
  data: {
    name: "Notes",
  },
  children: [
    {
      id: genTreeNodeId(TreeNodeType.ColumnBlock),
      type: TreeNodeType.ColumnBlock,
      data: {
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
          data: {
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
              data: {
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
              data: {
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
          data: {
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
