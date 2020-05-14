import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

const siteTitle = 'THESUGAR.ME'

const importAll = (r: __WebpackModuleApi.RequireContext) => {

    type PostData = { 
        title: string
        date : string
        tags : Array<string>    
    } & {
        name: string
    }

    const posts: PostData[] = []

    r.keys().map((key) => {
        const meta = r(key).meta ?? {}
        posts.push({
          name: key.replace(/\.mdx$/, ''),
          ...meta,
        })
    })

    return posts
}

const blogItems = importAll(
    require.context(__dirname + '/articles', true, /\.mdx$/)
)

const selfIntroduction = 
    <>
    <img className='profile' src='./IMG_6128.jpg'></img>
    <div className='name'>thesugar</div>
    <div>東大工学部卒→某金融機関のR&D部門の機械学習エンジニア。機械学習、フロントエンド、純粋関数型言語などに興味があります。DL4US、GCIデータサイエンティスト講座修了済。Python / React / Next.js / Haskell</div>
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
    </>

const Home = () => {
    return (
        <div className='container'>
            <Head>
            <title>{siteTitle}</title>
            </Head>
            <header className='btn-cross'>
                {siteTitle}
                <style jsx>{`
                .btn-cross {
                    display: inline-block;
                    position: relative;
                    padding: 0.25em 1em;
                    border-top: solid 2px black;
                    border-bottom: solid 2px black;
                    text-decoration: none;
                    font-weight: bold;
                    color: #03A9F4;
                  }
                  .btn-cross:before, .btn-cross:after {
                    content: '';
                    position: absolute;
                    top: -7px;
                    width: 2px;
                    height: -webkit-calc(100% + 14px);
                    height: calc(100% + 14px);
                    background-color: black;
                    transition: .3s;
                  }
                  .btn-cross:before {
                    left: 7px;
                  }
                  .btn-cross:after {
                    right: 7px;
                  }
                  .btn-cross:hover:before {
                    top: 0px;
                    left:0;
                    height: 100%;
                  }
                  .btn-cross:hover:after {
                    top: 0px;
                    right: 0;
                    height: 100%;
                  }
                `}</style>
            </header>
            {selfIntroduction}

            <hr />
            <section>
                {blogItems.map(item => {
                    const articlePath = '/articles' + item.name.slice(1)
                    return (
                        <React.Fragment key={item.title}>
                        <Link href={articlePath}><a className='postTitle'>{item.title}</a></Link>
                        <span className='postDate'>{item.date}</span>
                        <div className='tags'>
                        {item.tags.map(tag => (
                            <span key={tag} className="btn-flat-dashed-filled">{tag}</span>
                        ))}
                        </div>
                        <hr />
                        </React.Fragment>
                    )}
                )}
                <style jsx>{`
                    .btn-flat-dashed-filled {
                        display: inline-block;
                        margin-right: 0.5rem;
                        text-decoration: none;
                        color: #67c5ff;
                        border: dashed 1px #67c5ff;
                        background: #f2fcff;
                        border-radius: 3px;
                        transition: .1s;
                        font-size: small;
                    }
                    
                    .btn-flat-dashed-filled:hover {
                        background: #cbedff;
                    }

                    .tags {
                        float: right;
                    }

                    .postTitle{
                        margin-right: 1rem;
                    }
                `}</style>
            </section>
            
        </div>
    )
}

export default Home