import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import Markdown from './Markdown'
import { relative } from './relative'
import THESUGARME from './ThesugarMe'
import BlogFooter from './BlogFooter'
import Toc from './toc'
import LikeButton from '../components/LikeButton'
import Twitter from '../components/icons/twitter'
import Hatena from '../components/icons/hatena'

type Props = {
    children: any
    meta: {
        id: string
        title: string
        date: string
        tags: Array<string>
    }
}

const kickViewedCounter = async (id: string) => {
    await fetch('/api/counter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "id": `${id}`,
        })
      })
}

const getViews = async (id :string) => {
    while (true) {
        try {
            const res = await fetch(`/api/counter?id=${id}`)
            return await res.json()
        } catch (err) {
            continue
        }
    }
}

const Layout = ({ children, meta }: Props) => {

    const [currentLiked, setCurrentLiked] = useState(false)

    const [views, setViews] = useState(0)

    useEffect(() => {
        const func = async () => {
            const value = await getViews(meta.id)
            setViews(JSON.parse(JSON.stringify(value)).views)
        }
        func()
    }, [])

    useEffect(() => {
        const kick = async () => {
            await kickViewedCounter(meta.id)
        }
        kick()
    }, [])

    let previewText = ''
    children.map((child: {props: any})=> {
        if (child.props && child.props.children !== undefined && typeof child.props.children === 'string') {
            previewText += child.props.children + ' '
        } else if (child.props.children && child.props.children.props && typeof child.props.children.props.children === 'string') {
            previewText += child.props.children.props.children + ' '
        }
    })
    
    return (
        <article>
            <Head>
                <title>{meta.title}</title>
                <meta name="description" content={`${previewText}`}></meta>
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://thesugar.me/articles/${meta.id}`} /> 
                <meta property="og:title" content={`${meta.title}`} /> 
                <meta property="og:image" content={`https://thesugar.me/ogp/${meta.id}.jpg`} /> 
                <meta property="og:description" content={`${previewText}`} /> 
                <meta name="twitter:card" content="summary_large_image" /> 
                <meta name="twitter:site" content="@_thesugar_" /> 
                <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/katex@0.11.0/dist/katex.min.css"
                integrity="sha384-BdGj8xC2eZkQaxoQ8nSLefg4AV4/AwB3Fj+8SUSo7pnKP6Eoy18liIKTPn9oBYNG"
                crossOrigin="anonymous"
                />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.9.0/themes/prism-tomorrow.min.css" rel="stylesheet"
                crossOrigin="anonyumous" />
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"
                crossOrigin="anonymous"></script>
            </Head>
            
            <div className={styles.allContainer}>
            <div className={styles.thesugar}>
                {THESUGARME}
            </div>
            <div className={styles.leftNav}>
                <div className={styles.containerInLeftNav}>
                    <LikeButton meta={meta} currentLiked={currentLiked} setCurrentLiked={setCurrentLiked}/>
                    <div>
                    <a className={`${styles.btnSocialCircle} ${styles.twitter}`} href={`https://twitter.com/intent/tweet?text=${meta.title}｜THESUGAR-ME&url=https://thesugar.me/articles/${meta.id}&hashtags=${meta.tags}`} target="_blank"><Twitter /></a>
                    </div>
                    <span>
                    <a className={`${styles.btnSocialCircle} ${styles.hatena}`} href={`https://b.hatena.ne.jp/entry/s/thesugar.me/articles/${meta.id}`} data-hatena-bookmark-layout="touch-counter" title={meta.title}><Hatena /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charSet="utf-8" async={true}></script>
                    <style jsx>{`
                    .${styles.hatena} {
                        margin-top: 2rem;
                    }
                    `}</style>
                    </span>
                </div>
            </div>

            <div className={styles.container}>
            <header> 
                <section className={styles.title}>{meta.title}</section>
                <div className={styles.underTitle_container}>
                <div className={styles.postedAt}>{meta.date}<span>{' '}({relative(meta.date)})</span></div>
                <div className={styles.views}>{views} views</div>
                </div>
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