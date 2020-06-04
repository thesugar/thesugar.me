import React from 'react'
import Head from 'next/head'
import { GetStaticProps, GetStaticPaths } from 'next'
import ThesugarMe from '../../components/ThesugarMe'
import { getAllTags, getArticlesWithTagName } from '../../lib/tag'
import Link from 'next/link'
import { Tags } from '../../components/Tags'
import Foot from '../../components/Foot'

type PostData = {
  id: string
  title: string
  date: string
  tags: Array<string>
} & {
  name: string
}

const Tag = ({
  articles,
  tag,
}: {
  articles: PostData[]
  tag: string
}): JSX.Element => (
  <div className="allContainer">
    <Head>
      <title>{tag}の記事一覧</title>
    </Head>
    {ThesugarMe}
    <h1>
      タグ：{tag} の記事一覧（{articles.length} 件）
      <style jsx>{`
        h1 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }
      `}</style>
    </h1>
    {articles.map((item) => (
      <div key={item.title} className="wrapper">
        <div className="postTitle">
          <Link href={`/articles/${item.id}`}>
            <a>{item.title}</a>
          </Link>
        </div>
        <div className="postDate">{item.date.slice(0, 10)}</div>
        <Tags tags={item.tags} />
        <style jsx>{`
          a {
            padding: 0;
          }

          a:hover {
            background: none;
          }

          .wrapper {
            padding-bottom: 1rem;
          }
        `}</style>
      </div>
    ))}
    <Foot />
  </div>
)

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags()

  return {
    paths: tags.map((tag) => '/tag/' + encodeURI(tag)),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const articles = params
    ? await getArticlesWithTagName(params.tag as string)
    : ''
  return {
    props: {
      articles,
      tag: params ? (params.tag as string) : '',
    },
  }
}
