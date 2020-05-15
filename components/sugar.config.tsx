export const siteTitle = 'THESUGAR.ME'

export const myName = '@thesugar / Ryohei Sato'

const greet = <>東大工学部卒→某金融機関のR&D部門の機械学習エンジニア。機械学習、フロントエンド、純粋関数型言語などに興味があります。DL4US、GCIデータサイエンティスト講座修了済。Python / React / Next.js / Haskell</>

export const selfIntroduction = (
    <>
    <img className='profile' src='./IMG_6128.jpg'></img>
    <div className='name'>{myName}</div>
    <div>{greet}</div>
    <style jsx>{`
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
            box-shadow: 0 10px 30px rgba(0,0,0,0.7);
        }
        `}
    </style>
    </>)