import React, { useState } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import Markdown from './Markdown'
import { relative } from './relative'
import THESUGARME from './ThesugarMe'
import BlogFooter from './BlogFooter'
import Toc from './toc'
import LikeButton from '../components/LikeButton'

type Props = {
    children: any
    meta: {
        id: string
        title: string
        date: string
        tags: Array<string>
    }
}

const Layout = ({ children, meta }: Props) => {

    const [currentLiked, setCurrentLiked] = useState(false)

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
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Head>
            
            <div className={styles.allContainer}>
            <div className={styles.thesugar}>
                {THESUGARME}
            </div>
            <div className={styles.leftNav}>
                <div className={styles.containerInLeftNav}>
                    <LikeButton meta={meta} currentLiked={currentLiked} setCurrentLiked={setCurrentLiked}/>
                    <div>
                    <a className={`${styles.btnSocialCircle} ${styles.twitter}`} href={`https://twitter.com/intent/tweet?text=${meta.title}｜THESUGAR-ME&url=https://thesugar.me/articles/${meta.id}&hashtags=${meta.tags}`} target="_blank"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
            <header> 
                <section className={styles.title}>{meta.title}</section>
                <div className={styles.postedAt}>{meta.date}<span>{' '}({relative(meta.date)})</span></div>
            </header>

            <main>
                <Markdown>{children}</Markdown>
            </main>

            <footer>
                <BlogFooter meta={meta} currentLiked={currentLiked} setCurrentLiked={setCurrentLiked}/>
            </footer>
            </div>

            <div className={styles.rightNav}><Toc content={children}/></div>
        </div>
        </article>
    )
}

export default Layout