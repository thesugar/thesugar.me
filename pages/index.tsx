import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SocialMedia from '../components/SocialMedia'
import {siteTitle, selfIntroduction} from '../components/sugar.config'
import { importAll } from '../components/importAll'

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
            <header className='btn-cross'>
                {siteTitle}
                <style jsx>{`
                .btn-cross {
                    display: inline-block;
                    position: relative;
                    padding: 0.25em 1em;
                    border-top: solid 2px black;
                    border-bottom: solid 2px black;
                    text-decoration: none;
                    font-weight: bold;
                    color: #03A9F4;
                  }
                  .btn-cross:before, .btn-cross:after {
                    content: '';
                    position: absolute;
                    top: -7px;
                    width: 2px;
                    height: -webkit-calc(100% + 14px);
                    height: calc(100% + 14px);
                    background-color: black;
                    transition: .3s;
                  }
                  .btn-cross:before {
                    left: 7px;
                  }
                  .btn-cross:after {
                    right: 7px;
                  }
                  .btn-cross:hover:before {
                    top: 0px;
                    left:0;
                    height: 100%;
                  }
                  .btn-cross:hover:after {
                    top: 0px;
                    right: 0;
                    height: 100%;
                  }
                `}</style>
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