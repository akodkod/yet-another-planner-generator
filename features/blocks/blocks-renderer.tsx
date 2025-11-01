import { Block, BlockType } from "@/features/blocks/block-types"
import { BackgroundGridBlockRenderer } from "@/features/blocks/renderers/background-grid-block-renderer"
import { ColumnBlockRenderer } from "@/features/blocks/renderers/column-block-renderer"
import { RowBlockRenderer } from "@/features/blocks/renderers/row-block-renderer"
import { TextBlockRenderer } from "@/features/blocks/renderers/text-block-renderer"
import { Fragment } from "react/jsx-runtime"
import { match } from "ts-pattern"

export type BlockRendererProps<T extends Block = Block> = {
  block: T
  parent: Block | null
}

export type BlocksRendererProps = {
  blocks: Block[]
  parent: Block | null
}

export function BlocksRenderer({ blocks, parent }: BlocksRendererProps) {
  return blocks.map((block) => (
    <Fragment key={block.id}>
      {match(block)
        .with({ type: BlockType.Column }, (block) => (
          <ColumnBlockRenderer
            block={block}
            parent={parent}
          />
        ))
        .with({ type: BlockType.Row }, (block) => (
          <RowBlockRenderer
            block={block}
            parent={parent}
          />
        ))
        .with({ type: BlockType.Text }, (block) => (
          <TextBlockRenderer
            block={block}
            parent={parent}
          />
        ))
        .with({ type: BlockType.BackgroundGrid }, (block) => (
          <BackgroundGridBlockRenderer
            block={block}
            parent={parent}
          />
        ))
        .exhaustive()}
    </Fragment>
  ))
}
