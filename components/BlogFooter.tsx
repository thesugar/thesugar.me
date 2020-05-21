import React from 'react'
import Link from 'next/link'
import styles from './layout.module.css'
import LikeButton from '../components/LikeButton'
import { Tags } from '../components/Tags'

type Props = {
    meta: {
        id: string;
        title: string;
        date: string;
        tags: string[];
    };
    currentLiked: boolean;
    setCurrentLiked: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogFooter = ({meta, currentLiked, setCurrentLiked}: Props) => {

    return (
    <React.Fragment>
    <Tags tags={meta.tags} />
    <div className={styles.footerContainer}>
        <LikeButton meta={meta} currentLiked={currentLiked} setCurrentLiked={setCurrentLiked} />
        <span>
        <a className={`${styles.btnSocialCircle} ${styles.twitter}`} href={`https://twitter.com/intent/tweet?text=${meta.title}｜THESUGAR-ME&url=https://thesugar.me/articles/${meta.id}&hashtags=${meta.tags}`} target="_blank"><i className="fab fa-twitter"></i></a>
        </span>
    </div>

    <Link href='/'>
        <a className={styles.backToHome}>← Top page</a>
    </Link>
    </React.Fragment>
)}

export default BlogFooter