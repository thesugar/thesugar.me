import React from 'react'

export const siteTitle = 'THESUGAR.ME'
export const siteDescription = 'A personal website of thesugar (Ryohei Sato)'
export const myName = '@thesugar / Ryohei Sato'
export const siteOgDescription = 'TheSugar.Me 🤓'

const greet = (
  <>
    東大工学部卒 → 三菱 UFJ フィナンシャルグループ（R&D・開発）→ 無職。
    <br />
    機械学習や Web
    フロントエンド、モバイルアプリ、純粋関数型言語などに興味があります。
  </>
)

export const PRIVACY_POLICY_STATE = (
  <>
  当サイトでは Google アナリティクスを利用しており、データの収集のために Cookie を使用しています。<br />このデータは匿名で収集されており、個人を特定するものではありません。
      <br /><br />この機能は Cookie を無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      <br />この規約に関しての詳細は<a href="https://marketingplatform.google.com/about/analytics/terms/jp/" target="_blank" rel="noopener noreferrer"> Google アナリティクスサービス利用規約のページ</a>や <a href="https://policies.google.com/technologies/ads?hl=ja" target="_blank" rel="noopener noreferrer">Google ポリシーと規約ページ</a>をご覧ください。
  </>
)

export const selfIntroduction = (
  <>
    <img className="profile" src="./profile.jpg" alt="Ryohei Sato"></img>
    <div className="name">{myName}</div>
    <div className="introduction">{greet}</div>
    <style jsx>
      {`
        .profile {
          display: block;
          margin-left: auto;
          margin-right: auto;
          margin-top: 50px;
          margin-bottom: 50px;
          overflow: hidden;
          height: 200px;
          position: relative;
          border-radius: 30px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
        }

        .introduction {
          font-size: medium;
          margin-bottom: 3rem;
        }
      `}
    </style>
  </>
)
