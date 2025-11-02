import { BlockType, BlockSizeType } from "@/features/blocks/block-types"
import { PageChapter, ChapterType } from "@/features/chapters/chapter-types"
import { genChapterId, genBlockId } from "@/features/editor/editor-utils"

export const DefaultTemplateMonthStartsPage: PageChapter = {
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
      {
        id: genBlockId(),
        type: BlockType.Text,
        content: "Wow, a new month!",
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

export const DefaultTemplateMonthEndsPage: PageChapter = {
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
        content: "{{monthOfYear}}",
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
        content: "Month is over :)",
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
