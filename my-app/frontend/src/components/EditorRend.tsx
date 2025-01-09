/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useState } from "react";

type ParagraphData = { text: string };
type HeaderData = { text: string; level: number };
type ListData = { style: 'ordered' | 'unordered'; items: string[] };
type ImageData = { file: { url: string }; caption?: string };
type QuoteData = { text: string; caption?: string };
type CodeData = { code: string };

type BlockData = 
  | { type: 'paragraph'; data: ParagraphData }
  | { type: 'header'; data: HeaderData }
  | { type: 'list'; data: ListData }
  | { type: 'image'; data: ImageData }
  | { type: 'quote'; data: QuoteData }
  | { type: 'delimiter'; data: {} }
  | { type: 'code'; data: CodeData };

type EditorJSData = {
  blocks: BlockData[];
};

const EditorJSRenderer = ({ data, id }: { id: string; data: EditorJSData }) => {
  const [expanded, setExpanded] = useState(false);

  const renderBlock = (block: BlockData) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p
            key={block.type + id}
            className="my-4 text-gray-800"
            dangerouslySetInnerHTML={{ __html: (block.data as ParagraphData).text }}
          />
        );

      case 'header':
        const HeaderTag = `h${(block.data as HeaderData).level}` as keyof JSX.IntrinsicElements;
        return (
          <HeaderTag key={block.type + id} className="font-bold my-6">
            {(block.data as HeaderData).text}
          </HeaderTag>
        );

      case 'list':
        const listData = block.data as ListData;
        const ListTag = listData.style === 'ordered' ? 'ol' : 'ul';
        return (
          <ListTag key={block.type + id} className="my-4 ml-6">
            {listData.items.map((item, index) => (
              <li key={index} className={ListTag === 'ul' ? 'list-disc' : 'list-decimal'}>
                {item}
              </li>
            ))}
          </ListTag>
        );

      case 'image':
        const imageData = block.data as ImageData;
        return (
          <figure key={block.type + id} className="my-4">
            <img 
              src={imageData.file.url} 
              alt={imageData.caption || "Image"}
              className="max-w-full rounded-lg"
            />
            {imageData.caption && (
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {imageData.caption}
              </figcaption>
            )}
          </figure>
        );

      case 'quote':
        const quoteData = block.data as QuoteData;
        return (
          <blockquote key={block.type + id} className="border-l-4 border-gray-300 pl-4 my-4 italic">
            <p>{quoteData.text}</p>
            {quoteData.caption && (
              <cite className="block text-sm text-gray-600 mt-2">
                — {quoteData.caption}
              </cite>
            )}
          </blockquote>
        );

      case 'delimiter':
        return <hr key={block.type + id} className="my-6 border-t border-gray-300" />;

      case 'code':
        const codeData = block.data as CodeData;
        return (
          <pre key={block.type + id} className=" p-4 rounded-lg my-4 overflow-x-auto">
            <code>{codeData.code}</code>
          </pre>
        );

      default:
        console.warn(`Block type "this" is not supported`);
        return null;
    }
  };
  
  return (
    <div className="max-w-prose mx-auto">
      <div
        className={`relative ${expanded ? '' : 'h-32 overflow-hidden'}`}
        style={{
          maxHeight: expanded ? 'none' : '150px',
          position: 'relative'
        }}
      >
        {data.blocks.map((block) => renderBlock(block))}
        {!expanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12" />
        )}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-4 text-zinc-100 hover:text-zinc-700 font-semibold"
      >
        {expanded ? 'Show Less' : 'Read More'}
      </button>
    </div>
  );
};

export default EditorJSRenderer;
