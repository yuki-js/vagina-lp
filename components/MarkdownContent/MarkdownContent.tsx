import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './MarkdownContent.module.css';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className={styles.markdownWrapper}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
          h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
          h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
          p: ({ children }) => <p className={styles.p}>{children}</p>,
          ul: ({ children }) => <ul className={styles.ul}>{children}</ul>,
          li: ({ children }) => <li className={styles.li}>{children}</li>,
          pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          code: ({ inline, className, children, ...props }: any) => {
            return inline ? (
              <code className={styles.inlineCode} {...props}>{children}</code>
            ) : (
              <code className={className} {...props}>{children}</code>
            );
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
