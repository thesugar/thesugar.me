import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SocialMedia from '../components/SocialMedia'
import {siteTitle, selfIntroduction} from '../components/sugar.config'
import { importAll } from '../components/importAll'
import THESUGARME from '../components/ThesugarMe'

const blogItems = importAll(
    require.context(__dirname + '/articles', true, /\.mdx$/)
)

const Home = () => {
    return (
        <div className='container'>
            <Head>
                <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
                <title>{siteTitle}</title>
            </Head>
            <header className='header'>
                {THESUGARME}
            </header>
            
            {selfIntroduction}

            <section>
                <div className='writing'>Writings</div>
                <ul>
                {blogItems.sort((a, b) => {
                    if (a.date < b.date) {
                        return 1
                    } else {
                        return -1
                    }
                }).map(item => {
                    const articlePath = '/articles' + item.name.slice(1)
                    return (
                        <li key={item.title}>
                        <Link href={articlePath}><a className='postTitle'>{item.title}</a></Link>
                        <span className='postDate'>{item.date}</span>
                        </li>
                    )}
                )}
                </ul>
                <style jsx>{`
                    ul {
                        padding-left: 0px;
                    }

                    li {
                        list-style: none;
                        text-align: left;
                    }

                    .writing {
                        font-size: 1rem;
                        display: inline-block;
                        padding: 0px 1.25rem;
                        border-bottom: solid 1px black;
                    }

                    .postDate{
                        float: right;
                        margin-right: 1rem;
                        font-size: medium;
                    }

                    .postTitle{
                        margin-right: 1rem;
                        font-size: medium;
                    }
                `}</style>
            </section>
            <div>
                <SocialMedia />
            </div>
        </div>
    )
}

export default Home