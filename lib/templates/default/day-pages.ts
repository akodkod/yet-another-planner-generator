import { BlockType, BlockSizeType, BackgroundGridType, BackgroundGridSpacing } from "@/features/blocks/block-types"
import { PageChapter, ChapterType } from "@/features/chapters/chapter-types"
import { genChapterId, genBlockId } from "@/features/editor/editor-utils"

export const DefaultTemplateDayPage: PageChapter = {
  id: genChapterId(),
  type: ChapterType.Page,
  template: {
    id: genBlockId(),
    type: BlockType.Column,
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
    children: [
      {
        id: genBlockId(),
        type: BlockType.Row,
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
        children: [
          {
            id: genBlockId(),
            type: BlockType.Text,
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
          {
            id: genBlockId(),
            type: BlockType.Text,
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
        ],
      },
      {
        id: genBlockId(),
        type: BlockType.BackgroundGrid,
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
    ],
  },
}
