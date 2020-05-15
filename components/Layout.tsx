import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import Markdown from './Markdown'

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
        </Head>
        <header>
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