import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'

type Props = {
    meta: {
        id: string;
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

    <div className={styles.footerContainer}>
        <div className={`${styles.likeOnLeft} ${styles.heart}`}><i className='far fa-heart'></i></div>
        <span>
        <a className={`${styles.btnSocialCircle} ${styles.twitter}`} href={`https://twitter.com/intent/tweet?text=${meta.title}｜THESUGAR-ME&url=https://thesugar.me/articles/${meta.id}&hashtags=${meta.tags}`} target="_blank"><i className="fab fa-twitter"></i></a>
        </span>
    </div>

    <Link href='/'>
        <a className={styles.backToHome}>← Top page</a>
    </Link>
    </React.Fragment>
)

export default BlogFooter