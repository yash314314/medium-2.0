import EditorJSRenderer from "./EditorRend";
import { Link } from "react-router-dom";

interface EditorBlock {
  id: string;
  type: string;
  data: {
    text?: string;
    level?: number;
    style?: string;
    items?: string[];
    file?: {
      url: string;
    };
    caption?: string;
    withBorder?: boolean;
    withBackground?: boolean;
    stretched?: boolean;
  };
}

// EditorJS output interface
interface EditorOutput {
  time: number;
  blocks: EditorBlock[];
  version: string;
}

// Blog input interface
interface BlogInput {
  id: string;
  author: string;
  title: string;
  content: EditorOutput;
  publishdate: string;
}

export function Looks({ author, title, content, publishdate, id }: BlogInput) {
  // Calculate the total text length from the content blocks
  const totalTextLength = content.blocks.reduce((total, block) => {
    if (block.type === "paragraph" || block.type === "header" || block.type === "quote") {
      return total + (block.data.text?.length || 0);
    }
    return total;
  }, 0);

  // Estimate read time (assuming an average reading speed of 200 words per minute)
  const wordsPerMinute = 200;
  const estimatedReadTime = Math.ceil(totalTextLength / 5 / wordsPerMinute);

  return (
    <Link to={`/blog/${id}`}>
      <div className="border-b-2 flex flex-col justify-center ml-80 max-w-3xl cursor-pointer">
        <Avatar author={author} publish={publishdate} />
        <div className="text-2xl font-bold">{title}</div>

        <div>
          <EditorJSRenderer data={content} id={id} />
        </div>

        <div className="mt-8 text-zinc-50 font-bold">
          {`${estimatedReadTime} min read`}
        </div>
      </div>
    </Link>
  );
}


export function Avatar({ author, publish }) {
  return (
    <div className="flex mt-5 mb-2">
      <div className="h-9 w-9 bg-slate-600 rounded-full flex justify-center items-center text-yellow-50">
        {author[0]}
      </div>
      <div className="flex justify-center items-center font-semibold ml-3 mr-3">
        {author}
      </div>
      <div className="font-normal flex justify-center items-center text-zinc-50">
        {publish}
      </div>
    </div>
  );
}
