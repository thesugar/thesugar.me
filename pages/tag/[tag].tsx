import Head from 'next/head'
import styles from '../../components/layout.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import ThesugarMe from '../../components/ThesugarMe'
import { getAllTags, getArticlesWithTagName } from '../../lib/tag'
import Link from 'next/link'
import { Tags } from '../../components/Tags'

type PostData = { 
    id: string
    title: string
    date : string
    tags : Array<string>    
} & {
    name: string
}

const Tag = ({articles, tag} : { articles : PostData[]; tag: string}) => (
    <div className='allContainer'>
    <Head>
        <title>{tag}の記事一覧</title>
    </Head>
    {ThesugarMe}
    <div>
    タグ：{tag} の記事一覧（{articles.length} 件）
    </div>
    <ul>
        {articles.map(item => (
        <div key={item.title} className="wrapper">                      
            <div className="postTitle"><Link href={`/articles/${item.id}`}><a>{item.title}</a></Link></div>
            <div className='postDate'>{item.date.slice(0, 10)}</div>
            <Tags tags={item.tags} />
        <style jsx>{`
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
        </div>
        ))}
    </ul>
    </div>
)

export default Tag

export const getStaticPaths: GetStaticPaths = async () => {
  const tags = getAllTags()

  return {
    paths: tags.map((tag) => "/tag/" + encodeURI(tag)),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const articles = params ? await getArticlesWithTagName(params.tag as string) : ''
    return {
        props: {
            articles,
            tag: params ? params.tag as string : ''
        },
    }
}