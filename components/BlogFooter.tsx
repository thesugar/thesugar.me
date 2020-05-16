import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

type Props = {
    meta: {
        title: string;
        date: string;
        tags: string[];
    }
}

const BlogFooter = ({meta}: Props) => (
    <React.Fragment>
    <div className={styles.tags}>
        {meta.tags.map((tag) => (
            <span className={styles.tag} key={tag}>{tag}</span>
        ))}
    </div>

    <div className={styles.like}>
        <i className="far fa-heart"></i>
    </div>

    <Link href='/'>
        <a className={styles.backToHome}>← Top page</a>
    </Link>
    </React.Fragment>
)

export default BlogFooter