import { BlockType, BlockSizeType } from "@/features/blocks/block-types"
import { PageChapter, ChapterType } from "@/features/chapters/chapter-types"
import { genChapterId, genBlockId } from "@/features/editor/editor-utils"

export const DefaultTemplateWeekStartsPage: PageChapter = {
  id: genChapterId(),
  type: ChapterType.Page,
  template: {
    id: genBlockId(),
    type: BlockType.Column,
    spacing: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      transform: "skewY(-6deg)",
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
        type: BlockType.Text,
        content: "Week #{{weekOfMonth}}",
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
      {
        id: genBlockId(),
        type: BlockType.Text,
        content: "Wow, a new week!",
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
    ],
  },
}

export const DefaultTemplateWeekEndsPage: PageChapter = {
  id: genChapterId(),
  type: ChapterType.Page,
  template: {
    id: genBlockId(),
    type: BlockType.Column,
    spacing: 0,
    style: {
      alignItems: "center",
      justifyContent: "center",
      transform: "skewY(-6deg)",
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
        type: BlockType.Text,
        content: "Week #{{weekOfMonth}}",
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
      {
        id: genBlockId(),
        type: BlockType.Text,
        content: "Week is over :)",
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
    ],
  },
}
