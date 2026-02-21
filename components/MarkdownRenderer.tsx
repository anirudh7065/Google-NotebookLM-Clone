"use client";

import Markdown from "markdown-to-jsx";

type Props = {
  content: string;
};

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className=" max-w-none">
      <Markdown
        options={{
          forceBlock: true,
          overrides: {
            h1: {
              props: {
                className: "text-black text-3xl font-bold mt-6 mb-4",
              },
            },
            h2: {
              props: {
                className: "text-purple-600  text-2xl font-semibold mt-5 mb-3",
              },
            },
            h3: {
              props: {
                className: "text-purple-600 text-xl font-semibold mt-4 mb-2",
              },
            },
            p: {
              props: {
                className: "text-purple-600 mb-3 leading-relaxed text-gray-300",
              },
            },
            ul: {
              props: {
                className: "list-disc marker:text-black pl-6 mb-3",
              },
            },
            ol: {
              props: {
                className: "list-decimal marker:text-black pl-6 mb-3",
              },
            },
            code: {
              component: (props: any) => {
                const { children, className } = props;
                const isInline = !className;

                if (isInline) {
                  return (
                    <code className="bg-gray-300 px-1 py-0.5 rounded text-sm text-green-900">
                      {children}
                    </code>
                  );
                }

                return (
                  <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
                    <code className="text-green-400 text-sm">
                      {children}
                    </code>
                  </pre>
                );
              },
            },
            a: {
              props: {
                className:
                  "text-blue-400 hover:text-blue-300 underline transition",
                target: "_blank",
                rel: "noopener noreferrer",
              },
            },
          },
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}