import React from 'react'
import Head from 'next/head'
import ThesugarMe from '../components/ThesugarMe'
import { importAll } from '../components/importAll'
import Link from 'next/link'
import Foot from '../components/Foot'

const blogItems = importAll(
    require.context(__dirname + '/articles', true, /\.mdx$/)
)

const Articles = (): JSX.Element => (
  <div className="allContainer">
    <Head>
      <title>Writings</title>
    </Head>
    {ThesugarMe}

    <main>
      <h1>
      記事一覧
      </h1>   
     {blogItems.map((item) => {
          const articlePath = '/articles' + item.name.slice(1)
          return (
            <div key={item.title} className="wrapper">
              <div className="postTitle">
                <Link href={articlePath}>
                  <a>{item.title}</a>
                </Link>
              </div>
              <div className="postDate">{item.date.slice(0, 10)}</div>
            </div>
          )
        })}
            <style jsx>{`
            h1 {
              font-size: 1.2rem;
              margin-bottom: 1.5rem;
            }

            a {
              padding: 0;
            }

            a:hover {
              background: none;
            }

            .wrapper {
              padding-bottom: 1.5rem;
            }
          `}</style>
    </main>
    <Foot />
  </div>
)

export default Articles
