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
                {blogItems.sort((a, b) => {
                    if (a.date < b.date) {
                        return 1
                    } else {
                        return -1
                    }
                }).map(item => {
                    const articlePath = '/articles' + item.name.slice(1)
                    return (
                        <div key={item.title} className="wrapper">                      
                            <div className="postTitle"><Link href={articlePath}><a>{item.title}</a></Link></div>
                            <div className='postDate'>{item.date.slice(0, 10)}</div>
                        </div>
                    )}
                )}
                <style jsx>{`
                    .wrapper {
                        padding-top: 0.8rem;
                        display: flex;
                        margin: 0 auto;
                        max-width: 600px;
                        width: 100%;
                        justify-content: space-between;
                      }
                      
                      .postTitle {
                        flex: 1 1 auto;
                        font-size: medium;
                        text-indent: -1em;
                        max-width: 80%;
                      }
                      
                      .postDate {
                        min-width: 10%;
                        font-size: medium;
                      }
                      
                      @media screen and (max-width: 600px) {
                        .wrapper {
                          display: block;
                        }
                        
                        .postDate {
                          width: 100%;
                          font-size: medium;
                          margin-bottom: 1.5rem;
                        }
                      }

                    .writing {
                        font-size: 1rem;
                        display: inline-block;
                        padding: 0px 1.25rem;
                        border-bottom: solid 1px black;
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