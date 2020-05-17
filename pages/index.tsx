import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import SocialMedia from '../components/SocialMedia'
import {siteTitle, selfIntroduction} from '../components/sugar.config'
import { importAll } from '../components/importAll'
import THESUGARME from '../components/ThesugarMe'
import { read } from 'fs'

const blogItems = importAll(
    require.context(__dirname + '/articles', true, /\.mdx$/)
)

const defaultItems = blogItems.slice(0, 5)

const Home = () => {
    const [readMore, setReadMore] = useState(false)

    return (
        <div className='allContainer'>
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
                {defaultItems.map(item => {
                    const articlePath = '/articles' + item.name.slice(1)
                    return (
                        <div key={item.title} className="wrapper">                      
                            <div className="postTitle"><Link href={articlePath}><a>{item.title}</a></Link></div>
                            <div className='postDate'>{item.date.slice(0, 10)}</div>
                        </div>
                    )}
                )}
                {readMore &&
                    blogItems.slice(5).map(item => {
                        const articlePath = '/articles' + item.name.slice(1)
                        return (
                            <div key={item.title} className="wrapper">                      
                                <div className="postTitle"><Link href={articlePath}><a>{item.title}</a></Link></div>
                                <div className='postDate'>{item.date.slice(0, 10)}</div>
                            </div>
                        )}
                    )
                }
                <style jsx>{`
                    .wrapper {
                        padding-top: 0.8rem;
                        display: flex;
                        margin: 0 auto;
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
            
            {!readMore &&
            <a
                className="readMore"
                onClick={() => setReadMore(!readMore)}
            >
                ...Read more
                
                <style jsx>{`
                .readMore {
                    position: relative;
                    display: inline-block;
                    color: #1B1B1B;
                    text-decoration: none;
                    background-color: none;
                    font-size: smaller;
                    padding-left: 0;
                    padding-top: 1rem;
                    padding-right: 0;
                    opacity: 60%;
                    font-family: "avenir next", avenir, "helvetica neue", helvetica, ubuntu, roboto, noto, "segoe ui", arial, sans-serif;
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
                    transition: transform .3s;
                }
                .readMore:hover::after {
                    transform-origin: left top;
                    transform: scale(1, 1);
                }
                `}</style>
            </a>}

            <div>
                <SocialMedia />
            </div>
        </div>
    )
}

export default Home