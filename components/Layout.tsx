import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'

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
        </Head>
        <header>
            <div>{meta.title}</div>
            <div>{meta.date}</div>
            {meta.tags.map((tag, index, tags) => (
                index === tags.length ? tag : tag + ' '
            ))}
        </header>

        <section>
            {children}
        </section>

        <footer>
            <Link href='/'><a>← Top page</a></Link>
        </footer>
        </div>
    )
}

export default Layout