import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import ThesugarMe from '../components/ThesugarMe'
import Foot from '../components/Foot'
import {
  siteTitle,
  siteDescription,
  siteOgDescription,
} from '../components/sugar.config'

const About = (): JSX.Element => {
  const [image, setImage] = useState<JSX.Element | null>(null)
  useEffect(() => {
    setImage(
      <img
        className="profile_image"
        src="./profile_wide.jpg"
        alt="thesugar"
        width={1200}
      ></img>
    )
  }, [])

  return (
    <div className="allContainer">
      <Head>
        <title>About</title>
        <meta name="description" content={`${siteDescription}`}></meta>
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://thesugar.me/`} />
        <meta property="og:title" content={`${siteTitle}`} />
        <meta
          property="og:image"
          content={`https://thesugar.me/ogp/thesugar_ogp.png`}
        />
        <meta property="og:description" content={`${siteOgDescription}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@_thesugar_" />
      </Head>
      {ThesugarMe}
      <div className="headNav">
        <Link href="/">
          <a>Home</a>
        </Link>
      </div>
      <main>
        {image}

        <p>
          {' '}
          Ryohei Sato / @thesugar <br />
          1992 年生まれ。東京在住。
        </p>

        <h2>Career</h2>
        {[
          {
            year: '2016 年 3 月',
            content: '東京大学工学部　電気電子工学科（専門：制御工学）卒業。',
          },
          {
            year: '2016 年 4 月〜',
            content:
              '三菱 UFJ 銀行に入社。横浜支店で法人営業（融資・外国為替・決済等）を担当。',
          },
          {
            year: '2018 年 10 月〜',
            content:
              '以下 3 社 5 部署を兼務。グループベースでの IT 戦略の立案およびAI の技術調査・開発に携わる。<ul><li>三菱 UFJ 銀行　システム企画部 IT 戦略 Gr、デジタル企画部</li><li>三菱 UFJ フィナンシャルグループ（持株会社）　事務・システム企画部、デジタル企画部</li>\
              <li>三菱 UFJ インフォメーションテクノロジー　IT プロデュース部（R&D 部門）</li></ul>',
          },
          { year: '2020 年 4 月', content: '退職。現在は自宅警備業務を担当。' },
        ].map((term) => (
          <div key={term.year} className="rowContainer">
            <div className="left">
              <strong>{term.year}</strong>
            </div>
            <div
              className="right"
              dangerouslySetInnerHTML={{ __html: term.content }}
            ></div>
          </div>
        ))}

        <h2>Web Front-end</h2>
        <ul>
          <li>HTML / CSS</li>
          <li>JavaScript</li>
          <li>TypeScript</li>
          <li>React</li>
          <li>Next.js</li>
        </ul>

        <h2>Machine Learning / Data Science</h2>
        <ul>
          <li>Python</li>
          <li>TensorFlow</li>
          <li>Keras</li>
          <li>
            <a
              href="https://weblab.t.u-tokyo.ac.jp/dl4us/"
              target="_blank"
              rel="noopener noreferrer"
            >
              DL4US（東京大学 Deep Learning 実践開発講座）
            </a>{' '}
            第 3 期修了（<strong>総合 2 位</strong>）
          </li>
          <li>
            <a href="https://gci.t.u-tokyo.ac.jp/">
              GCI
              データサイエンティスト養成講座（東京大学グローバル消費インテリジェンス寄附講座）
            </a>{' '}
            第 6 期修了
          </li>
          <li>
            <a
              href="http://learn-ai.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              東京大学 実データで学ぶ人工知能講座
            </a>
            （2019 年度後期）修了（<strong>優秀賞</strong>受賞）
          </li>
        </ul>

        <h2>Others</h2>
        <ul>
          <li>Swift</li>
          <li>Haskell / Functional Programming</li>
          <li>Docker / Kubernetes</li>
          <li>GCP</li>
          <li>Firebase, Firestore</li>
        </ul>

        <h2>Certification</h2>
        <ul>
          <li>応用情報技術者</li>
          <li>
            <a href="https://coursera.org/share/cfeb78fbbc794a69c73e920178a73584" target="_blank" rel="noopener noreferrer">
              Google Cloud Platform Fundamentals: Core Infrastructure
            </a>
          </li>
          <li>
            <a href="https://coursera.org/share/40b3f3fe0faf4de66c51da5a22a4f33d" target="_blank" rel="noopener noreferrer">
              Google Cloud Platform Big Data and Machine Learning Fundamentals
            </a>
          </li>
          <li>
            <a href="https://google.qwiklabs.com/public_profiles/30375ea9-9070-4975-bf63-6fa0b9621dd3" target="_blank" rel="noopener noreferrer">
              Qwiklabs
            </a>
          </li>
        </ul>

        <h2>Paper</h2>
        <ul>
          <li>
            Ryohei Sato, Hiroshi Fujimoto, Yoichi Hori, Improvement of Rough
            Terrain Running Ability for Mobility Robot with In-Wheel Motor, The
            2nd IEEJ International Workshop on Sensing, Actuation, Motion
            Control, and Optimization (2016)
          </li>
        </ul>

        <style jsx>{`
          main {
            font-size: 14px;
          }

          .rowContainer {
            margin-bottom: 0.7rem;
          }

          a {
            padding-top: 0.3rem;
            padding-bottom: 0.3rem;
          }

          @media screen and (min-width: 600px) {
            /* for PC */
            main {
              font-size: 16px;
            }

            .rowContainer {
              display: grid;
              grid-template-columns: 1fr 5.5fr;
              margin-bottom: 0.7rem;
            }
          }

          h2 {
            font-family: 'avenir next', avenir, 'helvetica neue', helvetica,
              ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
            margin-top: 3rem;
            border-bottom: solid 1px black;
          }
        `}</style>
      </main>

      <Foot />
    </div>
  )
}

export default About
