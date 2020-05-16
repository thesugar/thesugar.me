import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import Markdown from './Markdown'
import { siteTitle } from './sugar.config'

type Props = {
    children: any
    meta: {
        title: string
        date: string
        tags: Array<string>
    }
}
const Layout = ({ children, meta }: Props) => {
    return (
        <div className={styles.container}>
        <Head>
            <title>{meta.title}</title>
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
            integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
            crossOrigin="anonymous"
            />
            <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css" rel="stylesheet"/>
        </Head>
        <header> 
            <div className='btn-cross'>
                <Link href='/'><a>{siteTitle}</a></Link>
                </div>
                <style jsx>{`
                a {
                    background-color: inherit;
                    padding: 0;
                    transition: none;
                    color: inherit;
                }

                .btn-cross {
                    display: inline-block;
                    position: relative;
                    padding: 0.25em 1em;
                    border-top: solid 2px black;
                    border-bottom: solid 2px black;
                    text-decoration: none;
                    font-weight: bold;
                    color: #03A9F4;
                    margin-bottom: 3rem;
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
            <section className={styles.title}>{meta.title}</section>
            <div className={styles.postedAt}>{meta.date}</div>
            {meta.tags.map((tag) => (
                <span className={styles.tag} key={tag}>{tag}</span>
            ))}
        </header>

        <section>
            <Markdown>{children}</Markdown>
        </section>

        <footer>
            <Link href='/'><a className={styles.backToHome}>← Top page</a></Link>
        </footer>
        </div>
    )
}

export default Layout