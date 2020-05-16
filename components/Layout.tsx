import React from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import Markdown from './Markdown'
import { relative } from './relative'
import THESUGARME from './ThesugarMe'
import BlogFooter from './BlogFooter'
import Toc from './toc'

type Props = {
    children: any
    meta: {
        title: string
        date: string
        tags: Array<string>
    }
}

const Layout = ({ children, meta }: Props) => {

    const relativeDate = relative(meta.date)

    return (
        <article>
            <Head>
                <title>{meta.title}</title>
                <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
                integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
                crossOrigin="anonymous"
                />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css" rel="stylesheet"/>
                <link href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" rel="stylesheet" />
            </Head>
            
            <div className={styles.allContainer}>
            <div className={styles.thesugar}>
                {THESUGARME}
            </div>
            <div className={styles.leftNav}><i className='far fa-heart' id='hoge'></i><style jsx>{`
            div {
                display: flex;
                position: -webkit-sticky;
                position: sticky;
                top: 30%;
                font-size: 1.8rem;
                opacity: 15%;
            }
            `}</style></div>

            <div className={styles.container}>
            <header> 
                <section className={styles.title}>{meta.title}</section>
                <div className={styles.postedAt}>{meta.date}<span>{' '}({relativeDate})</span></div>
            </header>

            <main>
                <Markdown>{children}</Markdown>
            </main>

            <footer>
                <BlogFooter meta={meta} />
            </footer>
            </div>

            <div className={styles.rightNav}><Toc content={children}/></div>
        </div>
        </article>
    )
}

export default Layout