import React from 'react'
import styles from './layout.module.css'
import { Tags } from '../components/Tags'
import Twitter from '../components/icons/twitter'
import Hatena from '../components/icons/hatena'

type Props = {
  meta: {
    id: string
    title: string
    date: string
    tags: string[]
  }
}

const BlogFooter = ({ meta }: Props): JSX.Element => {
  return (
    <React.Fragment>
      <Tags tags={meta.tags} />
      <div className={styles.footerContainer}>
        <span>
          <a
            className={`${styles.btnSocialCircle} ${styles.twitter}`}
            href={`https://twitter.com/intent/tweet?text=${meta.title}｜THESUGAR-ME&url=https://thesugar.me/articles/${meta.id}&hashtags=${meta.tags}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter />
          </a>
        </span>
        <span>
          <a
            className={`${styles.btnSocialCircle} ${styles.hatena}`}
            href={`https://b.hatena.ne.jp/entry/s/thesugar.me/articles/${meta.id}`}
            data-hatena-bookmark-layout="touch-counter"
            title={meta.title}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Hatena />
          </a>
          <script
            type="text/javascript"
            src="https://b.st-hatena.com/js/bookmark_button.js"
            charSet="utf-8"
            async={true}
          ></script>
        </span>
      </div>
    </React.Fragment>
  )
}

export default BlogFooter
