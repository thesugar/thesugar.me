import React from 'react'

export const siteTitle = 'THESUGAR.ME'
export const siteDescription = 'A personal website of thesugar (Ryohei Sato)'
export const myName = '@thesugar / Ryohei Sato'
export const siteOgDescription = 'TheSugar.Me 🤓'

const greet = (
  <>
    東大工学部卒 → 三菱 UFJ フィナンシャルグループ（R&D・開発）→ 無職。<br />機械学習や Web フロントエンド、モバイルアプリ、純粋関数型言語などに興味があります。
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
