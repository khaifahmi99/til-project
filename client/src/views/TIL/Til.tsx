import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams } from 'react-router-dom';
import { CalendarIcon } from '@heroicons/react/outline';

import { TextIcon } from '../../components/TextIcon';
import { Pill } from '../../components/Pill';
import { createDocUrl } from '../../constant/Path';
import { useEffect, useState } from 'react';
import { Navbar } from '../../components/Navbar';

const TIL = () => {
  const { id } = useParams();
  const url = createDocUrl(id as string);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  // 1. Fetch the conteent from the DB using the id
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        const { title, content, date_created, tags } = res;
        setTitle(title);
        setContent(content);
        setDate(new Date(date_created));
        setTags(tags);

        setIsLoading(false);
      })
      .catch(() => {
        setHasError(true);
        setIsLoading(false);
      });
  }, [url]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <Navbar />
      <div className="w-4/5 mx-auto">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">{title}</h1>
          <TextIcon
            icon={<CalendarIcon />}
            text={date ? date.toLocaleDateString() : '???'}
          />
        </div>
        <div className="bg-gray-100 border-2 rounded border-gray-300 py-2 px-4 outline mb-4">
          <ReactMarkdown
            children={content}
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          />
        </div>
        <div className="flex flex-row space-x-2">
          {tags.map((tag, idx) => (
            <div key={`tag-${idx}`}>
              <Pill text={tag} />
            </div>
          ))}
        </div>
        <hr />
        {/* Footer Section */}
      </div>
    </>
  );
};

export default TIL;
