import React from 'react'

type Media = {
    name: 'Mail' | 'Twitter' | 'GitHub' | 'Qiita' | 'facebook';
    url: string;
}

const mediaList = [
    {name: 'Twitter', url: 'https://twitter.com/_thesugar_'},
    {name: 'GitHub', url: 'https://github.com/thesugar'}]

type Props = {
    mediaList: Array<Media>
}

const SocialMedia = () => {
  return (
    <div>
      {mediaList.map((media) => (
        <a
          key={media.name}
          href={media.url}
          className={`btn-social-icon-${media.name.toLowerCase()}`}
          target="_blank"
        >
          <i className={`fab fa-${media.name.toLowerCase()}`}></i>
        </a>
      ))}
      <a key='qiita' href='https://qiita.com/thesugar' className='qiita' target='_blank'>
      <img src="logo-background-color.png" alt="qiita" className='qiitalogo' />
      </a>
      <style jsx>{`
        div {
            padding: 2.5% 0;
            display: flex;
            flex-direction: row;
            justify-content: space-evenly;
        }

        .btn-social-icon-twitter {
          text-decoration: none;
          display: inline-block;
          text-align: center;
          color: #1da1f3;
          font-size: 20px;
          text-decoration: none;
        }

        .btn-social-icon-twitter:hover {
          color: #88daff;
          transition: 0.5s;
        }

        .btn-social-icon-github {
          text-decoration: none;
          display: inline-block;
          text-align: center;
          color: black;
          font-size: 20px;
          text-decoration: none;
        }

        .btn-social-icon-github:hover {
          color: gray;
          transition: 0.5s;
        }

        .qiita {
          width: 100px;
          text-decoration: none;
          display: inline-block;
        }
      `}</style>
    </div>
  );
};

export default SocialMedia