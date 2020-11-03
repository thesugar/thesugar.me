import React, {useEffect} from 'react'
import useSWR, {responseInterface} from 'swr'
import Link from 'next/link'
import Head from 'next/head'
import { siteTitle } from '../components/sugar.config'
import THESUGARME from '../components/ThesugarMe'

type Data = {
    Country: string
    Slug: string
}[]

const fetcher = async (input: string) => {
  return await fetch(input).then((res) => res.json())
}

const Page = (): JSX.Element => {

  const { data, error }: responseInterface<Data, any> = useSWR(
    'https://api.covid19api.com/countries',
    fetcher,
  )
  console.log('data -> ', data)
  console.log('error -> ', error)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>


  return (
    <>
      <div className="allContainer">
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header className="header">{THESUGARME}</header>
      <h3 className="pageTitle">国一覧</h3>

      <div className="explanation">
          このページでは SWR を用いて、クライアントサイドでデータを取得しています。 <br />
          SSG との比較のためにあえてクライアントサイドでデータ取得を行なっていますが、このページのように、レンダリングする内容（国名一覧）が決まっていて、頻繁に変化するデータでもない場合は SSG を使ったほうがよく、<strong>クライアントサイドレンダリングを使用する必要はありません</strong>。
      </div>

      <div className="container">
        <div>
        <ul className="countries">{data.map((country) => <li className="country" key={country.Country}>
          <Link href={`covid/${country.Slug}`}>
            <a>{country.Country}</a>
          </Link>
        </li>)}</ul>
        </div>
      </div>
      </div>
      <style jsx>{`
      label {
        display: block;
      }

      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
      Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
      sans-serif;
      `}</style>
    </>
  )
}

export default Page
