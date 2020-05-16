import React, { AnchorHTMLAttributes } from 'react';
import { MDXProvider } from '@mdx-js/react';

type Props = {
    children: any
    props?: AnchorHTMLAttributes<HTMLAnchorElement>
}

const A = ({ children, ...props }: Props) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
    <style jsx>{`
    a {
        padding: 0.1rem;
    }
    `}</style>
  </a>
);

const PermalinkIcon = () => (
    <span>
      <svg viewBox="0 0 16 16" width="16" height="16">
        <g strokeWidth="1" fill="#000000" stroke="#000000">
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M8.995,7.005 L8.995,7.005c1.374,1.374,1.374,3.601,0,4.975l-1.99,1.99c-1.374,1.374-3.601,1.374-4.975,0l0,0c-1.374-1.374-1.374-3.601,0-4.975 l1.748-1.698"
          />
          <path
            fill="none"
            stroke="#000000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="10"
            d="M7.005,8.995 L7.005,8.995c-1.374-1.374-1.374-3.601,0-4.975l1.99-1.99c1.374-1.374,3.601-1.374,4.975,0l0,0c1.374,1.374,1.374,3.601,0,4.975 l-1.748,1.698"
          />
        </g>
      </svg>
    </span>
  );

const HeadingA = ({ children,...props }: Props) => {
    const id = children.toString() === '[object Object]' ? children.props.children: children

    return (
    <span className='heading'>
      {children}
      <span className='permalink'>
          <a href={`#${id}`}><PermalinkIcon /></a>
          </span>
      <style jsx>{`
      .heading {
          padding: 0.1rem;
          color: black;
          transition: none;
      }

      .heading:hover {
          background-color: none;
          border-bottom: dashed 1px;
      }

      .permalink {
        display: none;
      }

      .heading:hover .permalink {
        display: inline;
      }

      a:hover {
          background-color: inherit;
      }
      `}</style>
    </span>
);
}

/*

随所に現れる `const id = children.toString() === '[object Object]' ? children.props.children: children` が何かというと
リンクを含む文字列を見出しに使ったとき（例： ## [hoge](https://fuga.com)）に見出しへのページ内ジャンプのリンクがふつうにやると取得できない（[object Object]になる）ので
それを解決しようとしたもの。children.props.children は直感的に理解できないが以下のコードを使ってデバッグした結果である。。

```
const seen: any[] = []; 

var replacer = function(key: string, value: string) {
  if (value != null && typeof value == "object") {
    if (seen.indexOf(value) >= 0) {
      return;
    }
    seen.push(value);
  }
  return value;
};
```
*/

export const H2 = ({ children }: Props) => {
    const id = children.toString() === '[object Object]' ? children.props.children: children

    return (
  <h2 id={`${id}`}>
    <HeadingA>{children}</HeadingA>
    <style jsx>{`
      h2 {
        margin-top: 2rem;
        font-size: 1.25rem;
        font-family: Tahoma, 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
      }
    `}</style>
  </h2>
);
}

const H3 = ({ children }: Props) => {
    const id = children.toString() === '[object Object]' ? children.props.children: children
    return (
  <h3 id={`${id}`}>
    <HeadingA>{children}</HeadingA>
    <style jsx>{`
      h3 {
        margin-top: 2rem;
        font-size: 1.125rem;
        font-family: Tahoma, 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
      }
    `}</style>
  </h3>
);
}

const H4 = ({ children }: Props) => {
    const id = children.toString() === '[object Object]' ? children.props.children: children
    return (
  <h4 id={`${id}`}>
    <HeadingA>{children}</HeadingA>
      <style jsx>{`
        h4 {
          margin-top: 2rem;
          font-size: 1.075rem;
          font-family: Tahoma, 游ゴシック体, 'Yu Gothic', YuGothic, 'ヒラギノ角ゴシック Pro', 'Hiragino Kaku Gothic Pro', メイリオ, Meiryo, Osaka, 'ＭＳ Ｐゴシック', 'MS PGothic', sans-serif;
        }
      `}</style>
  </h4>
  );
}

const Hr = () => (
  <>
    <hr />
    <style jsx>{`
      hr {
        margin: 3rem 0;
        border: none;
        border-bottom: 1px solid #dadada;
      }
    `}</style>
  </>
);

const Img = ({ ...props }) => (
  <>
    <img {...props} alt={props.alt || ''} />
    <style jsx>{`
      img {
        max-width: 100%;
      }
    `}</style>
  </>
);

const Blockquote = ({ children }: Props) => (
  <blockquote>
    {children}
    <style jsx>{`
      blockquote {
        margin: 1rem 0;
        padding: 1rem 1rem;
        background: #f7f7f7;
        border-left: 4px solid black;
        font-style: italic;
      }
      blockquote :global(p:first-child) {
        margin-top: 0;
      }
      blockquote :global(p:last-child) {
        margin-bottom: 0;
      }
    `}</style>
  </blockquote>
);

const Code = ({ children }: Props) => (
  <pre>
    <code>{children}</code>
    <style jsx>{`
      pre {
        color: #f8f8f2;
        white-space: pre;
        overflow: auto;
        padding: 0;
        margin: 0;
        -webkit-overflow-scrolling: touch;
      }
      pre code {
        padding: 0;
        font-family: "Lucida Console", Monaco, monospace;
        border-radius: 0;
      }
      pre code::before {
        content: '';
      }
      pre code::after {
        content: '';
      }
      /* Allow selecting all text for easy copy-pasting.
         Right now, only enable it for CSS / Markdown because
         for JS code, you might not want to copy
         all the lines in a snippet.
         Workaround: For shell scripts,
         - Use "shell" for one-liners to allow users to copy easily
         - Use "bash" for multi-liners so they can select each line
         */
      :global(.language-css) pre,
      :global(.language-shell) pre,
      :global(.language-md) pre {
        user-select: all;
      },
      :global(.language-TypeScript) pre {
        user-select: all;
      }
    `}</style>
  </pre>
);

const InlineCode = ({ children }: Props) => (
  <code>
    {children}
    <style jsx>{`
      code {
        color: rgb(212, 0, 255);
        font-size: 0.875em;
        white-space: pre-wrap;
        font-family: "Lucida Console", Monaco, monospace;
      }
      code::before {
        content: '\`';
      }
      code::after {
        content: '\`';
      }
      :global(a) code {
        color: inherit;
      }
    `}</style>
  </code>
);

// UL, OL, LI 指定する場合は components に含めること
// 今はいったん外している
export const UL = ({ children }: Props) => (
<ul>
    {children}
    <style jsx>
    {`
        ul {
        padding: 0;
        list-style-type: none;
        margin-left: 15px;
        }
        ul > :global(li::before) {
        content: '-';
        display: inline-block;
        color: #999;
        position: absolute;
        margin-left: -15px;
        }
    `}
    </style>
</ul>
);

export const OL = ({ children }: Props) => (
<ol>
    {children}
    <style jsx>
    {`
        ol {
        padding: 0;
        margin-left: 15px;
        }
    `}
    </style>
</ol>
);

export const LI = ({ children }: Props) => (
<li>
    {children}
    <style jsx>
    {`
        li {
        font-size: inherit;
        line-height: 24px;
        margin-bottom: 10px;
        }
    `}
    </style>
</li>
)

const TABLE= ( {children } :Props) => (
    <table>
        {children}<style jsx>{`
          table {
            width: 100%;
            margin: 30px 0;
            border: none;
          }
        `}</style>
    </table>
)


const TR = ( { children } :Props) => (
    <tr>
        {children}<style jsx>{`          
        tr {
            text-align: left;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
          }`}</style>
    </tr>
)

// UL, OL, LI 指定する場合は以下のオブジェクトに含めること
const components = {
  a: A,
  blockquote: Blockquote,
  code: Code,
  h2: H2,
  h3: H3,
  h4: H4,
  img: Img,
  hr: Hr,
  table: TABLE,
  tr: TR,
  inlineCode: InlineCode
};

const Markdown = ({ children }: Props) => <MDXProvider components={components}>{children}</MDXProvider>;

export default Markdown;