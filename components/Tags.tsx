import styles from '../components/layout.module.css'
import Link from 'next/link'

type Props = {
    tags: string[]
}

export const Tags = ({tags}: Props) => (
    <div className={styles.tags}>
        {tags.map((tag) => (
            <span className={styles.tag} key={tag}><Link href={`../tag/${tag}`}><a>{tag}</a></Link></span>
        ))}
        <style jsx>{`
        a {
            padding: 0;
            color: inherit;
        }

        a:hover {
            background: none;
        }
        `}</style>
    </div>
)