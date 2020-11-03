import Link from 'next/link'

export const CovidFooter = () : JSX.Element => (
    <>
    <div className="navigation">
    <Link href="/covid">← 国一覧へ戻る</Link> <br />
    <Link href="/articles/incremental-static-regeneration">← ブログ記事へ戻る</Link>
    </div>
<style jsx>{`
.navigation {
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
    Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;

    font-size: 0.9rem;
}
`}</style>
  </>
)