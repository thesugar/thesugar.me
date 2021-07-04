import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SocialMedia from '../components/SocialMedia'
import {
  siteTitle,
  selfIntroduction,
  siteDescription,
  siteOgDescription,
} from '../components/sugar.config'
import { importAll } from '../components/importAll'
import THESUGARME from '../components/ThesugarMe'
import Foot from '../components/Foot'
import { getOuterPost } from '../lib/outer-post'

const blogItems = importAll(
  require.context(__dirname + '/articles', true, /\.mdx$/)
)
const outerPosts = getOuterPost()

const posts = [...blogItems, ...outerPosts]
posts.sort((a, b) => {
  return a.date > b.date ? -1 : 1
})

const Home = (): JSX.Element => {
  const [readMore, setReadMore] = useState(false)

  return (
    <div className="allContainer">
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={`${siteDescription}`}></meta>
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://thesugar.me/`} />
        <meta property="og:title" content={`${siteTitle}`} />
        <meta
          property="og:image"
          content={`https://thesugar.me/ogp/thesugar_ogp.png`}
        />
        <meta property="og:description" content={`${siteOgDescription}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_thesugar_" />
      </Head>
      <header className="header">
        {THESUGARME}
        <div className="headNav">
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
      </header>

      <section className="self-introduction">{selfIntroduction}</section>

      <section>
        <h1 className="writing">Writings</h1>
        {posts.slice(0, readMore ? posts.length : 5).map((item) => {
          const articlePath =
            'name' in item ? '/articles' + item.name.slice(1) : item.url
          return (
            <div key={item.title} className="wrapper">
              <div className="postTitle">
                <Link href={articlePath}>
                  <a
                    target={'url' in item ? '_blank' : ''}
                    rel={'url' in item ? 'noopener noreferrer' : ''}
                  >
                    {item.title}
                  </a>
                </Link>
              </div>
              <div className="postDate">{item.date.slice(0, 10)}</div>
            </div>
          )
        })}
        <style jsx>{`
          .wrapper {
            padding-top: 0.8rem;
            display: flex;
            margin: 0 auto;
            width: 100%;
            justify-content: space-between;
          }

          .writing {
            font-size: 1rem;
            font-weight: normal;
          }

          .postTitle {
            flex: 1 1 auto;
            font-size: medium;
            max-width: 80%;
          }

          .postDate {
            min-width: 10%;
            font-size: medium;
          }

          .writing {
            display: inline-block;
            margin: 0 auto;
            max-width: 600px;
            border-bottom: solid 1px black;
            padding: 0px 1.25rem;
          }

          @media screen and (max-width: 600px) {
            /* for mobile */
            .wrapper {
              display: block;
            }

            .postDate {
              width: 100%;
              font-size: medium;
              margin-bottom: 1.5rem;
            }
          }
        `}</style>
      </section>

      {!readMore && posts.length > 5 && (
        <a className="readMore" onClick={() => setReadMore(!readMore)}>
          ...Read more
          <style jsx>{`
            .readMore {
              position: relative;
              display: inline-block;
              color: #1b1b1b;
              text-decoration: none;
              background-color: none;
              font-size: smaller;
              padding-left: 0;
              padding-top: 1rem;
              padding-right: 0;
              opacity: 60%;
              font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
                ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
            }
            .readMore:hover {
              cursor: pointer;
              text-decoration: none;
              background: none;
            }
            .readMore::after {
              position: absolute;
              bottom: -4px;
              left: 0;
              content: '';
              width: 100%;
              height: 2px;
              background: #333;
              transform: scale(0, 1);
              transform-origin: right top;
              transition: transform 0.3s;
            }
            .readMore:hover::after {
              transform-origin: left top;
              transform: scale(1, 1);
            }
          `}</style>
        </a>
      )}

      <Foot home={true}>
        <SocialMedia />
      </Foot>
    </div>
  )
}

export default Home
