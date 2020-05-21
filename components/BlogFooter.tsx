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
        <span>
        <a className={`${styles.btnSocialCircle} ${styles.hatena}`} href={`https://b.hatena.ne.jp/entry/s/thesugar.me/articles/${meta.id}`} data-hatena-bookmark-layout="touch-counter" title={meta.title}><img src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png" alt="このエントリーをはてなブックマークに追加" width="20" height="20" /></a><script type="text/javascript" src="https://b.st-hatena.com/js/bookmark_button.js" charSet="utf-8" async={true}></script>
        </span>
    </div>

    <Link href='/'>
        <a className={styles.backToHome}>← Top page</a>
    </Link>
    </React.Fragment>
)}

export default BlogFooter